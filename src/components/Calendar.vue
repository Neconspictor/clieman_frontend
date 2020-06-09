<template>
    <v-row class="fill-height">
        <v-col>
            <v-sheet height="64">
                <v-toolbar flat color="white">
                    <v-btn
                        outlined
                        class="mr-4"
                        color="grey darken-2"
                        @click="setToday"
                    >
                        Today
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="prev">
                        <v-icon small>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="next">
                        <v-icon small>mdi-chevron-right</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>{{ title }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-menu bottom right>
                        <template v-slot:activator="{ on }">
                            <v-btn outlined color="grey darken-2" v-on="on">
                                <span>{{ typeToLabel[type] }}</span>
                                <v-icon right>mdi-menu-down</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="type = 'day'">
                                <v-list-item-title>Day</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = '4day'">
                                <v-list-item-title>4 days</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'week'">
                                <v-list-item-title>Week</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'month'">
                                <v-list-item-title>Month</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-toolbar>
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
                ></v-calendar>
                <v-menu
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    offset-x
                >
                    <v-card color="grey lighten-4" min-width="350px" flat>
                        <v-toolbar :color="selectedEvent.color" dark>
                            <v-btn icon>
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-toolbar-title
                                v-html="selectedEvent.name"
                            ></v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn icon>
                                <v-icon>mdi-heart</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-card-text>
                            <span v-html="selectedEvent.details"></span>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                text
                                color="secondary"
                                @click="selectedOpen = false"
                            >
                                Cancel
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import { db } from '@/main'

export default {
    data: () => ({
        today: new Date().toISOString().substr(0, 10),
        focus: new Date().toISOString().substr(0, 10),

        type: 'month',
        typeToLabel: {
            day: 'Day',
            '4day': '4 Days',
            week: 'Week',
            month: 'Month',
        },

        name: null,
        details: null,
        start: null,
        end: null,
        color: '#1976D2',
        currentlyEditing: null,
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        clients: [],
        idToClient: new Map(),
        dialog: false,
    }),

    computed: {
        title() {
            const { start, end } = this
            if (!start || !end) {
                return ''
            }

            const startMonth = this.monthFormatter(start)
            const endMonth = this.monthFormatter(end)
            const suffixMonth = startMonth === endMonth ? '' : endMonth

            const startYear = start.year
            const endYear = end.year
            const suffixYear = startYear === endYear ? '' : endYear

            const startDay = start.day + this.nth(start.day)
            const endDay = end.day + this.nth(end.day)

            switch (this.type) {
                case 'month':
                    return `${startMonth} ${startYear}`
                case 'week':
                case '4day':
                    return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
                case 'day':
                    return `${startMonth} ${startDay} ${startYear}`
            }
            return ''
        },
        monthFormatter() {
            return this.$refs.calendar.getFormatter({
                timeZone: 'UTC',
                month: 'long',
            })
        },
    },

    mounted() {
        Promise.all([this.fetchClients(), this.fetEvents()])
            .then(() => {
                this.clients.forEach(client => {
                    this.idToClient.set(client.id, client)
                })

                for (const event of this.events) {
                    for (let i = 0; i < event.clients.length; ++i) {
                        event.clients[i] = this.idToClient.get(
                            event.clients[i].trim()
                        )
                    }
                }
            })
            .catch(e => {
                console.log("Couldn't fetch events: ", e)
            })
    },

    methods: {
        async processDoc(doc) {
            let data = doc.data()
            let appData = data
            appData.id = doc.id
            this.events.push(appData)
        },

        async fetchClients() {
            const snapshot = await db.collection('clients').get()

            snapshot.forEach(doc => {
                let data = doc.data()
                let appData = data
                appData.id = doc.id
                this.clients.push(appData)
            })
            //this.events = response
            console.log('clients = ', this.clients)
        },

        async fetEvents() {
            const snapshot = await db.collection('clientDates').get()

            snapshot.forEach(doc => {
                let data = doc.data()
                let appData = data
                appData.id = doc.id

                appData.start = this.formatDate(
                    new Date(appData.start.seconds * 1000)
                )
                appData.end = this.formatDate(
                    new Date(appData.end.seconds * 1000)
                )

                this.events.push(appData)
            })

            //this.events = response
            console.log('events = ', this.events)
        },

        getEventColor(ev) {
            return ev.color
        },

        formatDate(d) {
            return (
                d.getUTCFullYear() +
                '-' +
                (d.getUTCMonth() + 1) +
                '-' +
                d.getUTCDate() +
                ' ' +
                d.getUTCHours() +
                ':' +
                d.getUTCMinutes()
            )
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
                setTimeout(() => (this.selectedOpen = true), 10)
            }

            if (this.selectedOpen) {
                this.selectedOpen = false
                setTimeout(open, 10)
            } else {
                open()
            }

            nativeEvent.stopPropagation()
        },

        nth(d) {
            return d > 3 && d < 21
                ? 'th'
                : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][
                      d % 10
                  ]
        },
        rnd(a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },

        updateRange({ start, end }) {
            this.start = start
            this.end = end
        },
    },
}
</script>
