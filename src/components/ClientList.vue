<template>
    <div>
        <v-row align="start" justify="center">
            <v-subheader> {{ $i18n.t('clients') }} </v-subheader>
        </v-row>

        <v-row align="start" justify="center">
            <v-data-iterator
                :items="clients"
                item-key="id"
                :items-per-page.sync="itemsPerPage"
                :page="page"
                :single-expand="true"
                hide-default-footer
            >
                <template v-slot:default="{ items, isExpanded, expand }">
                    <v-row v-for="client in items" :key="client.id">
                        <v-hover>
                            <template v-slot="{ hover }">
                                <ClientCard
                                    :hover="hover"
                                    :isExpanded="isExpanded(client)"
                                    :client="client"
                                    @expand="v => expand(client, v)"
                                    :width="clientCardWidth"
                                />
                            </template>
                        </v-hover>
                    </v-row>
                </template>

                <template v-slot:footer>
                    <v-row class="mt-2" align="center" justify="center">
                        <span class="grey--text">Items per page</span>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    dark
                                    text
                                    color="primary"
                                    class="ml-2"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    {{ itemsPerPage }}
                                    <v-icon>mdi-chevron-down</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item
                                    v-for="(number, index) in itemsPerPageArray"
                                    :key="index"
                                    @click="event => (itemsPerPage = number)"
                                >
                                    <v-list-item-title>{{
                                        number
                                    }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>

                        <v-spacer></v-spacer>

                        <span class="mr-4 grey--text">
                            Page {{ page }} of {{ numberOfPages }}
                        </span>
                        <v-btn
                            fab
                            dark
                            color="blue darken-3"
                            class="mr-1"
                            @click="formerPage"
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn
                            fab
                            dark
                            color="blue darken-3"
                            class="ml-1"
                            @click="nextPage"
                        >
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </v-row>
                </template>
            </v-data-iterator>
        </v-row>
    </div>
</template>

<script>
import ClientCard from '@/components/ClientCard'
export default {
    components: {
        ClientCard,
    },

    props: {
        clients: {
            type: Array,
            required: true,
        },

        clientCardWidth: {
            type: String,
            default: '300px',
        },
    },

    data() {
        return {
            itemsPerPageArray: [2, 4, 8, 12],
            itemsPerPage: 4,
            page: 1,
        }
    },

    computed: {
        numberOfPages() {
            return Math.ceil(this.clients.length / this.itemsPerPage)
        },
    },

    methods: {
        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1
        },
    },
}
</script>

<style lang="scss" scoped></style>
