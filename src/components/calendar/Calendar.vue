<template>
    <v-container>
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
                        :selectedElement="selectedElement"
                        :selectedEvent="selectedEvent"
                        v-bind:selectedOpen="selectedOpen"
                        @selected-open-changed="onOpenStateChange"
                    />
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import EventView from '@/components/calendar/EventView'
import Toolbar from '@/components/calendar/Toolbar'
import { mapGetters } from 'vuex'

export default {
    components: {
        EventView,
        Toolbar,
    },

    computed: mapGetters(['getClientByID']),

    props: {
        events: {
            type: Array,
            required: true,
        },
        clients: {
            type: Array,
            required: true,
        },
    },
    data: () => ({
        today: new Date().toISOString().substr(0, 10),
        focus: new Date().toISOString().substr(0, 10),

        type: 'month',

        name: null,
        details: null,
        start: null,
        end: null,
        color: '#1976D2',
        selectedEvent: {},
        selectedElement: null,
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
                this.selectedElement = nativeEvent.target
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

        onOpenStateChange(value) {
            this.selectedOpen = value
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
