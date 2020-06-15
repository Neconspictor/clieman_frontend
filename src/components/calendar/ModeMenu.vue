/* eslint-disable no-undef */
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
                    <v-list-item-title>{{
                        typeToLabel['day']
                    }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="emitTypeChange('4day')">
                    <v-list-item-title>{{
                        typeToLabel['4day']
                    }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="emitTypeChange('week')">
                    <v-list-item-title>{{
                        typeToLabel['week']
                    }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="emitTypeChange('month')">
                    <v-list-item-title>{{
                        typeToLabel['month']
                    }}</v-list-item-title>
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
    computed: {
        typeToLabel() {
            return {
                day: this.$t('viewModes.day'),
                '4day': this.$t('viewModes.fourDays'),
                week: this.$t('viewModes.week'),
                month: this.$t('viewModes.month'),
            }
        },
    },
    methods: {
        emitTypeChange(type) {
            this.$emit('type-change', type)
        },
    },
}
</script>

<style lang="scss" scoped></style>
