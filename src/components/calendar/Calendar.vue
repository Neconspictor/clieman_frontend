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
                <v-sheet v-show="this.checkCardVisibility()">
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
                        :locale="activeLanguage"
                        :first-interval="intervals.first"
                        :interval-minutes="intervals.minutes"
                        :interval-count="intervals.count"
                        :interval-height="intervals.height"
                        :show-interval-label="() => true"
                        class="calendar-daily"
                        :event-timed="checkTimed"
                    >
                        <!-- <template
                            v-slot:event="{ event, eventParsed, formatTime }"
                        >
                            <div>
                                {{ formatTime(eventParsed.start) }}
                                -
                                {{ formatTime(eventParsed.end) }}:
                                {{ event.name }}
                            </div>
                        </template>-->
                    </v-calendar>
                    <EventView
                        ref="eventView"
                        :DOMElement="DOMElement"
                        :event="selectedEvent"
                        v-model="selectedOpen"
                        @input="evaluateHideEventView"
                        @event-update="updateSelectedEvent"
                        @delete-event="deleteSelectedEvent"
                        @start-edit="errors = []"
                        @cancel="errors = []"
                        :errors="errors"
                    />

                    <EventView
                        v-model="eventCreateDialogIsOpen"
                        :dialogPersistent="false"
                        :editing="true"
                        @input="handleEventCreatorStateChange"
                        @start-edit="errors = []"
                        @cancel="errors = []"
                        :errors="errors"
                    >
                        <template v-slot:editor>
                            <EventEditor
                                ref="eventCreatorEditor"
                                v-if="eventCreateDialogIsOpen"
                                :event="defaultEvent"
                                @cancel="eventCreateDialogIsOpen = false"
                                @accept="createEvent"
                                :errors="errors"
                            >
                                <template v-slot:accept>
                                    {{ $i18n.t('create') }}
                                    <v-icon>add</v-icon>
                                </template>
                            </EventEditor>
                        </template>
                    </EventView>
                </v-sheet>
            </v-col>
        </v-row>
        <LoadingSpinner :value="showSpinner" />
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
import LoadingSpinner from '@/components/util/LoadingSpinner'
import { getErrorArray } from '@/services/server'
//import rfdc from 'rfdc'

export default {
    components: {
        EventView,
        Toolbar,
        EventEditor,
        LoadingSpinner,
    },

    computed: {
        ...mapGetters('client', ['getClientByID']),
        ...mapState('client', ['clients']),
        ...mapState('event', ['events']),
        ...mapState('settings', ['calendarOptions', 'activeLanguage']),

        defaultEvent() {
            console.log('test')
            const start = this.createDefaultStartDate()
            const end = this.createDefaultEndDate()
            return {
                start: start,
                end: end,
                color: this.$vuetify.theme.themes.light.primary,
                details: '',
                name: '',
                clients: [],
            }
        },

        intervals() {
            return {
                first: this.calendarOptions.workingRange.start.getHours(),
                minutes: 60,
                count: Math.max(
                    this.calendarOptions.workingRange.end.getHours() -
                        this.calendarOptions.workingRange.start.getHours(),
                    0
                ),
                height: 100,
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
        showSpinner: false,
        errors: [],
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
            this.errors = []
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
            this.showSpinner = true
            this.errors = []
            this.$store
                .dispatch('event/updateEvent', newEvent)
                .then(() => {
                    this.selectedEvent = newEvent
                    this.$refs.eventView.resetEditing()
                })
                .catch(e => {
                    this.errors = getErrorArray(e)
                })
                .finally(() => {
                    this.showSpinner = false
                })
        },

        deleteSelectedEvent(event) {
            this.showSpinner = true
            this.errors = []
            this.$store
                .dispatch('event/deleteEvent', event)
                .then(() => {
                    this.selectedOpen = false
                    this.selectedEvent = {}
                })
                .catch(e => {
                    this.errors = getErrorArray(e)
                    console.log('this.errors', this.errors)
                })
                .finally(() => {
                    this.showSpinner = false
                })
        },

        startCreateEventDialog() {
            this.errors = []
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
            this.showSpinner = true
            this.errors = []
            this.$store
                .dispatch('event/addEvent', { ...eventData, id: id })
                .then(() => {
                    this.eventCreateDialogIsOpen = false
                    this.$refs.eventCreatorEditor.reset()
                })
                .catch(e => {
                    this.errors = getErrorArray(e)
                })
                .finally(() => {
                    this.showSpinner = false
                })
        },

        handleEventCreatorStateChange(value) {
            this.errors = []
            if (!value) {
                this.$refs.eventCreatorEditor.reset()
            }
        },

        evaluateHideEventView(newValue) {
            console.log('test')
            if (!newValue && this.showSpinner) {
                setTimeout(() => {
                    this.selectedOpen = true
                })
            }
            this.errors = []
        },

        checkTimed(event) {
            const startHour = event.start.getHours()
            const endHour = event.end.getHours()
            const visibleStartHour = this.calendarOptions.workingRange.start.getHours()
            const visibleEndHour = this.calendarOptions.workingRange.end.getHours()

            return (
                (startHour > visibleStartHour && startHour < visibleEndHour) ||
                (endHour > visibleStartHour && endHour < visibleEndHour)
            )
        },
    },
}
</script>

<style lang="css" scoped>
.calendar-daily >>> .v-calendar-daily__interval-text {
    font-size: 12px;
    top: -3px;
}
</style>
