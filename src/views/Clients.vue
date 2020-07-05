<template>
    <div>
        <v-container fluid class="listContainer">
            <ClientList :clients="clients" clientCardWidth="500px" />
            <p style="max-width: 400px; margin: auto">
                <ErrorView :errors="errors" />
            </p>
        </v-container>
        <LoadingSpinner :value="showSpinner" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import ClientList from '@/components/client/ClientList'
import LoadingSpinner from '@/components/util/LoadingSpinner'
import ErrorView from '@/components/util/ErrorView'
import { getErrorArray } from '@/services/server'

export default {
    components: {
        ClientList,
        LoadingSpinner,
        ErrorView,
    },

    data() {
        return {
            showSpinner: false,
            errors: [],
        }
    },

    computed: {
        ...mapState('client', ['clients']),
    },

    methods: {
        onClickOutside() {
            console.log('test')
        },
        onClick() {
            console.log('onClick')
        },
    },

    created() {
        this.showSpinner = true
        this.$store
            .dispatch('client/fetchClients')
            .then(async () => {
                await this.$store
                    .dispatch(
                        'event/fetchEvents',
                        this.$store.getters['client/getClientByID']
                    )
                    .catch(e => {
                        this.errors = getErrorArray(e)
                        this.errors.push('noEventsFetched')
                    })
            })
            .catch(e => {
                this.errors = getErrorArray(e)
                this.errors.push('noClientsFetched')
            })
            .finally(() => {
                this.showSpinner = false
            })
    },
}
</script>

<style lang="scss" scoped>
.listContainer {
    min-width: 440px;
}
</style>
