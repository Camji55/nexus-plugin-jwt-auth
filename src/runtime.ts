import { RuntimePlugin } from 'nexus/plugin'

export const plugin: RuntimePlugin = () => project => {
  return {
    context: {
      create: (req: any) => {
        var token = null
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          token = req.headers.authorization.split(' ')[1]
        }

        return {
          token
        }
      },
      typeGen: {
        fields: {
          'token': 'null | string'
        }
      }
    },
  }
}