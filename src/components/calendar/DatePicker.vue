<template>
    <div>
        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date"
                    label="Select date"
                    prepend-icon="event"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
        </v-menu>

        <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            :return-value.sync="time"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="time"
                    label="Select hour"
                    prepend-icon="access_time"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-time-picker
                v-if="menu2"
                v-model="time"
                format="24hr"
                full-width
                @click:hour="closePicker"
                @click:minute="$refs.menu2.save(time)"
            ></v-time-picker>
        </v-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menu: false,
            date: '',
            menu2: false,
            date2: '',
            time: '',
        }
    },

    methods: {
        closePicker: function(v) {
            v = v < 10 ? '0' + v : v
            this.time = v + ':00'
            this.menu = false
            this.$refs.menu2.save(this.time)
        },
    },
}
</script>

<style lang="scss" scoped></style>
