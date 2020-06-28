<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>{{ $i18n.t('register') }}</h1>
                <v-form ref="signupForm" v-model="formValidity">
                    <v-text-field
                        label="E-mail"
                        type="email"
                        v-model="email"
                        :rules="emailRules"
                        required
                    >
                    </v-text-field>

                    <v-btn
                        type="submit"
                        color="primary"
                        class="mr-4"
                        :disabled="!formValidity"
                        >{{ $i18n.t('createAccount') }}</v-btn
                    >
                    <!--<v-btn class="mr-4" color="success" @click="validateForm"
                        >Validate Form</v-btn
                    >
                    <v-btn color="warning" @click="resetValidation" class="mr-4"
                        >Reset Validation</v-btn
                    >
                    <v-btn color="error" @click="resetForm">Reset</v-btn>-->
                </v-form>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <p class="mt-4">
                    {{ $i18n.t('havingAnAccount') }}
                    <v-btn small color="success" :to="{ name: 'login' }">{{
                        $i18n.t('login')
                    }}</v-btn>
                </p>
            </v-col>
        </v-row>
    </v-container>
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
        }
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
    },
}
</script>

<style lang="scss" scoped></style>
