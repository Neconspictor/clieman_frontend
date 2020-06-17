<template>
    <v-form ref="form" v-model="formIsValid" :lazy-validation="true">
        <v-simple-table dense>
            <template v-slot:default>
                <tbody>
                    <TableEntry :editable="value">
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

                    <TableEntry :editable="value">
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

                    <TableEntry :editable="value">
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

                    <TableEntry :editable="value">
                        <template v-slot:key>{{
                            $i18n.t('clientData.sex')
                        }}</template>
                        <template v-slot:edit>
                            <v-select
                                :items="sexes"
                                :menu-props="{ top: true, offsetY: true }"
                                label=""
                                :value="{ sex: clientEdit.sex }"
                                @change="v => (clientEdit.sex = v.sex)"
                                :item-text="
                                    v => {
                                        return $i18n.t(v.sex)
                                    }
                                "
                                flat
                                dense
                                return-object
                                class="mt-4 mb-0"
                            ></v-select>
                        </template>
                        {{ $i18n.t(client.sex) }}
                    </TableEntry>

                    <TableEntry :editable="value">
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
                                :rules="emailRules"
                            >
                            </v-text-field>
                        </template>
                        {{ client.email ? client.email : '-' }}
                    </TableEntry>

                    <TableEntry :editable="value">
                        <template v-slot:key>{{
                            $i18n.t('clientData.mobile')
                        }}</template>
                        <template v-slot:edit>
                            <v-text-field
                                placeholder="Enter a telephone number"
                                dense
                                flat
                                v-model="clientEdit.mobile"
                                :rules="mobileRules"
                            >
                            </v-text-field>
                        </template>
                        {{ client.mobile ? client.mobile : '-' }}
                    </TableEntry>

                    <TableEntry :editable="value">
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

                    <TableEntry :editable="value">
                        <template v-slot:key>{{
                            $i18n.t('clientData.birthday')
                        }}</template>
                        <template v-slot:edit>
                            <v-text-field
                                placeholder="Enter the birthday"
                                dense
                                flat
                                :value="formatBirthday(clientEdit.birthday)"
                                @change="updateBirthday"
                                required
                                :rules="birthdayRules"
                            >
                            </v-text-field>
                        </template>
                        {{ formatBirthday(client.birthday) }}
                    </TableEntry>

                    <TableEntry :editable="value">
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

        <div v-if="value" class="ml-4 mb-4">
            <v-btn
                color="error"
                flat
                dense
                class="mr-4"
                @click="emitEndEditingEvent"
                >Discard</v-btn
            >
            <v-btn
                color="success"
                flat
                @click="validate"
                :disabled="!formIsValid"
                >Save</v-btn
            >
        </div>
    </v-form>
</template>

<script>
import moment from 'moment-timezone'
import copy from '@/util/copy'
import TableEntry from '@/components/client/TableEntry'
import DateUtil from '@/util/date'

export default {
    components: {
        TableEntry,
    },

    props: {
        client: {
            type: Object,
            required: true,
        },
        value: {
            type: Boolean,
            defautl: false,
        },
    },

    data() {
        return {
            clientEdit: copy.deepCopy(this.client),
            sexes: [{ sex: 'male' }, { sex: 'female' }, { sex: 'diverse' }],
            formIsValid: true,
        }
    },

    computed: {
        birthdayRules() {
            return [
                v => {
                    return !!v || 'Birthday is required'
                },

                v => {
                    const date = new Date(v)
                    return (
                        (v && !!this.checkBirthday(date)) ||
                        'Entered birthday is not a valid date'
                    )
                },
            ]
        },

        mobileRules() {
            return [
                v => {
                    return (
                        //TODO
                        (v && /[1234567890+]+/.test(v)) ||
                        'This is not a valid mobile/telephone number'
                    )
                },
            ]
        },

        emailRules() {
            return [
                v => {
                    if (!v) return true
                    return /.+@.+\...+/.test(v) || 'E-mail must be valid'
                },
            ]
        },
    },

    methods: {
        formatBirthday(birthday) {
            return moment(birthday).format('YYYY-MM-DD')
        },

        getEditedClient() {
            return this.clientEdit
        },

        checkBirthday(date) {
            const result = DateUtil.isValid(date)
            console.log('is valid: ', result)
            return result
        },

        updateBirthday(v) {
            const date = new Date(v)
            if (this.checkBirthday(date)) this.clientEdit.birthday = date
        },

        emitEndEditingEvent() {
            this.$emit('end-edit')
        },

        validate() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('updateClient', this.clientEdit)
                this.emitEndEditingEvent()
            }
        },
    },
}
</script>

<style lang="scss" scoped></style>
