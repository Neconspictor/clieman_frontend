<template>
    <!--<div style="min-width: 440px;">
        <v-container fluid style="min-width: 440px;">
        <v-row>
            <v-col cols="12">
                <ClientList :clients="clients" clientCardWidth="400px" />
            </v-col>
        </v-row>
    </v-container>

        <ClientList :clients="clients" clientCardWidth="400px" />
    </div>-->

    <v-container fluid class="listContainer">
        <v-row>
            <v-col cols="12">
                <ClientList :clients="clients" clientCardWidth="400px" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
import ClientList from '@/components/ClientList'
export default {
    components: {
        ClientList,
    },

    computed: {
        ...mapState(['clients']),
    },
}
</script>

<style lang="scss" scoped>
.listContainer {
    min-width: 440px;
}
</style>
