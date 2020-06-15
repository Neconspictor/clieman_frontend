<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>Dateman</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                v-for="link in links"
                :key="`${link.label} - header-link`"
                color="white"
                text
                rounded
                class="my-2"
                :to="link.route"
            >
                {{ link.label }}
            </v-btn>
        </v-app-bar>
        <v-main>
            <router-view />
        </v-main>

        <v-footer color="primary lighten-1" padless>
            <v-row justify="center" no-gutters>
                <v-btn
                    v-for="link in links"
                    :key="`${link.label} - footer-link`"
                    color="white"
                    text
                    rounded
                    class="my-2"
                    :to="link.route"
                >
                    {{ link.label }}
                </v-btn>
                <v-col
                    class="primary lighten-2 py-4 text-center white--text"
                    cols="12"
                >
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
}
</script>
