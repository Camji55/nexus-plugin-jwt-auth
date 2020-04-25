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

Basic permissions can be added too.

> Ideally this can be placed in the plugin itself but I've been having issues with this. I'd love to hear suggestions!

```typescript
// app.ts

...

// Enables the JWT Auth plugin
use(auth({
    appSecret: "<YOUR SECRET>"
}))

// Define the paths you'd like to be auth protected
const protectedPaths = [
    'Query.me',
    'Mutation.generateMagicLink'
]

// Middleware is applied to check the resolver against the path
schema.middleware((config) => {
    return async (root, args, ctx, info, next) => {
        const parentType = config.parentTypeConfig.name

        if (parentType != 'Query' && parentType != 'Mutation') {
            return await next(root, args, ctx, info)
        }

        const resolver = `${parentType}.${config.fieldConfig.name}`

        if (!protectedPaths.includes(resolver)) {
            return await next(root, args, ctx, info)
        }

        if (!ctx.token) { // This is the token object passed through the context
            throw new Error('Not Authorized!')
        }

        return await next(root, args, ctx, info)
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
