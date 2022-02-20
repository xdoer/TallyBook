export const logMiddleware = async (ctx, next) => {
  console.log('----req', ctx.request)
  await next()
  console.log('----res', ctx.response)
}
