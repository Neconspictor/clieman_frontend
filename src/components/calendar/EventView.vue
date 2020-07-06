<template>
    <Activator
        x-offset
        v-model="isOpen"
        :doEditing="currentlyEditing"
        :activator="DOMElement"
        :width="width"
        :dialogPersistent="dialogPersistent"
    >
        <!-- non editing view -->
        <v-card
            flat
            :style="
                `max-width: ${width}; width: 100%; min-width: ${width}; overflow: auto;`
            "
            elevation="4"
        >
            <wrapper v-if="!currentlyEditing && event">
                <v-card-title
                    class="tool-header"
                    :style="`background-color: ${event.color};`"
                >
                    {{ event.name }}
                </v-card-title>

                <v-card-text>
                    {{ event.details }}
                </v-card-text>

                <v-card-text>
                    <v-text-field
                        v-model="startTime"
                        :label="$i18n.t('startTime')"
                        prepend-icon="access_time"
                        readonly
                    ></v-text-field>

                    <v-text-field
                        v-model="duration"
                        :label="$i18n.t('duration')"
                        prepend-icon="timelapse"
                        readonly
                    ></v-text-field>
                </v-card-text>

                <v-card-text>
                    <h3 class="">{{ $i18n.t('clients') }}:</h3>
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

                <ErrorView :errors="errors" />

                <v-card-actions>
                    <v-btn text @click="isOpen = false">
                        {{ $i18n.t('close') }}
                    </v-btn>

                    <v-btn text @click="startEditingView">
                        {{ $i18n.t('edit') }}
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>

                    <v-btn text @click.stop="deleteEventDialogIsOpen = true">
                        {{ $i18n.t('delete') }}
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </wrapper>

            <slot v-else name="editor">
                <EventEditor
                    :event="event"
                    :width="width"
                    @cancel="cancel"
                    @accept="save"
                    :errors="errors"
                >
                    <template v-slot:accept>
                        {{ $i18n.t('save') }}
                        <v-icon>mdi-content-save</v-icon>
                    </template>
                </EventEditor>
            </slot>
        </v-card>

        <ConfirmDialog
            v-model="deleteEventDialogIsOpen"
            @accepted="evaluateEventDeletion"
        >
            <template v-slot:title>
                {{ $i18n.t('messages.assertEventDeletion') }}
            </template>
        </ConfirmDialog>
    </Activator>
</template>

<script>
import ConfirmDialog from '@/components/ConfirmDialog'
import EventEditor from '@/components/calendar/EventEditor'
import moment from 'moment-timezone'
import Activator from '@/components//Activator'
import ErrorView from '@/components/util/ErrorView'

export default {
    components: {
        ConfirmDialog,
        EventEditor,
        Activator,
        ErrorView,
    },

    props: {
        DOMElement: {
            type: Object,
            required: true,
        },

        errors: {
            type: Array,
            default: () => [],
        },

        event: {
            type: Object,
            required: true,
        },

        value: {
            type: Boolean,
            required: true,
        },

        width: {
            type: [Number, String],
            default: '400px',
        },

        editing: {
            type: Boolean,
            default: false,
        },

        dialogPersistent: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            flip: false,
            deleteEventDialogIsOpen: false,
            currentlyEditing: this.editing,
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
            return moment(this.event.start).format('HH:mm')
        },

        duration() {
            const diff = moment(this.event.end).diff(moment(this.event.start))

            const duration = moment.duration(diff)

            return moment.utc(duration.asMilliseconds()).format('HH:mm')
        },
    },

    methods: {
        evaluateEventDeletion(deleteSelectedEvent) {
            if (deleteSelectedEvent) this.$emit('delete-event', this.event)
        },

        startEditingView() {
            this.currentlyEditing = true
            this.$emit('start-edit')
        },

        cancel() {
            this.currentlyEditing = this.editing
            this.$emit('cancel')
        },

        save(changedEvent) {
            //this.currentlyEditing = this.editing
            this.$emit('event-update', changedEvent)
        },

        resetEditing() {
            this.currentlyEditing = this.editing
        },
    },
}
</script>

<style lang="scss" scoped></style>
