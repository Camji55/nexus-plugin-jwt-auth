import { RuntimePlugin } from 'nexus/plugin'
import { verify } from 'jsonwebtoken'
import { Settings } from './settings'

export const plugin: RuntimePlugin<Settings> = settings => project => {
  return {
    context: {
      create: (req: any) => {
        const appSecret = settings?.appSecret
        if (!appSecret) {
          return {
            token: null
          }
        }

        var token = null
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          token = req.headers.authorization.split(' ')[1]
        }

        const verifiedToken = verify(token, appSecret)
        return {
          token: verifiedToken
        }
      },
      typeGen: {
        fields: {
          'token': 'null | string'
        }
      }
    }
  }
}