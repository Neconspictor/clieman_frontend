import moment from 'moment-timezone'

export default class DateUtil {
    static formatDate(date, timeZone, format) {
        return moment(date)
            .tz(timeZone)
            .format(format)
    }

    static formatDefault(date) {
        return DateUtil.formatDate(
            date,
            DateUtil.getDefaultTimeZone(),
            DateUtil.getYearToSecondsFormat()
        )
    }

    static getDefaultTimeZone() {
        return moment.tz.guess()
    }

    static getYearToSecondsFormat() {
        return 'YYYY-MM-DD HH:mm:ss'
    }
}
