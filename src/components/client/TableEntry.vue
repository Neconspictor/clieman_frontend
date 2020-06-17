<template>
    <tr>
        <td><slot name="key"></slot>:</td>
        <td v-if="editable">
            <slot name="edit"> </slot>
        </td>
        <td v-else><slot></slot></td>
    </tr>
</template>

<script>
export default {
    props: {
        editable: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style lang="scss" scoped></style>
