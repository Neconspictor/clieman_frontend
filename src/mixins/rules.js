export default {
    computed: {
        emailRules() {
            return [
                email => !!email || this.$i18n.t('registerData.emailRequired'),
                email =>
                    email.indexOf('@') !== 0 ||
                    this.$i18n.t('registerData.emailRequiredUserName'),
                email =>
                    email.includes('@') > 0 ||
                    this.$i18n.t('registerData.emailRequiresAt'),
                email => {
                    return (
                        email.lastIndexOf('.') - email.indexOf('@') > 1 ||
                        this.$i18n.t('registerData.emailValidDomain')
                    )
                },
                email =>
                    email.lastIndexOf('.') <= email.length - 3 ||
                    this.$i18n.t('registerData.emailDomainExtension'),
            ]
        },

        passwordRules() {
            return [
                password =>
                    !!password || this.$i18n.t('registerData.passwordRequired'),
                password =>
                    password.length >= 8 ||
                    this.$i18n.t('registerData.passwordTooShort'),
            ]
        },
    },

    methods: {
        confirmationPasswordRules(password) {
            return [
                confirmationPassword =>
                    !!confirmationPassword ||
                    this.$i18n.t('registerData.confirmationRequired'),
                confirmationPassword =>
                    confirmationPassword == password ||
                    this.$i18n.t('registerData.passwordsDontMatch'),
            ]
        },
    },
}
