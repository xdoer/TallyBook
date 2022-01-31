import { recordTypes } from '../data'

export default () => {
  return [
    {
      path: '/recordTypes',
      data: [
        {
          scene: 'success',
          response: {
            success: true,
            result: recordTypes
          }
        }
      ]
    }
  ]
}
