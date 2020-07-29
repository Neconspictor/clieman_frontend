<template>
    <v-simple-table>
        <template v-slot:default>
            <tbody>
                <tr v-for="(row, index) in content" :key="index">
                    <td>{{ $i18n.t(row.desc) }}</td>
                    <td>
                        <v-btn small color="success" :to="row.route">{{
                            $i18n.t(row.linkName)
                        }}</v-btn>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
export default {
    props: {
        /**
         * content element: { desc, linkName, route}
         */
        content: {
            type: Array,
            default: () => [],
        },
    },
}
</script>

<style lang="scss" scoped>
tbody {
    tr:hover {
        background-color: transparent !important;
    }
}
</style>
