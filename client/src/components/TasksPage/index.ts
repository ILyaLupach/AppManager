import { isMobileOnly } from 'react-device-detect'
import TasksPageDesktop from './TasksPageDesktop'
import TasksPageMobile from './TasksPageMobile'

export default isMobileOnly ? TasksPageMobile : TasksPageDesktop
