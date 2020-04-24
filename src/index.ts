import { PluginEntrypoint } from 'nexus/plugin'

export const auth: PluginEntrypoint = () => ({
  packageJsonPath: require.resolve('../package.json'),
  runtime: {
    module: require.resolve('./runtime'),
    export: 'plugin'
  }
})