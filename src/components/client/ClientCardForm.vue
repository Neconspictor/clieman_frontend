<template>
    <v-form ref="form" v-model="formIsValid" :lazy-validation="true">
        <v-simple-table dense>
            <template v-slot:default>
                <tbody>
                    <TableEntry :editable="isEditing">
                        <template v-slot:key>{{
                            $i18n.t('clientData.name')
                        }}</template>
                        <template v-slot:edit>
                            <v-text-field
                                placeholder="Enter a name"
                                dense
                                flat
                                v-model="clientEdit.name"
                            >
                            </v-text-field>
                        </template>
                        {{ client.name }}
                    </TableEntry>

                    <TableEntry :editable="isEditing">
                        <template v-slot:key>{{
                            $i18n.t('clientData.forename')
                        }}</template>
                        <template v-slot:edit>
                            <v-text-field
                                placeholder="Enter the forename"
                                dense
                                flat
                                v-model="clientEdit.forename"
                            >
                            </v-text-field>
                        </template>
                        {{ client.forename }}
                    </TableEntry>

                    <TableEntry :editable="isEditing">
                        <template v-slot:key>{{
                            $i18n.t('clientData.title')
                        }}</template>
                        <template v-slot:edit>
                            <v-text-field
                                placeholder="Enter the title"
                                dense
                                flat
                                v-model="clientEdit.title"
                            >
                            </v-text-field>
                        </template>
                        {{ client.title ? client.title : '-' }}
                    </TableEntry>

                    <TableEntry :editable="isEditing">
                        <template v-slot:key>{{
                            $i18n.t('clientData.sex')
                        }}</template>
                        <template v-slot:edit>
                            <v-select
                                :items="sexes"
                                :menu-props="{ top: true, offsetY: true }"
                                label="select sex"
                                :value="{ sex: clientEdit.sex }"
                                @change="v => (clientEdit.sex = v.sex)"
                                :item-text="
                                    v => {
                                        return $i18n.t(v.sex)
                                    }
                                "
                                solo
                                flat
                                dense
                                return-object
                            ></v-select>
                        </template>
                        {{ $i18n.t(client.sex) }}
                    </TableEntry>

                    <TableEntry :editable="isEditing">
                        <template v-slot:key>{{
                            $i18n.t('clientData.email')
                        }}</template>
                        <template v-slot:edit>
                            <v-text-field
                                placeholder="Enter the e-mail"
                                dense
                                flat
                                v-model="clientEdit.email"
                                type="email"
                            >
                            </v-text-field>
                        </template>
                        {{ client.email ? client.email : '-' }}
                    </TableEntry>

                    <TableEntry :editable="isEditing">
                        <template v-slot:key>{{
                            $i18n.t('clientData.mobile')
                        }}</template>
                        <template v-slot:edit>
                            <v-text-field
                                placeholder="Enter a telephone number"
                                dense
                                flat
                                v-model="clientEdit.mobile"
                            >
                            </v-text-field>
                        </template>
                        {{ client.mobile ? client.mobile : '-' }}
                    </TableEntry>

                    <TableEntry :editable="isEditing">
                        <template v-slot:key>{{
                            $i18n.t('clientData.address')
                        }}</template>
                        <template v-slot:edit>
                            <v-text-field
                                placeholder="Enter an address"
                                dense
                                flat
                                v-model="clientEdit.address"
                            >
                            </v-text-field>
                        </template>
                        {{ client.address ? client.address : '-' }}
                    </TableEntry>

                    <TableEntry :editable="isEditing">
                        <template v-slot:key>{{
                            $i18n.t('clientData.birthday')
                        }}</template>
                        <template v-slot:edit>
                            <v-text-field
                                placeholder="Enter the birthday"
                                dense
                                flat
                                :value="formatBirthday(clientEdit.birthday)"
                                @change="
                                    v => {
                                        clientEdit.birthday = new Date(v)
                                    }
                                "
                            >
                            </v-text-field>
                        </template>
                        {{ formatBirthday(client.birthday) }}
                    </TableEntry>

                    <TableEntry :editable="isEditing">
                        <template v-slot:key>{{
                            $i18n.t('clientData.id')
                        }}</template>
                        <template v-slot:edit>
                            <v-text-field
                                readonly
                                dense
                                flat
                                v-model="clientEdit.id"
                                hint="id cannot be edited"
                            >
                            </v-text-field>
                        </template>
                        {{ client.id }}
                    </TableEntry>
                </tbody>
            </template>
        </v-simple-table>
    </v-form>

    <!--<tr>
                        <td>:</td>
                        <td>
                            <v-text-field
                                placeholder="placeholder"
                                readonly
                                hint="id cannot be changed"
                            >
                            </v-text-field>
                        </td>
                    </tr>-->
</template>

<script>
import moment from 'moment-timezone'
import copy from '@/util/copy'
import TableEntry from '@/components/client/TableEntry'

export default {
    components: {
        TableEntry,
    },

    props: {
        client: {
            type: Object,
            required: true,
        },
        isEditing: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            clientEdit: copy.deepCopy(this.client),
            sexes: [{ sex: 'male' }, { sex: 'female' }, { sex: 'diverse' }],
            formIsValid: true,
        }
    },

    methods: {
        formatBirthday(birthday) {
            return moment(birthday).format('YYYY-MM-DD')
        },

        getEditedClient() {
            return this.clientEdit
        },
    },
}
</script>

<style lang="scss" scoped></style>
