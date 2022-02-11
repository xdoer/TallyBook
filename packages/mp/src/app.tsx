import { useEffect } from 'react'
import { useSystemInfo } from './store/app'
import { apiService } from './service/apiService'
import { popUpService } from './components/PopupContainer'
import { Auth } from './components/Auth'
import { loginStore } from './store/login'
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
      loginStore.setState(login.result)
    } else {
      popUpService.open({
        content: <Auth success={init} />,
      })
    }
  }

  return children
}
