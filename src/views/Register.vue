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
                            @submit.prevent="submitRegister"
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

                            <PasswordField
                                v-model="password"
                                required
                                :rules="passwordRules"
                                :show-password="showPassword"
                                @visible="setShowPassword"
                            />

                            <PasswordField
                                v-model="confirmationPassword"
                                required
                                :rules="confirmationPasswordRules(password)"
                                :label="$i18n.t('registerData.confirmPassword')"
                                :show-password="showPassword"
                                @visible="setShowPassword"
                            />
                        </v-form>
                    </v-card-text>

                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn
                            color="primary"
                            :disabled="!formValidity || showSpinner"
                            @click="submitRegister"
                            >{{ $i18n.t('createAccount') }}
                        </v-btn>
                    </v-card-actions>
                </v-window-item>
                <v-window-item :value="1">
                    <v-card-text>
                        {{ $i18n.t('registerData.sendEmailTo') }} {{ email }}
                    </v-card-text>
                    <v-card-text>
                        {{ $i18n.t('registerData.verifyAccount') }}
                    </v-card-text>

                    <v-text-field
                        :label="`${$i18n.t('registerData.verificationCode')}`"
                        v-model="verificationCode"
                    >
                    </v-text-field>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn
                            color="primary"
                            :disabled="showSpinner"
                            @click="submitVerification"
                            >{{ $i18n.t('registerData.submitVerification') }}
                        </v-btn>
                    </v-card-actions>
                </v-window-item>
                <v-window-item :value="2">
                    <v-card-text>
                        {{ $i18n.t('registerData.ableToLogin') }}
                    </v-card-text>
                </v-window-item>
            </v-window>
        </v-card>

        <LinkTable
            :content="[
                {
                    desc: 'havingAnAccount',
                    route: 'login',
                    linkName: 'login',
                },
                {
                    desc: 'registerData.wantToVerify',
                    route: 'verify',
                    linkName: 'verify',
                },
            ]"
        >
        </LinkTable>

        <p class="mt-4">
            <ErrorView :errors="errors" />
        </p>

        <LoadingSpinner :value="showSpinner" />
    </div>
</template>

<script>
//mdi-account-circle
import PasswordField from '@/components/util/PasswordField'
import LoadingSpinner from '@/components/util/LoadingSpinner'
import Rules from '@/mixins/rules'
import ErrorView from '@/components/util/ErrorView'
import { getErrorArray } from '@/services/server'
import LinkTable from '@/components/util/LinkTable'

export default {
    components: {
        PasswordField,
        LoadingSpinner,
        ErrorView,
        LinkTable,
    },

    mixins: [Rules],
    data() {
        return {
            email: '',
            username: '',
            password: '',
            confirmationPassword: '',
            verificationCode: '',

            formValidity: true,
            step: 0,
            showPassword: false,
            errors: [],
            showSpinner: false,
        }
    },

    computed: {
        title() {
            switch (this.step) {
                case 0:
                    return 'registerHeader'
                case 1:
                    return 'registerData.accountCreated'
                case 2:
                    return 'registerData.accountVerified'
                default:
                    return 'registerHeader'
            }
        },

        currentLanguage() {
            return this.$vuetify.lang.current
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

        submitRegister() {
            this.errors = []
            this.validateForm()
            if (this.formValidity) {
                this.showSpinner = true
                this.$store
                    .dispatch('authentication/register', {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                    })
                    .then(() => {
                        ++this.step
                    })
                    .catch(error => {
                        this.errors = getErrorArray(error)
                    })
                    .finally(() => {
                        this.showSpinner = false
                    })
            }
        },

        submitVerification() {
            this.errors = []
            this.showSpinner = true
            this.$store
                .dispatch('authentication/verify', {
                    token: this.verificationCode,
                })
                .then(() => {
                    ++this.step
                })
                .catch(error => {
                    this.errors = getErrorArray(error)
                })
                .finally(() => {
                    this.showSpinner = false
                })
        },

        setShowPassword(visible) {
            this.showPassword = visible
        },
    },
}
</script>

<style lang="scss" scoped></style>
