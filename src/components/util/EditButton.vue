<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" :class="btnClass">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <span>{{ this.tooltipText }} </span>
    </v-tooltip>
</template>

<script>
export default {
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
}
</script>

<style lang="scss" scoped></style>
