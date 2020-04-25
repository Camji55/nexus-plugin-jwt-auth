# JWT Auth Nexus Plugin

## Contents

- [Installation](#installation)
- [Example Usage](#example-usage)
    - [Setup](#setup)
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
    appSecret: "<YOUR SECRET>", // Required
    protectedPaths: [ // Optional - paths of the endpoints you'd like to protect
        'Query.me',
        'Mutation.editAccount'
    ]
}))
```

You may now access the `token` object and it's properties on the Nexus `context`.

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
