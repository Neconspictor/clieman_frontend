<template>
    <div :style="`max-width: ${maxWidth};`">
        <slot name="default" v-bind:setEditState="setEditState"> </slot>
        <v-dialog v-model="edit" :width="maxWidth" persistent>
            <v-card>
                <slot name="edit"> </slot>
                <v-card-actions>
                    <v-btn text color="error" @click="edit = false">{{
                        $i18n.t('discard')
                    }}</v-btn>
                    <v-btn text color="success" @click="emitSave">{{
                        $i18n.t('save')
                    }}</v-btn>
                </v-card-actions>
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
        }
    },

    methods: {
        setEditState(state) {
            this.edit = state
        },

        emitSave() {
            this.$emit('save', this.setEditState)
        },
    },
}
</script>

<style lang="scss" scoped></style>
