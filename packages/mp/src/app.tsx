import { useEffect } from 'react'
import { useSystemInfo } from './store/app'
import { apiService } from './service/apiService'
import { accountStore, userStore } from './store'
import { popUpService } from './components/PopupContainer'
import { Auth } from './components/Auth'
import './app.scss'
import './assets/iconfont.scss'
import './fower.config'

export default ({ children }) => {
  useSystemInfo()

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const login = await apiService.login()
    if (login.success) {
      const { user, account } = login.result

      if (user) {
        userStore.setState(user)
        accountStore.setState(account)
      } else {
        popUpService.open({
          content: <Auth success={init} />,
        })
      }
    }
  }

  return children
}
