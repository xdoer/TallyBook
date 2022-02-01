import { accounts } from '../data'

export default () => {
  return [
    {
      path: '/account/:id',
      data: [
        {
          scene: 'success',
          response: (req) => {
            return {
              success: true,
              result: accounts.find((account) => account.id === req.params.id),
            }
          },
        },
      ],
    },
    {
      path: '/accounts',
      data: [
        {
          scene: 'success',
          response: {
            success: true,
            result: accounts,
          },
        },
      ],
    },
  ]
}
