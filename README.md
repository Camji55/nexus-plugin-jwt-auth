# JWT Auth Nexus Plugin

## Contents

- [Installation](#installation)
- [Example Usage](#example-usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

```sh
npm install nexus-plugin-jwt-auth
```

## Example Usage

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

You can apply a custom middleware to add-on a permission system.

> Ideally I make this part of the plugin or it's own plugin entirely, but unsure how I'd approach this.

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

You can also access properties stored in the token.

> In this example when I sign the token on signup or login, I store the property accountId within it.

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
