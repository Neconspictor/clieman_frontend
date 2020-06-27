<template>
    <v-menu
        ref="menuTimePicker"
        v-model="datePicker"
        :close-on-content-click="false"
        :return-value.sync="dateOnlyTime"
        transition="scale-transition"
        offset-y
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                :value="dateOnlyTime"
                :label="label"
                prepend-icon="access_time"
                readonly
                no-details
                v-bind="attrs"
                v-on="on"
                :style="
                    `width: ${width}; min-width: ${minWidth}; max-width: ${maxWidth}; margin-bottom: 0px;`
                "
            ></v-text-field>
        </template>
        <v-time-picker
            v-if="datePicker"
            :value="dateOnlyTime"
            format="24hr"
            full-width
            @click:hour="closeTimePicker"
            @click:minute="$refs.menuTimePicker.save(dateOnlyTime)"
        ></v-time-picker>
    </v-menu>
</template>

<script>
import DateUtil from '@/util/date.js'
import moment from 'moment-timezone'

export default {
    props: {
        maxWidth: {
            type: [String, Number],
            default: 'inherit',
        },
        minWidth: {
            type: [String, Number],
            default: 'inherit',
        },
        width: {
            type: [String, Number],
            default: 'inherit',
        },

        value: {
            type: Date,
            required: true,
        },

        label: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            datePicker: false,
        }
    },

    computed: {
        dateOnlyTime: {
            get: function() {
                return DateUtil.formatDate(
                    this.value,
                    DateUtil.getDefaultTimeZone(),
                    DateUtil.getHourToMinutesFormat()
                )
            },

            set: function(newValue) {
                const time = moment(newValue, 'HH:mm')
                const date = moment(new Date(this.value))
                date.hours(time.hours())
                date.minutes(time.minutes())
                this.$emit('input', date.toDate())
            },
        },
    },

    methods: {
        closeTimePicker: function(v) {
            v = v < 10 ? '0' + v : v
            const time = v + ':00'
            this.menuTimePicker = false
            this.$refs.menuTimePicker.save(time)
        },
    },
}
</script>

<style lang="scss" scoped></style>
