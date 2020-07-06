<template>
    <div>
        <Calendar ref="calendar" />
        <p style="max-width: 400px; margin: auto">
            <ErrorView :errors="errors" />
        </p>
        <LoadingSpinner :value="showSpinner" z-index="10000" />
    </div>
</template>

<script>
import Calendar from '@/components/calendar/Calendar'
import LoadingSpinner from '@/components/util/LoadingSpinner'
import ErrorView from '@/components/util/ErrorView'
import { getErrorArray } from '@/services/server'

export default {
    components: {
        Calendar,
        LoadingSpinner,
        ErrorView,
    },

    data() {
        return {
            showSpinner: false,
            errors: [],
        }
    },

    created() {
        this.showSpinner = true
        this.errors = []
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

<style lang="scss" scoped></style>
