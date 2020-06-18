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
                                hide-details="true"
                                class="v-text-field"
                            />
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
                                single-line
                                v-model="clientEdit.forename"
                                hide-details="true"
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
                                single-line
                                v-model="clientEdit.title"
                                hide-details="true"
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
                                single-line
                                hide-details="true"
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
                            <TextInput
                                placeholder="Enter the e-mail"
                                dense
                                flat
                                v-model="clientEdit.email"
                                type="email"
                                :rules="emailRules"
                                single-line
                                auto-hide
                            >
                            </TextInput>
                        </template>
                        {{ client.email ? client.email : '-' }}
                    </TableEntry>

                    <TableEntry :editable="value">
                        <template v-slot:key>{{
                            $i18n.t('clientData.mobile')
                        }}</template>
                        <template v-slot:edit>
                            <TextInput
                                placeholder="Enter a telephone number"
                                dense
                                flat
                                v-model="clientEdit.mobile"
                                :rules="mobileRules"
                                auto-hide
                            >
                            </TextInput>
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
                                v-model="clientEdit.address"
                                single-line
                                hide-details="true"
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
                            <TextInput
                                placeholder="Enter the birthday"
                                dense
                                :value="formatBirthday(clientEdit.birthday)"
                                @change="updateBirthday"
                                required
                                :rules="birthdayRules"
                                single-line
                                auto-hide
                            >
                            </TextInput>
                        </template>
                        {{ formatBirthday(client.birthday) }}
                    </TableEntry>

                    <TableEntry :editable="value">
                        <template v-slot:key>{{
                            $i18n.t('clientData.id')
                        }}</template>
                        <template v-slot:edit>
                            {{ client.id }}
                        </template>
                        {{ client.id }}
                    </TableEntry>
                    <v-divider></v-divider>
                </tbody>
            </template>
        </v-simple-table>

        <div v-if="value" class="ml-4 mb-4 mt-4">
            <v-btn color="error" dense class="mr-4" @click="emitEndEditingEvent"
                >Discard</v-btn
            >
            <v-btn color="success" @click="validate" :disabled="!formIsValid"
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
import TextInput from '@/components/client/TextInput'

export default {
    components: {
        TableEntry,
        TextInput,
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
            sexes: [{ sex: 'male' }, { sex: 'female' }, { sex: 'diverse' }],
            formIsValid: true,
            birthdayInputHideDetails: true,
        }
    },

    computed: {
        clientEdit() {
            return copy.deepCopy(this.client)
        },

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
                    if (!v) return true
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

<style lang="scss" scoped>
.v-text-field {
    font-size: 1em;
}
</style>
