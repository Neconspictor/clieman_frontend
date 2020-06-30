<template>
    <v-text-field
        :label="computedLabel"
        :type="computedShowPassword ? 'text' : 'password'"
        prepend-icon="mdi-lock"
        :value="value"
        @input.self="emitNewValue"
        :readonly="readonly"
        :required="required"
        :rules="rules"
    >
        <v-tooltip slot="append" bottom>
            <template v-slot:activator="{ on }"
                ><v-btn
                    icon
                    color="primary"
                    v-on="on"
                    @click="computedShowPassword = !computedShowPassword"
                >
                    <v-icon>{{
                        computedShowPassword ? 'mdi-eye' : 'mdi-eye-off'
                    }}</v-icon>
                </v-btn>
            </template>

            <span>{{
                computedShowPassword
                    ? $i18n.t('hidePassword')
                    : $i18n.t('showPassword')
            }}</span>
        </v-tooltip>
    </v-text-field>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: '',
        },

        readonly: {
            type: Boolean,
            default: false,
        },

        required: {
            type: Boolean,
            default: false,
        },

        rules: {
            type: Array,
            default: () => [],
        },

        showPassword: {
            type: Boolean,
            default: undefined,
        },

        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            privateShowPassword: this.initialVisible,
        }
    },

    computed: {
        computedLabel() {
            if (this.label !== '') return this.label
            return this.$i18n.t('password')
        },

        computedShowPassword: {
            get() {
                if (this.showPassword !== undefined) return this.showPassword
                return this.privateShowPassword
            },
            set(newValue) {
                this.privateShowPassword = newValue
                this.$emit('visible', newValue)
            },
        },
    },

    methods: {
        emitNewValue(val) {
            console.log('emit')
            this.$emit('input', val)
        },
    },
}
</script>

<style lang="scss" scoped></style>
