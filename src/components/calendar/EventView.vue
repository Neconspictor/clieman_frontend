<template>
    <v-menu
        v-model="isOpen"
        :close-on-content-click="false"
        :activator="selectedDOMElement"
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
                <v-btn text color="secondary" @click="isOpen = false">
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
        selectedDOMElement: {
            type: Object,
            required: true,
        },
        selectedEvent: {
            type: Object,
            required: true,
        },
        value: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            flip: false,
            deleteEventDialogIsOpen: false,
            currentlyEditing: false,
        }
    },

    computed: {
        isOpen: {
            get: function() {
                return this.value
            },

            set: function(newValue) {
                this.$emit('input', newValue)
            },
        },
    },

    methods: {
        evaluateEventDeletion(deleteSelectedEvent) {
            console.log('selected event will be deleted: ', deleteSelectedEvent)
        },
    },
}
</script>

<style lang="scss" scoped></style>
