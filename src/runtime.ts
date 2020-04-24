import { RuntimePlugin } from 'nexus/plugin'

export const plugin: RuntimePlugin = () => project => {
  return {
    context: {
      create: _req => {
        return {
          'nexus-plugin-auth': 'hello world!'
        }
      },
      typeGen: {
        fields: {
          'nexus-plugin-auth': 'string'
        }
      }
    }
  }
}