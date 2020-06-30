<template>
    <div class="mx-auto mt-5 " style="width: 400px;">
        <v-card>
            <v-card-title>
                <h1 class="display-1">{{ $i18n.t(title) }}</h1>
            </v-card-title>

            <v-window v-model="step">
                <v-window-item :value="0">
                    <v-card-text>
                        <v-form
                            ref="signupForm"
                            v-model="formValidity"
                            @submit.prevent="submit"
                        >
                            <v-text-field
                                :label="$i18n.t('email')"
                                type="email"
                                v-model="email"
                                :rules="emailRules"
                                required
                                prepend-icon="alternate_email"
                            >
                            </v-text-field>

                            <v-text-field
                                :label="
                                    `${$i18n.t('username')} (${$i18n.t(
                                        'optional'
                                    )})`
                                "
                                v-model="username"
                                :rules="usernameRules"
                                prepend-icon="mdi-account-circle"
                            >
                            </v-text-field>

                            <v-text-field
                                :label="$i18n.t('password')"
                                v-model="password"
                                :rules="passwordRules"
                                :type="showPassword ? 'text' : 'password'"
                                required
                                prepend-icon="mdi-lock"
                            >
                                <v-tooltip slot="append" bottom>
                                    <template v-slot:activator="{ on }"
                                        ><v-btn
                                            icon
                                            color="primary"
                                            v-on="on"
                                            @click="
                                                showPassword = !showPassword
                                            "
                                        >
                                            <v-icon>{{
                                                showPassword
                                                    ? 'mdi-eye'
                                                    : 'mdi-eye-off'
                                            }}</v-icon>
                                        </v-btn>
                                    </template>

                                    <span>{{
                                        showPassword
                                            ? $i18n.t('hidePassword')
                                            : $i18n.t('showPassword')
                                    }}</span>
                                </v-tooltip>
                            </v-text-field>

                            <v-text-field
                                :label="$i18n.t('registerData.confirmPassword')"
                                v-model="confirmationPassword"
                                :rules="confirmationPasswordRules"
                                :type="showPassword ? 'text' : 'password'"
                                required
                                prepend-icon="mdi-lock"
                            >
                                <v-tooltip slot="append" bottom>
                                    <template v-slot:activator="{ on }"
                                        ><v-btn
                                            icon
                                            color="primary"
                                            v-on="on"
                                            @click="
                                                showPassword = !showPassword
                                            "
                                        >
                                            <v-icon>{{
                                                showPassword
                                                    ? 'mdi-eye'
                                                    : 'mdi-eye-off'
                                            }}</v-icon>
                                        </v-btn>
                                    </template>

                                    <span>{{
                                        showPassword
                                            ? $i18n.t('hidePassword')
                                            : $i18n.t('showPassword')
                                    }}</span>
                                </v-tooltip>
                            </v-text-field>
                        </v-form>
                    </v-card-text>

                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn
                            color="primary"
                            :disabled="!formValidity"
                            @click="submit"
                            >{{ $i18n.t('createAccount') }}</v-btn
                        >
                    </v-card-actions>
                </v-window-item>
                <v-window-item :value="1">
                    <v-card-text>
                        {{ $i18n.t('registerData.sendEmailTo') }} {{ email }}
                    </v-card-text>
                    <v-card-text>
                        {{ $i18n.t('registerData.verifyAccount') }}
                    </v-card-text>
                </v-window-item>
            </v-window>
        </v-card>
        <p class="mt-4">
            {{ $i18n.t('havingAnAccount') }}
            <v-btn small color="success" :to="{ name: 'login' }">{{
                $i18n.t('login')
            }}</v-btn>
        </p>
    </div>
</template>

<script>
//mdi-account-circle
export default {
    components: {},
    data() {
        return {
            email: '',

            password: '',
            confirmationPassword: '',

            formValidity: true,
            step: 0,
            showPassword: false,
        }
    },

    computed: {
        title() {
            switch (this.step) {
                case 0:
                    return 'registerHeader'
                case 1:
                    return 'registerData.accountCreated'
                default:
                    return 'registerHeader'
            }
        },

        currentLanguage() {
            return this.$vuetify.lang.current
        },

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

        confirmationPasswordRules() {
            return [
                confirmationPassword =>
                    !!confirmationPassword ||
                    this.$i18n.t('registerData.confirmationRequired'),
                confirmationPassword =>
                    confirmationPassword == this.password ||
                    this.$i18n.t('registerData.passwordsDontMatch'),
            ]
        },
    },

    watch: {
        currentLanguage: function() {
            this.validateForm()
        },
    },

    methods: {
        resetForm() {
            this.$refs.signupForm.reset()
        },
        resetValidation() {
            this.$refs.signupForm.resetValidation()
        },
        validateForm() {
            this.$refs.signupForm.validate()
        },

        submit() {
            this.validateForm()
            if (this.formValidity) {
                ++this.step
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
