<template>
    <!--
    Note: If you use a click event for starting the dialog, use the stop modifier (@click.stop)!


            <v-btn color="primary" dark @click.stop="dialog = true">
            Open Dialog
        </v-btn>
-->

    <v-dialog v-model="open" max-width="300">
        <v-card>
            <v-card-title class="headline">
                <slot name="title"></slot>
            </v-card-title>
            <v-card-text>
                <slot name="desc"></slot>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green darken-1"
                    text
                    @click="emitAcceptEvent(true)"
                >
                    <slot name="yes">{{ this.$i18n.t('yes') }}</slot>
                </v-btn>

                <v-btn
                    color="green darken-1"
                    text
                    @click="emitAcceptEvent(false)"
                >
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
