<template>
    <EditableText
        :maxWidth="maxWidth"
        :value="value"
        @save="emitSave"
        :tooltipText="tooltipText"
    >
        <template v-slot:edit-text-field="{ context }">
            <PasswordField
                :label="label"
                v-model="context.editableText"
                :rules="rules"
                :required="required"
                :showPassword="showPassword"
            />
        </template>
        <template v-slot:non-edit-text-field>
            <PasswordField
                v-model="value"
                :label="label"
                :showPassword="showPassword"
                readonly
            />
        </template>
    </EditableText>
</template>

<script>
import EditableText from '@/components/util/EditableText'
import PasswordField from '@/components/util/PasswordField'

export default {
    components: {
        EditableText,
        PasswordField,
    },

    props: {
        label: {
            type: String,
            default: undefined,
        },
        maxWidth: {
            type: String,
            default: 'inherit',
        },

        required: {
            type: Boolean,
            default: false,
        },

        showPassword: {
            type: Boolean,
            default: undefined,
        },

        tooltipText: {
            type: String,
            default: '',
        },

        rules: {
            type: Array,
            default: () => [],
        },

        value: {
            type: String,
            default: '',
        },
    },

    methods: {
        emitSave(e) {
            this.$emit('save', e)
        },
    },
}
</script>

<style lang="scss" scoped></style>
