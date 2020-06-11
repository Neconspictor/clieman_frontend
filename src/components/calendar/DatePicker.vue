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

        <div>
            <v-text-field
                v-model="color"
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
                                <v-color-picker v-model="color" flat />
                            </v-card-text>
                        </v-card>
                    </v-menu>
                </template>
            </v-text-field>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menu: false,
            date: '',
            menu2: false,
            menuColorPicker: false,
            mask: '!#XXXXXXXX',
            date2: '',
            time: '',
            color: '#ff00ff',
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

    computed: {
        swatchStyle() {
            const { color, menu } = this
            return {
                backgroundColor: color,
                cursor: 'pointer',
                height: '30px',
                width: '30px',
                borderRadius: menu ? '50%' : '4px',
                transition: 'border-radius 200ms ease-in-out',
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
