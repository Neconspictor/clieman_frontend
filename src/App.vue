<template>
    <v-app class="my-app">
        <v-app-bar app :src="require('./assets/vbanner.jpg')" dark>
            <v-toolbar-title>Dateman</v-toolbar-title>
            <v-spacer></v-spacer>

            <div v-if="this.isAuthenticated()">
                <v-btn
                    v-for="link in links"
                    :key="`${link.label} - header-link`"
                    text
                    rounded
                    :to="link.route"
                >
                    {{ link.label }}
                </v-btn>

                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn icon text rounded v-on="on">
                            <v-icon>mdi-menu</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item @click="toggleTheme">
                            <v-avatar color="grey" size="36" class="mr-2">
                                <iconify-icon
                                    :class="
                                        `v-icon ${
                                            isDark
                                                ? 'theme--dark'
                                                : 'theme--light'
                                        }`
                                    "
                                    :icon="icons.baselineBedtime"
                                />
                            </v-avatar>
                            {{ this.$i18n.t('nightmode') }}

                            <v-spacer></v-spacer>

                            <v-switch
                                class="ml-2"
                                disabled
                                :value="this.$vuetify.theme.dark"
                            >
                            </v-switch>
                        </v-list-item>

                        <v-list-item
                            @click="$router.push({ name: 'settings' })"
                        >
                            <v-avatar color="grey" size="36" class="mr-2">
                                <v-icon>settings</v-icon>
                            </v-avatar>
                            {{ this.$i18n.t('settings') }}
                        </v-list-item>
                        <v-list-item @click="logout">
                            <v-avatar color="grey" size="36" class="mr-2">
                                <v-icon>exit_to_app</v-icon>
                            </v-avatar>
                            {{ this.$i18n.t('logout') }}
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </v-app-bar>

        <!--<router-view />-->

        <v-main class="scrollable">
            <router-view />
        </v-main>

        <v-footer
            padless
            :style="{
                'background-image':
                    'url(' + require('./assets/vbanner.jpg') + ')',
            }"
        >
            <v-row justify="center" no-gutters>
                <v-btn
                    v-for="(language, index) in languages"
                    :key="index"
                    text
                    rounded
                    @click="setLanguage(language.lang)"
                    dark
                >
                    {{ language.label }}
                </v-btn>
                <v-col class="py-4 text-center white--text" cols="12" dark>
                    <small>Dateman &copy; {{ new Date().getFullYear() }}</small>
                </v-col>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script>
import accountIcon from '@iconify/icons-mdi/account'
import baselineBedtime from '@iconify/icons-ic/baseline-bedtime'
import { authComputed } from '@/store/authentication'

export default {
    name: 'App',

    data() {
        return {
            icons: { account: accountIcon, baselineBedtime: baselineBedtime },

            languages: [
                {
                    label: 'Deutsch',
                    lang: 'de',
                },
                {
                    label: 'English',
                    lang: 'en',
                },
            ],
        }
    },

    computed: {
        ...authComputed,

        isDark() {
            return this.$vuetify.theme.dark
        },

        links() {
            return [
                {
                    label: this.$i18n.t('calendar'),
                    route: { name: 'calendar' },
                },
                {
                    label: this.$i18n.t('clients'),
                    route: { name: 'clients' },
                },
            ]
        },
    },

    methods: {
        toggleTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        },

        setLanguage(lang) {
            this.$vuetify.lang.current = lang
            this.$i18n.locale = this.$vuetify.lang.current
            this.$forceUpdate()
            //this.$router.go()
        },

        isPublicRoute() {
            let publicRoutes = ['login', 'register', 'verify']
            return publicRoutes.includes(this.$route.name)
        },

        logout(redirect) {
            if (redirect && this.$route.name !== 'login')
                this.$router.push({ name: 'login' })
            this.$store.dispatch('authentication/logout').then(() => {})
        },

        isAuthenticated() {
            var result = false
            if (!this.isPublicRoute()) {
                this.$store
                    .dispatch('authentication/testAuthentincationed')
                    .then(loggedIn => {
                        if (!loggedIn) {
                            this.logout(true)
                        }
                    })

                result = this.loggedIn
            }

            return result
        },
    },
}
</script>

<!-- global style -->
<style lang="scss">
// Import the Vuetify styles somewhere global
@import '~vuetify/src/styles/styles.sass';

.tool-header {
    color: white;
}
</style>

<style scoped="true">
.scrollable {
    overflow: auto;
    //height: 100%;
}

.my-app {
    width: 100%;
    //height: 100vh;
}
</style>
