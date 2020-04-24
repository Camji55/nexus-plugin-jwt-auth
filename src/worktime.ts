import { WorktimePlugin } from 'nexus/plugin'

export const plugin: WorktimePlugin = () => project => {
  project.hooks.dev.onStart = async () => {
    project.log.info('dev.onStart hook from auth')
  }
  project.hooks.dev.onBeforeWatcherRestart = async () => {
    project.log.info('dev.onBeforeWatcherRestart hook from auth')
  }
  project.hooks.dev.onAfterWatcherRestart = async () => {
    project.log.info('dev.onAfterWatcherRestart hook from auth')
  }
  project.hooks.dev.onBeforeWatcherStartOrRestart = async () => {
    project.log.info('dev.onBeforeWatcherStartOrRestart hook from auth')
  }
  project.hooks.build.onStart = async () => {
    project.log.info('build.onStart hook from auth')
  }
}