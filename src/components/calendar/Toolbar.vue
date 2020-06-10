<template>
    <div>
        <v-toolbar flat color="white">
            <v-btn
                outlined
                class="mr-4 d-none d-sm-flex"
                color="grey darken-2"
                @click="emitSetToday"
            >
                Today
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

        nth(d) {
            return d > 3 && d < 21
                ? 'th'
                : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][
                      d % 10
                  ]
        },

        isMobilMenuActive() {
            return this.showMobilMenu
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

            const startMonth = this.monthFormatter(this.start)
            const endMonth = this.monthFormatter(this.end)
            const suffixMonth = startMonth === endMonth ? '' : endMonth

            const startYear = this.start.year
            const endYear = this.end.year
            const suffixYear = startYear === endYear ? '' : endYear

            const startDay = this.start.day + this.nth(this.start.day)
            const endDay = this.end.day + this.nth(this.end.day)

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
            return this.calendarRef.getFormatter({
                timeZone: 'UTC',
                month: 'long',
            })
        },
    },
}
</script>

<style lang="scss" scoped></style>
