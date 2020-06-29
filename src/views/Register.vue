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
                                label="E-mail"
                                type="email"
                                v-model="email"
                                :rules="emailRules"
                                required
                            >
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
export default {
    components: {},
    data() {
        return {
            email: '',
            emailRules: [
                email => !!email || 'E-mail is required.',
                email =>
                    email.indexOf('@') !== 0 ||
                    'E-mail should have a user name',
                email =>
                    email.includes('@') > 0 ||
                    'E-mail should include an @ symbol',
                email => {
                    return (
                        email.lastIndexOf('.') - email.indexOf('@') > 1 ||
                        'E-mail should contain a valid domain.'
                    )
                },
                email =>
                    email.lastIndexOf('.') <= email.length - 3 ||
                    'E-mail should contain a valid domain extenion.',
            ],

            formValidity: false,
            step: 0,
        }
    },

    computed: {
        title() {
            switch (this.step) {
                case 0:
                    return 'register'
                case 1:
                    return 'registerData.accountCreated'
                default:
                    return 'register'
            }
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
