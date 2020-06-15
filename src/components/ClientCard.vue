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
        <v-divider></v-divider>

        <v-simple-table v-if="isExpanded" dense>
            <template v-slot:default>
                <tbody>
                    <tr>
                        <td>
                            {{ $i18n.t('clientData.name') }}
                        </td>
                        <td>
                            {{ client.name }}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {{ $i18n.t('clientData.forename') }}
                        </td>
                        <td>
                            {{ client.forename }}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {{ $i18n.t('clientData.title') }}
                        </td>
                        <td>
                            {{ client.title ? client.title : '-' }}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {{ $i18n.t('clientData.sex') }}
                        </td>
                        <td>
                            {{ client.sex }}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {{ $i18n.t('clientData.email') }}
                        </td>
                        <td>
                            {{ client.email ? client.email : '-' }}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {{ $i18n.t('clientData.mobile') }}
                        </td>
                        <td>
                            {{ client.mobile ? client.mobile : '-' }}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {{ $i18n.t('clientData.address') }}
                        </td>
                        <td>
                            {{ client.address }}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {{ $i18n.t('clientData.birthday') }}
                        </td>
                        <td>
                            {{ formatBirthday(client.birthday) }}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {{ $i18n.t('clientData.id') }}
                        </td>
                        <td>
                            {{ client.id }}
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-card>
</template>

<script>
import moment from 'moment-timezone'

export default {
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

    methods: {
        formatBirthday(birthday) {
            return moment(birthday).format('YYYY-MM-DD')
        },

        emitExpandEvent(val) {
            this.$emit('expand', val)
        },
    },
}
</script>

<style lang="scss" scoped></style>
