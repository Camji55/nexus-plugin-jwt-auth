import { schema } from "nexus"

function applyMiddleware(permissions: [string]) {
    schema.middleware((config) => {
        return async (root, args, ctx, info, next) => {
            const value = await next(root, args, ctx, info)
            const parentType = config.parentTypeConfig.name

            if (parentType != 'Query' && parentType != 'Mutation') {
                return value
            }
    
            const resolver = `${parentType}.${config.fieldConfig.name}`

            if (!permissions.includes(resolver)) {
                return value
            }
    
            if (!ctx.token) {
                throw new Error('Not Authorized!')
            }
    
            return value
        }
    })
}

export { applyMiddleware }