<template>
    <div class="mx-auto mt-5 " style="width: 400px;">
        <v-card class="mx-auto mt-5 ">
            <v-card-title>
                <h1 class="display-1">{{ $i18n.t('login') }}</h1>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field
                        :label="$i18n.t('username')"
                        prepend-icon="mdi-account-circle"
                    />
                    <v-text-field
                        :label="$i18n.t('password')"
                        :type="showPassword ? 'text' : 'password'"
                        prepend-icon="mdi-lock"
                    >
                        <v-tooltip slot="append" bottom>
                            <template v-slot:activator="{ on }"
                                ><v-btn
                                    icon
                                    color="primary"
                                    v-on="on"
                                    @click="showPassword = !showPassword"
                                >
                                    <v-icon>{{
                                        showPassword ? 'mdi-eye' : 'mdi-eye-off'
                                    }}</v-icon>
                                </v-btn>
                            </template>

                            <span>{{
                                showPassword
                                    ? $i18n.t('hidePassword')
                                    : $i18n.t('showPassword')
                            }}</span>
                        </v-tooltip></v-text-field
                    >
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
export default {
    data: () => ({
        showPassword: false,
    }),
}
</script>

<style lang="scss" scoped></style>
