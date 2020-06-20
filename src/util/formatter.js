export default class Formatter {
    constructor($i18n, defaultText = '') {
        this.$i18n = $i18n
        this.defaultText = defaultText
    }

    object(value, textFactory) {
        return value ? textFactory() : this.defaultText
    }

    string(text) {
        return this.object(text, () => text.toString())
    }

    date(date, translationFormat) {
        return this.object(date, () => this.$i18n.d(date, translationFormat))
    }
}
