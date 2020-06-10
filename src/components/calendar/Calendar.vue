<template>
    <v-container
        v-touch="{
            left: () => handleSwipe('left'),
            right: () => handleSwipe('right'),
        }"
    >
        <v-row class="fill-height">
            <v-col>
                <v-sheet height="64">
                    <Toolbar
                        :type="type"
                        :start="start"
                        :end="end"
                        :calendarRef="this.$refs.calendar"
                        @next="next"
                        @prev="prev"
                        @type-change="type = $event"
                        @set-today="setToday"
                    />
                </v-sheet>
                <v-sheet height="600">
                    <v-calendar
                        ref="calendar"
                        v-model="focus"
                        color="primary"
                        :events="events"
                        :event-color="getEventColor"
                        :now="today"
                        :type="type"
                        @click:event="showEvent"
                        @click:more="viewDay"
                        @click:date="viewDay"
                        @change="updateRange"
                    >
                    </v-calendar>
                    <EventView
                        :selectedDOMElement="selectedDOMElement"
                        :selectedEvent="selectedEvent"
                        v-model="selectedOpen"
                    />
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import EventView from '@/components/calendar/EventView'
import Toolbar from '@/components/calendar/Toolbar'
import { mapGetters, mapState } from 'vuex'
import DateUtil from '@/util/date.js'
//import rfdc from 'rfdc'

export default {
    components: {
        EventView,
        Toolbar,
    },

    computed: {
        ...mapGetters(['getClientByID']),
        ...mapState(['clients', 'events']),
    },

    data: () => ({
        today: DateUtil.formatDefault(new Date()),
        focus: DateUtil.formatDefault(new Date()),

        type: 'month',

        name: null,
        details: null,
        start: null,
        end: null,
        color: '#1976D2',
        selectedEvent: {},
        selectedDOMElement: null,
        selectedOpen: false,
        dialog: false,
    }),

    methods: {
        getEventColor(ev) {
            return ev.color
        },

        viewDay({ date }) {
            this.focus = date
            this.type = 'day'
        },

        setToday() {
            this.focus = this.today
        },
        prev() {
            this.$refs.calendar.prev()
        },
        next() {
            this.$refs.calendar.next()
        },
        showEvent({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event
                this.selectedDOMElement = nativeEvent.target
                setTimeout(() => {
                    this.selectedOpen = true
                }, 10)
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                setTimeout(open, 10)
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },

        updateRange({ start, end }) {
            this.start = start
            this.end = end
        },

        handleSwipe(direction) {
            if (direction === 'left') {
                this.prev()
            } else if (direction === 'right') {
                this.next()
            }
        },
    },
}
</script>
