<template>
    <ButtonTooltip
        icon="mdi-delete"
        :btnClass="btnClass"
        :tooltipText="tooltipText"
        @click="emitClick"
    >
    </ButtonTooltip>
</template>

<script>
import ButtonTooltip from '@/components/util/ButtonTooltip'

export default {
    components: {
        ButtonTooltip,
    },

    props: {
        btnClass: {
            type: String,
            default: '',
        },

        tooltipText: {
            type: String,
            default: '',
        },
    },

    methods: {
        emitClick(e) {
            this.$emit('click', e)
        },
    },
}
</script>

<style lang="scss" scoped></style>
