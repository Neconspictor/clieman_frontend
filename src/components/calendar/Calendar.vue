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
                        ref="toolbar"
                        :type="type"
                        :start="start"
                        :end="end"
                        :calendarRef="this.$refs.calendar"
                        @next="next"
                        @prev="prev"
                        @type-change="type = $event"
                        @set-today="setToday"
                        @create-event="startCreateEventDialog"
                    />
                </v-sheet>
                <v-sheet height="600" v-show="this.checkCardVisibility()">
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
                        :locale="$vuetify.lang.current"
                    >
                    </v-calendar>
                    <EventView
                        :DOMElement="DOMElement"
                        :event="selectedEvent"
                        v-model="selectedOpen"
                        @event-update="updateSelectedEvent"
                        @delete-event="deleteSelectedEvent"
                    />

                    <EventView
                        v-model="eventCreateDialogIsOpen"
                        :dialogPersistent="false"
                        :editing="true"
                        @input="handleEventCreatorStateChange"
                    >
                        <template v-slot:editor>
                            <EventEditor
                                ref="eventCreatorEditor"
                                v-if="eventCreateDialogIsOpen"
                                :event="defaultEvent"
                                @cancel="eventCreateDialogIsOpen = false"
                                @accept="createEvent"
                            >
                                <template v-slot:accept>
                                    {{ $i18n.t('create') }}
                                </template>
                            </EventEditor>
                        </template>
                    </EventView>

                    <!--<v-dialog
                        v-model="eventCreateDialogIsOpen"
                        @click:outside="eventCreateDialogIsOpen = false"
                        width="unset"
                    >
                        <EventEditor
                            v-if="eventCreateDialogIsOpen"
                            :event="defaultEvent"
                            @cancel="eventCreateDialogIsOpen = false"
                            @accept="createEvent"
                        >
                            <template v-slot:accept>
                                {{ $i18n.t('create') }}
                            </template>
                        </EventEditor>
                    </v-dialog>-->
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
import idUtil from '@/util/id.js'
import EventEditor from '@/components/calendar/EventEditor'
import moment from 'moment-timezone'
//import rfdc from 'rfdc'

export default {
    components: {
        EventView,
        Toolbar,
        EventEditor,
    },

    computed: {
        ...mapGetters(['getClientByID']),
        ...mapState(['clients', 'events']),
        defaultEvent() {
            const startDate = this.createDefaultStartDate()
            const endDate = this.createDefaultEndDate()
            return {
                startDate: startDate,
                start: DateUtil.formatDefault(startDate),
                endDate: endDate,
                end: DateUtil.formatDefault(endDate),
                color: this.$vuetify.theme.themes.light.primary,
                details: '',
                name: '',
                clients: [],
            }
        },
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
        DOMElement: null,
        selectedOpen: false,
        dialog: false,
        eventCreateDialogIsOpen: false,
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
                this.DOMElement = nativeEvent.target
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

        checkCardVisibility() {
            if (this.$refs.toolbar) {
                return !this.$refs.toolbar.isMobilMenuActive()
            }

            return true
        },

        updateSelectedEvent(newEvent) {
            this.$store.dispatch('updateEvent', newEvent).then(() => {
                this.selectedEvent = newEvent
            })
        },

        deleteSelectedEvent(event) {
            this.selectedOpen = false
            this.selectedEvent = {}
            this.$store.dispatch('deleteEvent', event).then(() => {})
        },

        startCreateEventDialog() {
            this.eventCreateDialogIsOpen = true
        },

        createDefaultStartDate() {
            return moment(new Date())
                .minutes(0)
                .hours(14)
                .toDate()
        },

        createDefaultEndDate() {
            return moment(this.createDefaultStartDate())
                .add(1, 'hours')
                .toDate()
        },

        createEvent(eventData) {
            const id = idUtil.defaultCreateUniqueID(this.events)
            this.$store.dispatch('addEvent', { ...eventData, id: id })
            this.eventCreateDialogIsOpen = false
        },

        handleEventCreatorStateChange(value) {
            if (!value) {
                this.$refs.eventCreatorEditor.reset()
            }
        },
    },
}
</script>
