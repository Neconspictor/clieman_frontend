<template>
    <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
    >
        <v-card tile>
            <div>
                <v-toolbar flat dark color="primary">
                    <v-toolbar-title>Toolbar</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="dialog = false">
                            Close
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
            </div>

            <v-card-text>
                <div class="mt-4 mb-4">
                    <span class="mr-4">
                        <v-label>View mode:</v-label>
                    </span>
                    <ModeMenu :type="type" @type-change="emitTypeChange" />
                </div>

                <v-btn @click.stop="emitSetTodayEvent">Jump to today</v-btn>
            </v-card-text>

            <div style="flex: 1 1 auto;"></div>
        </v-card>
    </v-dialog>
</template>

<script>
import ModeMenu from '@/components/calendar/ModeMenu'

export default {
    components: {
        ModeMenu,
    },
    props: {
        // value property so that user can conveniently use v-model
        value: {
            type: Boolean,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            items: ['option', 'option 2', 'option 3'],
        }
    },

    computed: {
        dialog: {
            get: function() {
                return this.value
            },

            set: function(newValue) {
                // input event so that user can conveniently use v-model
                this.$emit('input', newValue)
            },
        },
    },

    methods: {
        emitTypeChange(type) {
            this.$emit('type-change', type)
        },

        emitSetTodayEvent() {
            this.$emit('set-today')
            this.dialog = false
        },
    },
}
</script>

<style lang="scss" scoped></style>
