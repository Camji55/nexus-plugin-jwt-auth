![header](https://user-images.githubusercontent.com/2769158/80298536-2796b180-8742-11ea-81c4-fcbcca851083.png)

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

Find full examples using both the built in permissions system or by leveragering [nexus-plugin-shield](https://github.com/lvauvillier/nexus-plugin-shield):

- **Basic Permissions** - [examples/basic-permissions](https://github.com/Camji55/nexus-plugin-jwt-auth/tree/master/examples/basic-permissions)
- **[Shield](https://github.com/lvauvillier/nexus-plugin-shield)** -  [examples/shield](https://github.com/Camji55/nexus-plugin-jwt-auth/tree/master/examples/shield)

### Setup

```typescript
// app.ts

import { use } from 'nexus'
import { auth } from 'nexus-plugin-jwt-auth'

// Enables the JWT Auth plugin without permissions
use(auth({
  appSecret: "<YOUR SECRET>" // required
}))
```

You may now access the `token` object and it's properties on the Nexus `context`.

### Permissions

Basic permissions can be added too.

```typescript
// app.ts

import { use } from 'nexus'
import { auth } from 'nexus-plugin-jwt-auth'

// Define the paths you'd like to protect
const protectedPaths = [
    'Query.me',
    'Query.filterPosts',
    'Query.post',
    'Mutation.createDraft',
    'Mutation.deletePost',
    'Mutation.publish'
]

// Enables the JWT Auth plugin with permissions
use(auth({
  appSecret: "<YOUR SECRET>", // required
  protectedPaths // optional
}))
```

### Stored Properties

You can also access properties stored in the token.

> In this example I sign the token on signup or login then store the userId in the token to be accessed directly in a query or mutation to find the authed user.

```typescript
// Query.ts

import { schema } from 'nexus'

schema.queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      async resolve(_root, _args, ctx) {
        const account = await ctx.db.user.findOne({
          where: {
            id: ctx.token.userId // This is the token object passed through the context
          }
        })

        if (!user) {
          throw new Error('No such user exists')
        }

        return user
      }
    })
  }
})
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FCamji55%2Fnexus-plugin-jwt-auth.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FCamji55%2Fnexus-plugin-jwt-auth?ref=badge_large)
