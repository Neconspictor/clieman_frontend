<template>
    <v-overlay
        :value="value"
        :absolute="absolute"
        :z-index="zIndex"
        persistent
        no-click-animation
    >
        <v-progress-circular
            class="mx-auto"
            indeterminate
            color="primary"
        ></v-progress-circular>
    </v-overlay>
</template>

<script>
export default {
    props: {
        absolute: {
            type: Boolean,
            default: false,
        },

        value: {
            type: Boolean,
            default: false,
        },

        zIndex: {
            type: Number,
            default: 300,
        },
    },
}
</script>

<style lang="scss" scoped>
::v-deep .v-dialog {
    width: unset;
    box-shadow: unset;
    z-index: 10000;
}
</style>
