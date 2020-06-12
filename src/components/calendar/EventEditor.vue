<template>
    <div>
        <!-- editing view -->
        <v-card color="grey lighten-4" flat style="width:400px;">
            <v-toolbar
                :color="clonedEvent.color"
                dark
                flat
                style="overflow-x:auto; white-space: nowrap;"
            >
                <v-btn icon disabled>
                    <v-icon>mdi-delete</v-icon>
                </v-btn>

                <!-- <div v-html="event.name"></div>-->
                <input type="text" v-model="clonedEvent.name" />

                <v-spacer></v-spacer>
                <v-btn icon disabled>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <form>
                    <textarea-autosize
                        v-model="clonedEvent.details"
                        type="text"
                        style="width:100%;"
                        :min-height="0"
                        placeholder="add note"
                    ></textarea-autosize>
                </form>
                <v-divider></v-divider>
                <div>
                    <v-menu
                        v-model="menuDatePicker"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateWithoutTime"
                                label="Select date"
                                prepend-icon="event"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="dateWithoutTime"
                            @input="menuDatePicker = false"
                        ></v-date-picker>
                    </v-menu>

                    <v-menu
                        ref="menuTimePicker"
                        v-model="menuTimePicker"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="dateOnlyTime"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateOnlyTime"
                                label="Select hour"
                                prepend-icon="access_time"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-time-picker
                            v-if="menuTimePicker"
                            v-model="dateOnlyTime"
                            format="24hr"
                            full-width
                            @click:hour="closeTimePicker"
                            @click:minute="
                                $refs.menuTimePicker.save(dateOnlyTime)
                            "
                        ></v-time-picker>
                    </v-menu>

                    <div>
                        <v-text-field
                            v-model="clonedEvent.color"
                            v-mask="mask"
                            hide-details
                            class="ma-0 pa-0"
                            solo
                        >
                            <template v-slot:append>
                                <v-menu
                                    v-model="menuColorPicker"
                                    top
                                    nudge-bottom="105"
                                    nudge-left="16"
                                    :close-on-content-click="false"
                                >
                                    <template v-slot:activator="{ on }">
                                        <div :style="swatchStyle" v-on="on" />
                                    </template>
                                    <v-card>
                                        <v-card-text class="pa-0">
                                            <v-color-picker
                                                v-model="clonedEvent.color"
                                                flat
                                            />
                                        </v-card-text>
                                    </v-card>
                                </v-menu>
                            </template>
                        </v-text-field>
                    </div>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="error" @click="cancel">
                    Cancel
                </v-btn>
                <v-btn text color="success" @click="save">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import rfdc from 'rfdc'
import DateUtil from '@/util/date.js'
import moment from 'moment-timezone'

export default {
    components: {},

    props: {
        event: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            menuDatePicker: false,
            menuTimePicker: false,
            menuColorPicker: false,
            mask: '!#XXXXXXXX',
            clonedEvent: rfdc()(this.event),
        }
    },

    computed: {
        dateWithoutTime: {
            get: function() {
                return DateUtil.formatDate(
                    this.clonedEvent.startDate,
                    DateUtil.getDefaultTimeZone(),
                    DateUtil.getYearToDayFormat()
                )
            },

            set: function(newValue) {
                const date = moment(newValue)
                const startDate = moment(this.clonedEvent.startDate)
                startDate.year(date.year())
                startDate.month(date.month())
                startDate.date(date.date())
                this.clonedEvent.startDate = startDate.toDate()
                this.clonedEvent.start = DateUtil.formatDefault(startDate)
            },
        },

        dateOnlyTime: {
            get: function() {
                return DateUtil.formatDate(
                    this.clonedEvent.startDate,
                    DateUtil.getDefaultTimeZone(),
                    DateUtil.getHourToMinutesFormat()
                )
            },

            set: function(newValue) {
                const date = moment(newValue, 'HH:mm')
                const startDate = moment(this.clonedEvent.startDate)
                startDate.hours(date.hours())
                startDate.minutes(date.minutes())
                this.clonedEvent.startDate = startDate.toDate()
                this.clonedEvent.start = DateUtil.formatDefault(startDate)
            },
        },

        swatchStyle() {
            const { clonedEvent, menuColorPicker } = this
            return {
                backgroundColor: clonedEvent.color,
                cursor: 'pointer',
                height: '30px',
                width: '30px',
                borderRadius: menuColorPicker ? '50%' : '4px',
                transition: 'border-radius 200ms ease-in-out',
            }
        },
    },

    methods: {
        closeTimePicker: function(v) {
            v = v < 10 ? '0' + v : v
            this.time = v + ':00'
            this.menuTimePicker = false
            this.$refs.menuTimePicker.save(this.time)
        },

        cancel() {
            this.$emit('canceled')
        },

        save() {
            this.$emit('saved', this.clonedEvent)
        },
    },
}
</script>

<style lang="scss" scoped></style>
