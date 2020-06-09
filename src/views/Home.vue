<template>
    <div
        v-touch="{
            left: () => swipe('left'),
            right: () => swipe('right'),
        }"
    >
        <Calendar :clients="clients" :events="clientDates" ref="calendar" />
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

    methods: {
        swipe(direction) {
            console.log('swiped to ', direction)
            this.$refs.calendar.handleSwipe(direction)
        },
    },
}
</script>

<style lang="scss" scoped></style>
