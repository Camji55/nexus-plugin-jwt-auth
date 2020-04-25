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
