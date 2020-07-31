<template>
    <div :style="`max-width: ${maxWidth};`">
        <slot name="default" v-bind:setEditState="setEditState"> </slot>
        <v-dialog v-model="edit" :width="maxWidth" persistent>
            <v-card>
                <v-form
                    ref="form"
                    v-model="formValidity"
                    @submit.prevent="trySubmit"
                >
                    <slot name="edit"> </slot>
                    <v-card-actions>
                        <v-btn text color="error" @click="discard">{{
                            $i18n.t(discardText)
                        }}</v-btn>
                        <v-btn
                            text
                            color="success"
                            @click="trySubmit"
                            :disabled="!formValidity"
                            >{{ $i18n.t(submitText) }}</v-btn
                        >
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        maxWidth: {
            type: String,
            default: 'inherit',
        },

        discardText: {
            type: String,
            default: 'discard',
        },

        submitText: {
            type: String,
            default: 'save',
        },
    },

    data() {
        return {
            edit: false,
            formValidity: false,
        }
    },

    methods: {
        discard() {
            this.edit = false
            this.$emit('edit', this.edit)
        },
        setEditState(state) {
            this.edit = state
            this.$emit('edit', this.edit)
            if (this.edit && this.$refs.form) {
                this.$refs.form.resetValidation()
            }
        },

        trySubmit() {
            this.validateForm()
            if (this.formValidity) {
                this.$emit('submit', { setEditState: this.setEditState })
            }
        },

        validateForm() {
            this.$refs.form.validate()
        },
    },
}
</script>

<style lang="scss" scoped></style>
