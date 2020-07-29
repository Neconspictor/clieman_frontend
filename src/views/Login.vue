<template>
    <div class="mx-auto mt-5 " style="width: 400px;">
        <v-card>
            <v-card-title>
                <h1 class="display-1">{{ $i18n.t('loginNoun') }}</h1>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field
                        v-model="authName"
                        :label="`${$i18n.t('username')} / ${$i18n.t('email')}`"
                        prepend-icon="mdi-account-circle"
                    />

                    <PasswordField v-model="password" />
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer />
                <v-btn color="info" @click="tryLogin">{{
                    $i18n.t('login')
                }}</v-btn>
            </v-card-actions>
        </v-card>

        <LinkTable
            :content="[
                {
                    desc: 'notHavingAnAccount',
                    route: 'register',
                    linkName: 'register',
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
import PasswordField from '@/components/util/PasswordField'
import LoadingSpinner from '@/components/util/LoadingSpinner'
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
    data: () => ({
        showPassword: false,
        authName: '',
        password: '',
        showSpinner: false,
        errors: [],
    }),

    methods: {
        tryLogin() {
            this.errors = []
            this.showSpinner = true
            this.$store
                .dispatch('authentication/login', {
                    principal: this.authName,
                    password: this.password,
                })
                .then(() => {
                    this.$router.push({ name: 'calendar' })
                })
                .catch(error => {
                    this.errors = getErrorArray(error)
                })
                .finally(() => {
                    this.showSpinner = false
                })
        },
    },
}
</script>

<style lang="scss" scoped></style>
