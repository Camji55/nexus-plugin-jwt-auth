import { PluginEntrypoint } from 'nexus/plugin'
import { Settings } from './settings'
import { applyMiddleware } from './middleware'

const auth: PluginEntrypoint<Settings> = settings => ({
  settings,
  packageJsonPath: require.resolve('../package.json'),
  runtime: {
    module: require.resolve('./runtime'),
    export: 'plugin'
  }
})

export { auth, applyMiddleware }