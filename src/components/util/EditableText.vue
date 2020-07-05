<template>
    <EditableField
        :maxWidth="maxWidth"
        @save="saveEdited"
        @edit="state => $emit('edit', state)"
    >
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

                <div
                    v-for="(error, $errorIndex) in errors"
                    :key="$errorIndex"
                    class="error"
                >
                    {{ error }}
                </div>
            </v-card-text>
        </template>
        <template v-slot:default="{ setEditState }">
            <v-row class="ml-4" style="flex-wrap: unset;">
                <slot name="non-edit-text-field">
                    <span :style="`width: ${textFieldWidth}`">
                        <v-text-field
                            :label="label"
                            v-model="value"
                            :prepend-icon="prependIcon"
                            readonly
                        >
                        </v-text-field>
                    </span>
                </slot>
                <v-spacer></v-spacer>
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

        textFieldWidth: {
            type: String,
            default: '400px',
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
            errors: [],
        }
    },

    methods: {
        startEdit(setEditState) {
            this.context.editableText = rfdc()(this.value)
            this.errors = []
            setEditState(true)
        },

        setErrors(errors) {
            this.errors = errors
        },

        saveEdited(setEditState) {
            this.$emit('save', {
                setEditState: setEditState,
                setErrors: this.setErrors,
                value: rfdc()(this.context.editableText),
            })
        },
    },
}
</script>

<style lang="scss" scoped></style>
