<template>
    <EditableField :maxWidth="maxWidth" @save="saveEdited">
        <template v-slot:edit>
            <v-card-text>
                <v-text-field
                    :label="label"
                    v-model="editableText"
                    :prepend-icon="prependIcon"
                >
                </v-text-field>
            </v-card-text>
        </template>
        <template v-slot:default="{ setEditState }">
            <v-row class="ml-4">
                <v-text-field
                    :label="label"
                    v-model="value"
                    :prepend-icon="prependIcon"
                    readonly
                >
                </v-text-field>
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

        tooltipText: {
            type: String,
            default: '',
        },

        value: {
            type: String,
            default: 'Hello',
        },
    },

    data() {
        return {
            editableText: '',
        }
    },

    methods: {
        startEdit(setEditState) {
            this.editableText = rfdc()(this.value)
            setEditState(true)
        },

        saveEdited(setEditState) {
            this.$emit('save', {
                setEditState: setEditState,
                value: rfdc()(this.editableText),
            })
        },
    },
}
</script>

<style lang="scss" scoped></style>
