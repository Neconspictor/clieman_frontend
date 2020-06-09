<template>
    <!--
    Note: If you use a click event for starting the dialog, use the stop modifier (@click.stop)!


            <v-btn color="primary" dark @click.stop="dialog = true">
            Open Dialog
        </v-btn>
-->

    <v-dialog v-model="openData" max-width="290">
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
                    <slot name="yes">Yes</slot>
                </v-btn>

                <v-btn
                    color="green darken-1"
                    text
                    @click="emitAcceptEvent(false)"
                >
                    <slot name="no">No</slot>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        open: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            openData: this.open,
        }
    },

    watch: {
        open: function(val) {
            this.openData = val
        },
        openData: function(val) {
            if (this.open != val && val === false) this.emitCloseEvent()
        },
    },

    methods: {
        emitAcceptEvent(clickedOnAccept) {
            this.openData = false
            this.$emit('accepted', clickedOnAccept)
        },

        emitCloseEvent() {
            this.$emit('close')
        },
    },
}
</script>
