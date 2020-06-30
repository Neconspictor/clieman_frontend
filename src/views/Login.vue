<template>
    <div class="mx-auto mt-5 " style="width: 400px;">
        <v-card>
            <v-card-title>
                <h1 class="display-1">{{ $i18n.t('login') }}</h1>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field
                        v-model="username"
                        :label="`${$i18n.t('username')} / ${$i18n.t('email')}`"
                        prepend-icon="mdi-account-circle"
                    />

                    <PasswordField v-model="password" />
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer />
                <v-btn color="info">{{ $i18n.t('login') }}</v-btn>
            </v-card-actions>
        </v-card>
        <p class="mt-4">
            {{ $i18n.t('notHavingAnAccount') }}
            <v-btn small color="success" :to="{ name: 'register' }">{{
                $i18n.t('register')
            }}</v-btn>
        </p>
    </div>
</template>

<script>
import PasswordField from '@/components/util/PasswordField'

export default {
    components: {
        PasswordField,
    },
    data: () => ({
        showPassword: false,
        username: '',
        password: '',
    }),
}
</script>

<style lang="scss" scoped></style>
