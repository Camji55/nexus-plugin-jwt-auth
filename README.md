# JWT Auth Nexus Plugin<!-- omit in toc -->

## Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Example Usage](#example-usage)
- [Contributing](#contributing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```sh
npm install nexus-plugin-jwt-auth
```

## Example Usage

In `app.ts`:

```typescript
import { use } from 'nexus'
import { auth } from 'nexus-plugin-jwt-auth'

// Enables the JWT Auth plugin
use(auth({
    appSecret: "<YOUR SECRET>"
}))
```

You may now access the `token` object and it's properties on the Nexus `context`.

> In this example when I sign the token on signup or login, I store the property accountId within it.

In `Query.ts`:

```typescript
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
