import { bills } from '../data'

export default () => {
  return [
    {
      path: '/bill/:id',
      data: [
        {
          scene: 'success',
          response: (req) => {
            return {
              success: true,
              result: bills.find((bill) => bill.id === req.params.id),
            }
          },
        },
      ],
    },
    {
      path: '/bills',
      data: [
        {
          scene: 'success',
          response: {
            success: true,
            result: bills,
          },
        },
      ],
    },
  ]
}
