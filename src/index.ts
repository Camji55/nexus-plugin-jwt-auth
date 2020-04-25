import { PluginEntrypoint } from 'nexus/plugin'
import { Settings } from './settings'
import { applyMiddleware } from './middleware'

export const auth: PluginEntrypoint<Settings, 'required'> = settings => {
  const permissions = settings.permissions
  if(permissions) {
    applyMiddleware(permissions.schema, permissions.protectedPaths)
  }

  return {
    settings,
    packageJsonPath: require.resolve('../package.json'),
    runtime: {
      module: require.resolve('./runtime'),
      export: 'plugin'
    }
  }
}
