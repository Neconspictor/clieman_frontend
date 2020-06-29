<template>
    <div class="ml-4 mr-0">
        <div>
            <h1 class="font-weight-thin">
                {{ title }}
            </h1>
        </div>

        <slot name="default"></slot>

        <v-divider></v-divider>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '',
        },
    },
}
</script>

<style lang="scss" scoped></style>
