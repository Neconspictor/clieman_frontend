<template>
    <div>
        <v-menu bottom right>
            <template v-slot:activator="{ on }">
                <v-btn outlined color="grey darken-2" v-on="on">
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>mdi-menu-down</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item @click="emitTypeChange('day')">
                    <v-list-item-title>Day</v-list-item-title>
                </v-list-item>
                <v-list-item @click="emitTypeChange('4day')">
                    <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
                <v-list-item @click="emitTypeChange('week')">
                    <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="emitTypeChange('month')">
                    <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            typeToLabel: {
                day: 'Day',
                '4day': '4 Days',
                week: 'Week',
                month: 'Month',
            },
        }
    },
    methods: {
        emitTypeChange(type) {
            this.$emit('type-change', type)
        },
    },
}
</script>

<style lang="scss" scoped></style>
