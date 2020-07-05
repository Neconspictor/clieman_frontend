<template>
    <EditableText
        :maxWidth="maxWidth"
        @save="emitSave"
        :tooltipText="tooltipText"
        @edit="handleEditChange"
    >
        <template v-slot:edit-text-field="">
            <PasswordField
                :label="$i18n.t('settingsData.oldPassword')"
                v-model="oldPassword"
                :required="required"
                :showPassword="computedShowPassword"
                @visible="val => (computedShowPassword = val)"
            />
            <PasswordField
                :label="$i18n.t('settingsData.newPassword')"
                v-model="newPassword"
                :rules="passwordRules"
                :required="required"
                :showPassword="computedShowPassword"
                @visible="val => (computedShowPassword = val)"
            />
            <PasswordField
                :label="$i18n.t('settingsData.confirmNewPassword')"
                v-model="confirmationPassword"
                :rules="confirmationPasswordRules(newPassword)"
                :required="required"
                :showPassword="computedShowPassword"
                @visible="val => (computedShowPassword = val)"
            />
        </template>
        <template v-slot:non-edit-text-field>
            <div>
                <div>Password</div>
                <div style="color: grey;">
                    You should use a secure password that you don't use anywhere
                    else
                </div>
            </div>
        </template>
    </EditableText>
</template>

<script>
import EditableText from '@/components/util/EditableText'
import PasswordField from '@/components/util/PasswordField'
import Rules from '@/mixins/rules'

export default {
    components: {
        EditableText,
        PasswordField,
    },

    mixins: [Rules],

    props: {
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
    },

    data() {
        return {
            oldPassword: '',
            newPassword: '',
            confirmationPassword: '',
            privateShowPassword: false,
        }
    },

    computed: {
        computedShowPassword: {
            get: function() {
                if (this.showPassword !== undefined) return this.showPassword
                return this.privateShowPassword
            },
            set: function(val) {
                this.privateShowPassword = val
                this.$emit('visible', val)
            },
        },
    },

    methods: {
        emitSave({ setEditState, setErrors }) {
            this.$emit('save', {
                setEditState: setEditState,
                setErrors: setErrors,
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
                confirmationPassword: this.confirmationPassword,
            })
        },

        handleEditChange(edit) {
            if (!edit) {
                this.oldPassword = ''
                this.newPassword = ''
                this.confirmationPassword = ''
            }
            this.$emit('edit', edit)
        },
    },
}
</script>

<style lang="scss" scoped></style>
