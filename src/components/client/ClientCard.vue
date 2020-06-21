<template>
    <v-card
        hover="true"
        :elevation="hover ? 4 : 2"
        :class="'card ' + (isExpanded ? ' on-top ' : '')"
        dense
        :width="width"
        :min-width="isExpanded ? width : 100"
        @click="emitExpandEvent(true)"
        v-click-outside="outsideClick"
    >
        <v-card-title class="text-body-2">
            <v-flex class="d-flex">
                <div>
                    {{
                        `${formatter.string(client.title)} ${formatter.string(
                            client.forename
                        )} ${formatter.string(client.name)}`
                    }}
                </div>
            </v-flex>
        </v-card-title>

        <v-card-subtitle class="text-caption">{{ client.id }}</v-card-subtitle>

        <div v-if="isExpanded">
            <div justify-right>
                <v-spacer></v-spacer>
                <v-btn icon @click="doEditing = true" :disabled="doEditing">
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
import Formatter from '@/util/formatter'

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
            formatter: new Formatter(this.$i18n),
        }
    },

    methods: {
        emitExpandEvent(val) {
            this.$emit('expand', val)
        },

        outsideClick() {
            console.log('test')
        },
    },
}
</script>

<style lang="scss" scoped>
.on-top {
    z-index: 1;
    overflow-y: auto;
    position: relative;
}

.title-switch {
    margin-top: -8px;
    margin-left: 8px;
}

.card {
    margin-bottom: -8px;
    padding-bottom: -8px;
    margin-right: -8px;
}
</style>
