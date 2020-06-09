<template>
    <div>
        <Calendar :clients="clients" :events="clientDates" />
    </div>
</template>

<script>
import Calendar from '@/components/calendar/Calendar'
import { mapState } from 'vuex'
export default {
    components: {
        Calendar,
    },

    computed: mapState(['clients', 'clientDates']),
}
</script>

<style lang="scss" scoped></style>
