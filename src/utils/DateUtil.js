export default class DateUtil {
  static getNowString({separate = '-'}) {
    const now = new Date()

    const year = now.getFullYear()
    const month = ((now.getMonth() + 1) + '').padStart(2, '0')
    const day = (now.getDate() + '').padStart(2, '0')

    return year + separate + month + separate + day
  }
}
