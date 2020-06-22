<template>
    <div style="max-width: 70em; margin: auto;" class="justify-center">
        <div class="justify-center">
            <v-subheader> {{ $i18n.t('clients') }} </v-subheader>
        </div>

        <div>
            <v-data-iterator
                :items="clients"
                item-key="id"
                :items-per-page.sync="itemsPerPage"
                :page="page"
                :single-expand="true"
                hide-default-footer
                :search="search"
                :custom-filter="customFilter"
                :sort-by="sortBy.toLowerCase()"
                :sort-desc="sortDesc"
            >
                <template v-slot:header>
                    <v-toolbar class="mb-1" align="start" justify="left">
                        <v-text-field
                            v-model="search"
                            clearable
                            flat
                            solo
                            hide-details
                            prepend-inner-icon="search"
                            class="mr-4"
                            placeholder="Search"
                            outlined
                        ></v-text-field>
                        <template v-if="$vuetify.breakpoint.mdAndUp">
                            <v-spacer></v-spacer>
                            <v-select
                                v-model="sortBy"
                                solo
                                flat
                                hide-details
                                :items="keys"
                                prepend-inner-icon="search"
                                label="Sort by"
                                class="mr-4"
                                outlined
                            ></v-select>
                            <v-spacer></v-spacer>
                            <v-btn-toggle v-model="sortDesc" mandatory>
                                <v-btn large :value="false">
                                    <v-icon>mdi-arrow-up</v-icon>
                                </v-btn>
                                <v-btn large :value="true">
                                    <v-icon>mdi-arrow-down</v-icon>
                                </v-btn>
                            </v-btn-toggle>
                        </template>
                    </v-toolbar>
                </template>

                <template v-slot:default="{ items }">
                    <v-row style="padding-bottom: 16px" class="pl-2 pr-4">
                        <v-col
                            v-for="client in items"
                            :key="client.id"
                            cols="12"
                            sm="6"
                            md="4"
                            lg="3"
                            class="mr-0 pr-0 pl-2"
                        >
                            <v-hover>
                                <template v-slot="{ hover }">
                                    <ClientCard
                                        :hover="hover"
                                        :client="client"
                                        :width="clientCardWidth"
                                        @click="handleClickedClientCard"
                                    />
                                </template>
                            </v-hover>
                        </v-col>
                    </v-row>
                </template>

                <template v-slot:footer>
                    <div class="d-flex justify-center mt-2">
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
                        <v-btn fab class="mr-1" @click="formerPage">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn fab class="ml-1" @click="nextPage">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </div>
                </template>
            </v-data-iterator>
        </div>

        <ClientDetails
            ref="clientDetails"
            v-model="selectedOpen"
            :client="selectedClient()"
            :width="clientCardWidth"
            :DOMElement="clientDOMElement"
        />
    </div>
</template>

<script>
import ClientCard from '@/components/client/ClientCard'
import ClientDetails from '@/components/client/ClientDetails'
import moment from 'moment-timezone'
import { mapGetters } from 'vuex'
export default {
    components: {
        ClientCard,
        ClientDetails,
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
            search: '',
            sortBy: 'name',
            sortDesc: false,
            keys: ['name'],
            clientDOMElement: null,
            selectedClientID: null,
            selectedOpen: false,
        }
    },

    computed: {
        ...mapGetters(['getClientByID']),

        numberOfPages() {
            return Math.ceil(this.clients.length / this.itemsPerPage)
        },
    },

    methods: {
        selectedClient() {
            return this.getClientByID(this.selectedClientID)
        },
        handleClickedClientCard(event) {
            console.log('handleClickedClientCard')

            if (this.$refs.clientDetails.isEditing()) {
                return null
            }

            const open = () => {
                console.log('handleClickedClientCard:open')
                this.clientDOMElement = event.domElement
                this.selectedClientID = event.client.id
                setTimeout(() => {
                    console.log('nextTick: selectedOpen')
                    this.selectedOpen = true
                }, 200)
            }

            if (this.selectedOpen) {
                console.log('handleClickedClientCard: selectedOpen')
                this.selectedOpen = false
                setTimeout(open, 10)
            } else {
                open()
                console.log('handleClickedClientCard: after open')
            }
            event.nativeEvent.stopPropagation()
            console.log('handleClickedClientCard: end')
        },

        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1
        },

        // eslint-disable-next-line no-unused-vars
        customFilter(items, search) {
            search = search.toString().toLowerCase()
            console.log('search: ', search)

            return items.filter(item => {
                for (const key in item) {
                    var source = item[key]
                    if (key === 'sex') {
                        source = this.$i18n.t(item[key])
                    } else if (key === 'birthday') {
                        source = moment(item[key]).format('YYYY-MM-DD')
                    }
                    var value = source.toString().toLowerCase()

                    console.log(value)
                    if (value.startsWith(search)) {
                        return true
                    }
                }

                return false
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.row {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
}
</style>
