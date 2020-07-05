<template>
    <v-overlay :value="value" :absolute="absolute" :z-index="zIndex">
        <v-progress-circular
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

<style lang="scss" scoped></style>
