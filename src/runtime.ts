import { RuntimePlugin } from 'nexus/plugin'
import { verify } from 'jsonwebtoken'
import { Settings } from './settings'
import { jwtAuthPlugin } from './lib/schema'

export const plugin: RuntimePlugin<Settings, 'required'> = settings => project => {
  var plugins = []
  const protectedPaths = settings.protectedPaths
  if (protectedPaths) {
    plugins.push(jwtAuthPlugin(protectedPaths))
  }

  return {
    context: {
      create: async (req: any) => {
        if (settings.verify) {
          return {
            token: await settings.verify(req)
          }
        } else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          const token = req.headers.authorization.split(' ')[1]
          try {
            const verifiedToken = verify(token, settings.appSecret)
            return {
              token: verifiedToken
            }
          }
          catch (err) {
            return {
              token: null
            }
          }
        }

        return {
          token: null
        }
      },
      typeGen: {
        fields: {
          'token': 'string | null'
        }
      }
    },
    schema: {
      plugins
    }
  }
}