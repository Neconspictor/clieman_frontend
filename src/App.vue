<template>
    <v-app class="my-app">
        <v-app-bar
            app
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            dark
        >
            <v-toolbar-title>Dateman</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                v-for="link in links"
                :key="`${link.label} - header-link`"
                text
                rounded
                :to="link.route"
            >
                {{ link.label }}
            </v-btn>

            <v-btn text rounded @click="toggleTheme">
                {{
                    this.$vuetify.theme.dark
                        ? this.$i18n.t('dark')
                        : this.$i18n.t('light')
                }}
            </v-btn>
        </v-app-bar>

        <v-main class="scrollable">
            <router-view />
        </v-main>

        <v-footer
            padless
            style="background: url('https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg');"
        >
            <v-row justify="center" no-gutters>
                <v-btn
                    v-for="link in links"
                    :key="`${link.label} - footer-link`"
                    text
                    rounded
                    :to="link.route"
                    dark
                >
                    {{ link.label }}
                </v-btn>
                <v-col class="py-4 text-center white--text" cols="12" dark>
                    {{ new Date().getFullYear() }} —
                    <strong>Dateman</strong>
                </v-col>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    name: 'App',

    computed: {
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
}
</style>
