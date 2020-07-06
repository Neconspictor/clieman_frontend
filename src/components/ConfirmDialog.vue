<template>
    <!--
    Note: If you use a click event for starting the dialog, use the stop modifier (@click.stop)!


            <v-btn color="primary" dark @click.stop="dialog = true">
            Open Dialog
        </v-btn>
-->

    <v-dialog v-model="open" :max-width="maxWidth" width="unset" persistent>
        <v-card class="word-breaker">
            <v-card-title class="headline word-breaker">
                <slot name="title"></slot>
            </v-card-title>
            <v-card-text class="word-breaker">
                <slot name="desc "></slot>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" text @click="emitAcceptEvent(true)">
                    <slot name="yes">{{ this.$i18n.t('yes') }}</slot>
                </v-btn>

                <v-btn color="error" text @click="emitAcceptEvent(false)">
                    <slot name="no">{{ this.$i18n.t('no') }}</slot>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            required: true,
        },

        maxWidth: {
            type: [Number, String],
            default: 700,
        },
    },

    computed: {
        open: {
            get: function() {
                return this.value
            },
            set: function(newValue) {
                this.$emit('input', newValue)
            },
        },
    },

    methods: {
        emitAcceptEvent(clickedOnAccept) {
            this.open = false
            this.$emit('accepted', clickedOnAccept)
        },
    },
}
</script>

<style scoped>
.word-breaker {
    word-break: keep-all !important;
}
</style>
