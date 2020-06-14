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
            </v-card-text>
            <v-card-text>
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
                            label="Date"
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
                            label="Start time"
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
                        @click:minute="$refs.menuTimePicker.save(dateOnlyTime)"
                    ></v-time-picker>
                </v-menu>

                <v-menu
                    ref="menuDurationPicker"
                    v-model="menuDurationPicker"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="dateDuration"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="dateDuration"
                            label="Duration"
                            prepend-icon="timelapse"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menuDurationPicker"
                        v-model="dateDuration"
                        format="24hr"
                        full-width
                        @click:hour="closeDurationPicker"
                        @click:minute="
                            $refs.menuDurationPicker.save(dateDuration)
                        "
                        :allowed-hours="allowedDurations"
                    ></v-time-picker>
                </v-menu>

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
            </v-card-text>

            <v-card-text>
                <h3 class="">Clients:</h3>
                <v-chip
                    v-for="(client, i) in clonedEvent.clients"
                    :key="i"
                    label
                    close
                    class="mr-4"
                    @click:close="clonedEvent.clients.splice(i, 1)"
                    >{{ client.forename + ' ' + client.name }}</v-chip
                >
            </v-card-text>

            <v-card-text>
                <v-autocomplete
                    v-model="clientToAdd"
                    :items="clientTransformed"
                    @change="addClient"
                    item-text="Description"
                    placeholder="Start typing to search"
                    return-object
                ></v-autocomplete>
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
import { mapState } from 'vuex'

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
            menuDurationPicker: false,
            menuColorPicker: false,
            mask: '!#XXXXXXXX',
            clonedEvent: rfdc()(this.event),
            clientToAdd: null,
        }
    },

    computed: {
        ...mapState(['clients']),
        clientTransformed() {
            return this.clients.map((client, i) => {
                const Description =
                    client.forename +
                    ' ' +
                    client.name +
                    ' (id: ' +
                    client.id +
                    ')'
                return Object.assign({}, { Description, index: i })
            })
        },

        dateWithoutTime: {
            get: function() {
                return DateUtil.formatDate(
                    this.clonedEvent.startDate,
                    DateUtil.getDefaultTimeZone(),
                    DateUtil.getYearToDayFormat()
                )
            },

            set: function(newValue) {
                // before updating we backup duration since we don't want to change it
                const duration = this.dateDuration

                const date = moment(newValue)
                const startDate = moment(this.clonedEvent.startDate)
                startDate.year(date.year())
                startDate.month(date.month())
                startDate.date(date.date())
                this.clonedEvent.startDate = startDate.toDate()
                this.clonedEvent.start = DateUtil.formatDefault(startDate)

                //restore duration
                this.dateDuration = duration
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
                // before updating the starting time we backup duration since we have to restore it later
                const duration = this.dateDuration
                const date = moment(newValue, 'HH:mm')
                const startDate = moment(new Date(this.clonedEvent.startDate))
                startDate.hours(date.hours())
                startDate.minutes(date.minutes())
                this.clonedEvent.startDate = startDate.toDate()
                this.clonedEvent.start = DateUtil.formatDefault(startDate)

                //restore duration
                this.dateDuration = duration
            },
        },

        dateDuration: {
            get: function() {
                const endDate = moment(new Date(this.clonedEvent.endDate))
                const diff = moment.duration(
                    endDate.diff(moment(new Date(this.clonedEvent.startDate)))
                )

                const result = moment.utc(diff.asMilliseconds()).format('HH:mm')
                return result
            },

            set: function(newValue) {
                const hours = parseInt(newValue.toString().split(':')[0])
                const endDate = moment(new Date(this.clonedEvent.startDate))
                endDate.hours(endDate.hours() + hours)
                this.clonedEvent.endDate = endDate.toDate()
                this.clonedEvent.end = DateUtil.formatDefault(
                    new Date(this.clonedEvent.endDate)
                )
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
            const time = v + ':00'
            this.menuTimePicker = false
            this.$refs.menuTimePicker.save(time)
        },

        closeDurationPicker(value) {
            this.menuDurationPicker = false
            this.$refs.menuDurationPicker.save(value)
        },

        cancel() {
            this.$emit('canceled')
        },

        save() {
            this.$emit('saved', this.clonedEvent)
        },

        createDesc(client) {
            return (
                client.forename + ' ' + client.name + ' (id: ' + client.id + ')'
            )
        },

        addClient() {
            if (this.clientToAdd) {
                const client = this.clients[this.clientToAdd.index]

                const filtered = this.clonedEvent.clients.filter(c => {
                    return c.id === client.id
                })

                if (filtered.length === 0) {
                    this.clonedEvent.clients.push(client)
                }

                this.$nextTick(() => {
                    this.clientToAdd = null
                })
            }
        },

        allowedDurations(v) {
            return [1, 2, 3, 4].includes(v)
        },
    },
}
</script>

<style lang="scss" scoped></style>
