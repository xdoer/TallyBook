import { users } from '../data'

export default () => {
  return [
    {
      path: '/user/:id',
      data: [
        {
          scene: 'success',
          response: (req) => {
            return {
              success: true,
              result: users.find(user => user.id === req.params.id)
            }
          }
        }
      ]
    },
    {
      path: '/users',
      data: [
        {
          scene: 'success',
          response: {
            success: true,
            result: users
          }
        }
      ]
    }
  ]
}
