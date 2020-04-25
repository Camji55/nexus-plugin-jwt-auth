import { Schema } from 'nexus/dist/runtime/schema';

export type Settings = {
    appSecret: string
    permissions?: {
        protectedPaths: string[]
        schema: Schema
    }
}