import dayjs from 'dayjs'
// const updateLocale = import('dayjs/plugin/updateLocale')
// const relativeTime = import('dayjs/plugin/relativeTime')

// dayjs.extend(updateLocale)
// dayjs.extend(relativeTime)

// dayjs.updateLocale('en', {
//   weekStart: 1
// })

// const weekOfYear = import('dayjs/plugin/weekOfYear')
// dayjs.extend(weekOfYear)

export default ({ app }, inject) => {
  // const locale = import('dayjs/locale/en.js')
  // dayjs.locale(locale)

  inject('day', (val) => {
    if (val) { return dayjs(+val) }
    return dayjs()
  })
}
