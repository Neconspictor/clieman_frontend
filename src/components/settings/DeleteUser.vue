<template>
    <DeletableAction
        :maxWidth="maxWidth"
        @submit="submit"
        :tooltipText="tooltipText"
        @edit="handleEditChange"
    >
        <template v-slot:edit-text-field="">
            <PasswordField
                :label="$i18n.t('settingsData.password')"
                v-model="password"
                :required="required"
                :showPassword="computedShowPassword"
                :rules="permissivePasswordRules"
                @visible="val => (computedShowPassword = val)"
            />

            <slot name="after-edit-text-field"></slot>
        </template>
        <template v-slot:non-edit-text-field>
            <div>
                <div>{{ $i18n.t('settingsData.deleteAccount') }}</div>
                <div style="color: grey;">
                    {{ $i18n.t('settingsData.deleteAccountDescription') }}
                </div>
            </div>
        </template>
    </DeletableAction>
</template>

<script>
import DeletableAction from '@/components/util/DeletableAction'
import PasswordField from '@/components/util/PasswordField'
import Rules from '@/mixins/rules'

export default {
    components: {
        DeletableAction,
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
            password: '',
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
        submit({ setEditState, setErrors }) {
            this.$emit('submit', {
                setEditState,
                setErrors,
                data: {
                    password: this.password,
                },
            })
        },

        handleEditChange(edit) {
            if (!edit) {
                this.password = ''
            }
            this.$emit('edit', edit)
        },
    },
}
</script>

<style lang="scss" scoped></style>
