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
        } else if (settings.useCookie && req.cookies && req.cookies[settings.cookieName]) {
          const token = req.cookies[settings.cookieName];
          return verifyToken(token, settings.appSecret);
        } else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          const token = req.headers.authorization.split(' ')[1]
          verifyToken(token, settings.appSecret)
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

/**
 * Verify a token
 *
 * @param token
 * @param appSecret
 */
const verifyToken = (token: string, appSecret: string) => {
  try {
    const verifiedToken = verify(token, appSecret)
    return {
      token: verifiedToken,
    };
  } catch (err) {
    return {
      token: null,
    };
  }
}
