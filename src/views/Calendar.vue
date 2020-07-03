<template>
    <div>
        <Calendar ref="calendar" />
        <LoadingSpinner :value="showSpinner" />
    </div>
</template>

<script>
import Calendar from '@/components/calendar/Calendar'
import LoadingSpinner from '@/components/util/LoadingSpinner'

export default {
    components: {
        Calendar,
        LoadingSpinner,
    },

    data() {
        return {
            showSpinner: false,
        }
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
                        console.log("Couldn't fetch events: ", e)
                    })
            })
            .catch(e => {
                console.log("Couldn't fetch clients: ", e)
            })
            .finally(() => {
                this.showSpinner = false
            })
    },
}
</script>

<style lang="scss" scoped></style>
