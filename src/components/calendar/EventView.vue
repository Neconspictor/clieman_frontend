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
                <v-btn icon @click.stop="deleteEventDialogIsOpen = true">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <!--<span v-html="selectedEvent.details"></span>-->
                <form v-if="!currentlyEditing">
                    {{ selectedEvent.details }}
                </form>
                <form v-else>
                    <textarea-autosize
                        v-model="selectedEvent.details"
                        type="text"
                        style="width: 100%"
                        :min-height="100"
                        placeholder="add note"
                    ></textarea-autosize>
                </form>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="secondary" @click="onOpenChanged(false)">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
        <ConfirmDialog
            v-model="deleteEventDialogIsOpen"
            @accepted="evaluateEventDeletion"
        >
            <template v-slot:title>
                Do you really want to delete this event?
            </template>
        </ConfirmDialog>
    </v-menu>
</template>

<script>
import ConfirmDialog from '@/components/ConfirmDialog'

export default {
    components: {
        ConfirmDialog,
    },
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
            deleteEventDialogIsOpen: false,
            currentlyEditing: false,
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

        evaluateEventDeletion(deleteSelectedEvent) {
            console.log('selected event will be deleted: ', deleteSelectedEvent)
        },
    },
}
</script>

<style lang="scss" scoped></style>
