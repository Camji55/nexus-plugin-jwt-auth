# JWT Auth Nexus Plugin

## Contents

- [Installation](#installation)
- [Example Usage](#example-usage)
    - [Setup](#setup)
    - [Permissions](#permissions)
    - [Stored Properties](#stored-properties)
- [Contributing](#contributing)
- [License](#license)

## Installation

```sh
npm install nexus-plugin-jwt-auth
```

## Example Usage

### Setup

```typescript
// app.ts

import { use } from 'nexus'
import { auth } from 'nexus-plugin-jwt-auth'

// Enables the JWT Auth plugin
use(auth({
    appSecret: "<YOUR SECRET>"
}))
```

You may now access the `token` object and it's properties on the Nexus `context`.

### Permissions

You can apply a custom middleware to add-on a permission system.

> Ideally I make this part of the plugin or it's own plugin entirely, but unsure how I'd approach this. [Help?](#contributing)

```typescript
// middlewares.ts

import { schema } from 'nexus'

// List of protected paths
const protectedPaths = [
    'Query.me',
    'Mutation.editAccount'
]

// Checks to see if the path is protected, and throws error if authentication fails
schema.middleware((config) => {
    return async (root, args, ctx, info, next) => {
        const value = await next(root, args, ctx, info)
        const resolver = `${config.parentTypeConfig.name}.${config.fieldConfig.name}`

        if (!protectedPaths.includes(resolver)) {
            return value
        }

        if (!ctx.token) { // This is the token object passed through the context
            throw new Error('Not Authorized!')
        }

        return value
    }
})
```

### Stored Properties

You can also access properties stored in the token.

> In this example I sign the token on signup or login then store the accountId in the token to be accessed directly in a query or mutation to find the account of the authed user. 

```typescript
// Query.ts

import { schema } from 'nexus'

schema.queryType({
    definition(t) {
        t.field('me', {
            type: 'Account',
            async resolve(_root, _args, ctx) {
                const account = await ctx.db.account.findOne({
                    where: {
                        id: ctx.token.accountId // This is the token object passed through the context
                    }
                })

                if (!account) {
                    throw new Error('No such account exists')
                }

                return account
            }
        })
    },
})
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md)

## License

Please read [LICENSE](LICENSE)
