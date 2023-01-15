import { defineUserConfig } from 'vuepress'
import theme from './theme.js'
import { getDirname, path } from '@vuepress/utils'

// @ts-ignore
const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  base: '/',
  theme,
  shouldPrefetch: false,
  alias: {
    '@xyCalendar': path.resolve(__dirname, "components/calendar/index.vue")
  }
});
