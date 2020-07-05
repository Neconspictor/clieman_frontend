<template>
    <div class="error">
        <div v-for="(error, $errorIndex) in errors" :key="$errorIndex">
            <p class="pl-2">
                {{ $i18n.t(`errors['${error}']`) }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        errors: {
            type: Array,
            default: () => [],
        },
    },
}
</script>

<style lang="scss" scoped></style>
