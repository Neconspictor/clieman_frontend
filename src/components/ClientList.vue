<template>
    <div>
        <v-row align="start" justify="center">
            <v-subheader> {{ $i18n.t('clients') }} </v-subheader>
        </v-row>

        <v-row align="start" justify="center">
            <v-data-iterator
                :items="clients"
                item-key="id"
                :items-per-page="4"
                :single-expand="true"
                hide-default-footer
            >
                <template v-slot:default="{ items, isExpanded, expand }">
                    <v-row v-for="client in items" :key="client.id">
                        <v-hover>
                            <template v-slot="{ hover }">
                                <ClientCard
                                    :hover="hover"
                                    :isExpanded="isExpanded(client)"
                                    :client="client"
                                    @expand="v => expand(client, v)"
                                    :width="clientCardWidth"
                                />
                            </template>
                        </v-hover>
                    </v-row>
                </template>
            </v-data-iterator>
        </v-row>
    </div>
</template>

<script>
import ClientCard from '@/components/ClientCard'
export default {
    components: {
        ClientCard,
    },

    props: {
        clients: {
            type: Array,
            required: true,
        },

        clientCardWidth: {
            type: String,
            default: '300px',
        },
    },
}
</script>

<style lang="scss" scoped></style>
