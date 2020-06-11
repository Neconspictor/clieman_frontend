<template>
    <v-menu
        v-model="isOpen"
        :close-on-content-click="false"
        :activator="DOMElement"
        :open-on-click="false"
        offset-x
    >
        <!-- non editing view -->
        <v-card
            v-if="!currentlyEditing"
            color="grey lighten-4"
            flat
            style="width:400px;"
        >
            <v-toolbar
                :color="event.color"
                dark
                flat
                style="overflow-x:auto; white-space: nowrap;"
            >
                <v-btn icon @click.stop="deleteEventDialogIsOpen = true">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>

                <div v-html="event.name"></div>

                <v-spacer></v-spacer>
                <v-btn icon @click="startEditingView">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <!--<span v-html="event.details"></span>-->
                <form style="width:100%;">
                    {{ event.details }}
                </form>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="secondary" @click="isOpen = false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>

        <!-- editing view -->
        <v-card v-else color="grey lighten-4" flat style="width:400px;">
            <v-toolbar
                :color="clonedEvent.color"
                dark
                flat
                style="overflow-x:auto; white-space: nowrap;"
            >
                <v-btn icon disabled>
                    <v-icon>mdi-delete</v-icon>
                </v-btn>

                <!-- <div v-html="event.name"></div>-->
                <input type="text" v-model="clonedEvent.name" />

                <v-spacer></v-spacer>
                <v-btn icon disabled>
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <form>
                    <textarea-autosize
                        v-model="clonedEvent.details"
                        type="text"
                        style="width:100%;"
                        :min-height="0"
                        placeholder="add note"
                    ></textarea-autosize>
                </form>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="error" @click="cancel">
                    Cancel
                </v-btn>
                <v-btn text color="success" @click="save">
                    Save
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
import rfdc from 'rfdc'

const clone = rfdc()

export default {
    components: {
        ConfirmDialog,
    },
    props: {
        DOMElement: {
            type: Object,
            required: true,
        },
        event: {
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
            clonedEvent: null,
        }
    },

    computed: {
        isOpen: {
            get: function() {
                return this.value
            },

            set: function(newValue) {
                this.$emit('input', newValue)
                if (!newValue && this.currentlyEditing) {
                    this.cancel()
                }
            },
        },
    },

    methods: {
        evaluateEventDeletion(deleteSelectedEvent) {
            console.log('selected event will be deleted: ', deleteSelectedEvent)
        },

        startEditingView() {
            console.log('start editing...')
            // eslint-disable-next-line no-unused-vars
            this.clonedEvent = clone(this.event) //TODO: clients don't need to be deep cloned
            this.currentlyEditing = true
        },

        cancel() {
            this.currentlyEditing = false
        },
        save() {
            this.currentlyEditing = false
            this.$emit('event-update', this.clonedEvent)
        },
    },
}
</script>

<style lang="scss" scoped></style>
