import { plugin } from '@nexus/schema'

function jwtAuthPlugin(protectedPaths: string[]) {
    return plugin({
        name: 'JWT Auth Plguin',
        description: 'A nexus schema plugin for jwt auth.',
        onCreateFieldResolver(config) {
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
        },
    })
}

export { jwtAuthPlugin }