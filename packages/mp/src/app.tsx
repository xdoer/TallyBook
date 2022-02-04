import { useSystemInfo } from './store/app'
import './app.scss'
import './assets/iconfont.scss'
import './fower.config'

export default ({ children }) => {
  useSystemInfo()
  return children
}
