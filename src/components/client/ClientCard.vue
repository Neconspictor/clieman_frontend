<template>
    <v-card
        hover="true"
        :elevation="hover ? 8 : 2"
        class="mb-4"
        dense
        :width="width"
    >
        <v-card-title>
            {{ `${client.forename} ${client.name}` }}
        </v-card-title>

        <v-card-subtitle>{{ client.id }}</v-card-subtitle>
        <v-switch
            class="pl-4 mt-0"
            :input-value="isExpanded"
            :label="isExpanded ? $i18n.t('expanded') : $i18n.t('closed')"
            @change="v => emitExpandEvent(v)"
        ></v-switch>

        <div v-if="isExpanded">
            <div justify-right>
                <v-spacer></v-spacer>
                <v-btn icon @click="doEditing = !doEditing">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </div>
            <v-divider></v-divider>
            <ClientCardForm
                :client="client"
                :value="doEditing"
                @end-edit="doEditing = false"
            />
        </div>
    </v-card>
</template>

<script>
import ClientCardForm from '@/components/client/ClientCardForm'
export default {
    components: {
        ClientCardForm,
    },

    props: {
        isExpanded: {
            type: Boolean,
            required: true,
        },

        client: {
            type: Object,
            required: true,
        },

        hover: {
            type: Boolean,
            required: true,
        },

        width: {
            type: String,
            default: '100%',
        },
    },

    data() {
        return {
            doEditing: false,
        }
    },

    methods: {
        emitExpandEvent(val) {
            this.$emit('expand', val)
        },
    },
}
</script>

<style lang="scss" scoped></style>
