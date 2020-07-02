<template>
    <EditableField :maxWidth="maxWidth" @save="saveEdited">
        <template v-slot:edit>
            <v-card-text>
                <slot name="edit-text-field" v-bind:context="context">
                    <v-text-field
                        :label="label"
                        v-model="context.editableText"
                        :prepend-icon="prependIcon"
                        :rules="rules"
                        :required="required"
                        :type="type"
                    >
                    </v-text-field>
                </slot>
            </v-card-text>
        </template>
        <template v-slot:default="{ setEditState }">
            <v-row class="ml-4">
                <slot name="non-edit-text-field">
                    <v-text-field
                        :label="label"
                        v-model="value"
                        :prepend-icon="prependIcon"
                        readonly
                    >
                    </v-text-field>
                </slot>
                <EditButton
                    btnClass="mt-4"
                    :tooltipText="tooltipText"
                    @click="startEdit(setEditState)"
                />
            </v-row>
        </template>
    </EditableField>
</template>

<script>
import EditableField from '@/components/util/EditableField'
import EditButton from '@/components/util/EditButton'
import rfdc from 'rfdc'

export default {
    components: {
        EditableField,
        EditButton,
    },

    props: {
        label: {
            type: String,
            default: '',
        },

        maxWidth: {
            type: String,
            default: 'inherit',
        },

        prependIcon: {
            type: String,
            default: '',
        },

        required: {
            type: Boolean,
            default: false,
        },

        rules: {
            type: Array,
            default: () => [],
        },

        tooltipText: {
            type: String,
            default: '',
        },

        type: {
            type: String,
            default: 'text',
        },

        value: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            context: {
                editableText: '',
            },
        }
    },

    methods: {
        startEdit(setEditState) {
            this.context.editableText = rfdc()(this.value)
            setEditState(true)
        },

        saveEdited(setEditState) {
            this.$emit('save', {
                setEditState: setEditState,
                value: rfdc()(this.context.editableText),
            })
        },
    },
}
</script>

<style lang="scss" scoped></style>
