/* eslint-disable no-unused-vars */
<template>
    <div>
        <v-toolbar flat color="white">
            <v-btn
                outlined
                class="mr-4 d-none d-sm-flex"
                color="grey darken-2"
                @click="emitSetToday"
            >
                {{ $t('today') }}
            </v-btn>

            <v-btn
                outlined
                class="mr-4 d-none d-sm-flex"
                color="grey darken-2"
                @click="emitCreateEvent"
            >
                {{ $t('create') }}
            </v-btn>

            <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="emitPrev"
                class="d-none d-sm-flex"
            >
                <v-icon small>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="emitNext"
                class="d-none d-sm-flex"
            >
                <v-icon small>mdi-chevron-right</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                fab
                text
                small
                color="grey darken-2"
                @click="showMobilMenu = true"
                class="hidden-sm-and-up"
            >
                <v-icon small>mdi-dots-vertical</v-icon>
            </v-btn>
            <ToolbarMobilMenu
                v-model="showMobilMenu"
                :type="type"
                @type-change="emitTypeChange"
                @set-today="emitSetToday"
                @create-event="emitCreateEvent"
            />

            <div class="d-none d-sm-flex">
                <ModeMenu :type="type" @type-change="emitTypeChange" />
            </div>
        </v-toolbar>
    </div>
</template>

<script>
import ToolbarMobilMenu from '@/components/calendar/ToolbarMobilMenu'
import ModeMenu from '@/components/calendar/ModeMenu'
import moment from 'moment-timezone'
import 'vue-i18n'

export default {
    components: {
        ToolbarMobilMenu,
        ModeMenu,
    },
    props: {
        type: {
            type: String,
            required: true,
        },

        start: {
            type: String,
            required: true,
        },
        end: {
            type: String,
            required: true,
        },

        calendarRef: {
            type: Object,
            required: true,
        },
    },
    methods: {
        emitTypeChange(type) {
            this.$emit('type-change', type)
        },

        emitNext() {
            this.$emit('next')
        },
        emitPrev() {
            this.$emit('prev')
        },

        emitSetToday() {
            this.$emit('set-today')
        },

        emitCreateEvent() {
            this.$emit('create-event')
        },

        isMobilMenuActive() {
            return this.showMobilMenu
        },

        monthFormatter(date) {
            return moment(date)
                .locale(this.$vuetify.lang.current)
                .format('MMMM')
        },

        ISOtoLongDate(
            isoString,
            locale = 'en-US',
            options = { month: 'numeric', day: 'numeric', year: 'numeric' }
        ) {
            const date = new Date(isoString)
            const longDate = new Intl.DateTimeFormat(locale, options).format(
                date
            )
            return longDate
        },
    },

    data() {
        return {
            showMobilMenu: false,
        }
    },

    computed: {
        title() {
            if (!this.start || !this.end) {
                return ''
            }

            const startYear = moment(this.start.date).year()
            const endYear = moment(this.end.date).year()

            switch (this.type) {
                case 'month':
                    return this.ISOtoLongDate(
                        new Date(this.start.date).toISOString(),
                        this.$vuetify.lang.current,
                        { month: 'numeric', year: 'numeric' }
                    )
                case 'week':
                case '4day':
                    ///return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`
                    return (
                        this.ISOtoLongDate(
                            new Date(this.start.date).toISOString(),
                            this.$vuetify.lang.current,
                            {
                                day: 'numeric',
                                month: 'numeric',
                                year:
                                    startYear === endYear
                                        ? undefined
                                        : 'numeric',
                            }
                        ) +
                        ' - ' +
                        this.ISOtoLongDate(
                            new Date(this.end.date).toISOString(),
                            this.$vuetify.lang.current
                        )
                    )
                case 'day':
                    return this.ISOtoLongDate(
                        new Date(this.start.date).toISOString(),
                        this.$vuetify.lang.current
                    )
            }
            return ''
        },
    },
}
</script>

<style lang="scss" scoped></style>
