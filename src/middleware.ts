import { Schema } from 'nexus/dist/runtime/schema'

function applyMiddleware(schema: Schema, protectedPaths: string[]) {
    schema.middleware((config) => {
        return async (root, args, ctx, info, next) => {
            const parentType = config.parentTypeConfig.name

            if (parentType != 'Query' && parentType != 'Mutation') {
                return await next(root, args, ctx, info)
            }

            const resolver = `${parentType}.${config.fieldConfig.name}`

            if (!protectedPaths.includes(resolver)) {
                return await next(root, args, ctx, info)
            }

            if (!ctx.token) {
                throw new Error('Not Authorized!')
            }

            return await next(root, args, ctx, info)
        }
    })
}

export { applyMiddleware }