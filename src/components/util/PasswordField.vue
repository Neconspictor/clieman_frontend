<template>
    <v-text-field
        :label="computedLabel"
        :type="showPassword ? 'text' : 'password'"
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
                    @click="showPassword = !showPassword"
                >
                    <v-icon>{{
                        showPassword ? 'mdi-eye' : 'mdi-eye-off'
                    }}</v-icon>
                </v-btn>
            </template>

            <span>{{
                showPassword ? $i18n.t('hidePassword') : $i18n.t('showPassword')
            }}</span>
        </v-tooltip>
    </v-text-field>
</template>

<script>
export default {
    props: {
        initialVisible: {
            type: Boolean,
            default: false,
        },

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

        value: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            showPassword: this.initialVisible,
        }
    },

    computed: {
        computedLabel() {
            if (this.label !== '') return this.label
            return this.$i18n.t('password')
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
