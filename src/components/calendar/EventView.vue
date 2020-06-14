<template>
    <v-menu
        v-model="isOpen"
        :close-on-content-click="false"
        :close-on-click="!currentlyEditing"
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

            <v-card-text>
                <v-text-field
                    v-model="startTime"
                    label="Start time"
                    prepend-icon="access_time"
                    readonly
                ></v-text-field>

                <v-text-field
                    v-model="duration"
                    label="Duration"
                    prepend-icon="timelapse"
                    readonly
                ></v-text-field>
            </v-card-text>

            <v-card-text>
                <h3 class="">Clients:</h3>
                <v-chip
                    v-for="(client, i) in event.clients"
                    :key="i"
                    label
                    class="mr-4"
                    >{{
                        client.forename +
                            ' ' +
                            client.name +
                            ' (id: ' +
                            client.id +
                            ')'
                    }}</v-chip
                >
            </v-card-text>
            <v-card-actions>
                <v-btn text color="secondary" @click="isOpen = false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
        <EventEditor v-else :event="event" @canceled="cancel" @saved="save" />

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
import EventEditor from '@/components/calendar/EventEditor'
//import DateUtil from '@/util/date.js'
import moment from 'moment-timezone'

export default {
    components: {
        ConfirmDialog,
        EventEditor,
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

        startTime() {
            return moment(this.event.startDate).format('HH:mm')
        },

        duration() {
            const diff = moment(this.event.endDate).diff(
                moment(this.event.startDate)
            )

            const duration = moment.duration(diff)

            return moment.utc(duration.asMilliseconds()).format('HH:mm')
        },
    },

    methods: {
        evaluateEventDeletion(deleteSelectedEvent) {
            console.log('selected event will be deleted: ', deleteSelectedEvent)
        },

        startEditingView() {
            this.currentlyEditing = true
        },

        cancel() {
            this.currentlyEditing = false
        },

        save(changedEvent) {
            this.currentlyEditing = false
            this.$emit('event-update', changedEvent)
        },
    },
}
</script>

<style lang="scss" scoped></style>
