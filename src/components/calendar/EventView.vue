<template>
    <v-menu
        v-model="selectedOpenData"
        :close-on-content-click="false"
        :activator="selectedElement"
        :open-on-click="false"
        offset-x
    >
        <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="secondary" @click="onOpenChanged(false)">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    props: {
        selectedElement: {
            type: Object,
            required: true,
        },
        selectedEvent: {
            type: Object,
            required: true,
        },
        selectedOpen: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            selectedOpenData: this.selectedOpen,
            flip: false,
        }
    },

    watch: {
        selectedOpen: function(val) {
            this.selectedOpenData = val
        },

        selectedOpenData: function(val) {
            if (this.selectedOpen != val) {
                this.onOpenChanged(val)
            }
        },
    },

    methods: {
        // eslint-disable-next-line no-unused-vars
        onOpenChanged(state) {
            console.log('state change: ', state)
            this.$emit('selected-open-changed', state)
        },
    },
}
</script>

<style lang="scss" scoped></style>
