<template>
    <v-card
        hover="true"
        :elevation="hover ? 4 : 2"
        class="card"
        dense
        :width="width"
        @click="emitClickEvent"
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
    </v-card>
</template>

<script>
import Formatter from '@/util/formatter'

export default {
    props: {
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
            formatter: new Formatter(this.$i18n),
        }
    },

    methods: {
        emitClickEvent(event) {
            this.$emit('click', {
                domElement: event.target,
                client: this.client,
                nativeEvent: event,
            })
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
