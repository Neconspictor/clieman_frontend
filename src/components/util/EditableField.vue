<template>
    <div :style="`max-width: ${maxWidth};`">
        <slot name="default" v-bind:setEditState="setEditState"> </slot>
        <v-dialog v-model="edit" :width="maxWidth" persistent>
            <v-card>
                <v-form ref="form" v-model="formValidity">
                    <slot name="edit"> </slot>
                    <v-card-actions>
                        <v-btn text color="error" @click="edit = false">{{
                            $i18n.t('discard')
                        }}</v-btn>
                        <v-btn
                            text
                            color="success"
                            @click="trySave"
                            :disabled="!formValidity"
                            >{{ $i18n.t('save') }}</v-btn
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
    },

    data() {
        return {
            edit: false,
            formValidity: false,
        }
    },

    methods: {
        setEditState(state) {
            this.edit = state
        },

        trySave() {
            this.validateForm()
            if (this.formValidity) {
                this.$emit('save', this.setEditState)
            }
        },

        validateForm() {
            this.$refs.form.validate()
        },
    },
}
</script>

<style lang="scss" scoped></style>
