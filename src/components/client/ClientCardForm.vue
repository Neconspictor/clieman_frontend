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
                                :placeholder="
                                    $i18n.t('clientData.placeholders.name')
                                "
                                dense
                                flat
                                v-model="clientEdit.name"
                                hide-details="true"
                                class="v-text-field"
                            />
                        </template>
                        {{ formatter.string(client.name) }}
                    </TableEntry>

                    <TableEntry :editable="value">
                        <template v-slot:key>{{
                            $i18n.t('clientData.forename')
                        }}</template>
                        <template v-slot:edit>
                            <v-text-field
                                :placeholder="
                                    $i18n.t('clientData.placeholders.forename')
                                "
                                dense
                                single-line
                                v-model="clientEdit.forename"
                                hide-details="true"
                            >
                            </v-text-field>
                        </template>
                        {{ formatter.string(client.forename) }}
                    </TableEntry>

                    <TableEntry :editable="value">
                        <template v-slot:key>{{
                            $i18n.t('clientData.title')
                        }}</template>
                        <template v-slot:edit>
                            <v-text-field
                                :placeholder="
                                    $i18n.t('clientData.placeholders.title')
                                "
                                dense
                                single-line
                                v-model="clientEdit.title"
                                hide-details="true"
                            >
                            </v-text-field>
                        </template>
                        {{ formatter.string(client.title) }}
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
                                :value="selectedSex"
                                :placeholder="
                                    $i18n.t('clientData.placeholders.sex')
                                "
                                @change="v => (clientEdit.sex = v.sex)"
                                :item-text="createSexSelectionText"
                                single-line
                                hide-details="true"
                                dense
                                return-object
                                class="mt-4 mb-0"
                            ></v-select>
                        </template>
                        {{
                            formatter.object(client.sex, () =>
                                $i18n.t(client.sex)
                            )
                        }}
                    </TableEntry>

                    <TableEntry :editable="value">
                        <template v-slot:key>{{
                            $i18n.t('clientData.email')
                        }}</template>
                        <template v-slot:edit>
                            <TextInput
                                :placeholder="
                                    $i18n.t('clientData.placeholders.email')
                                "
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
                        {{ formatter.string(client.email) }}
                    </TableEntry>

                    <TableEntry :editable="value">
                        <template v-slot:key>{{
                            $i18n.t('clientData.mobile')
                        }}</template>
                        <template v-slot:edit>
                            <TextInput
                                :placeholder="
                                    $i18n.t('clientData.placeholders.mobile')
                                "
                                dense
                                flat
                                v-model="clientEdit.mobile"
                                :rules="mobileRules"
                                auto-hide
                            >
                            </TextInput>
                        </template>
                        {{ formatter.string(client.mobile) }}
                    </TableEntry>

                    <TableEntry :editable="value">
                        <template v-slot:key>{{
                            $i18n.t('clientData.address')
                        }}</template>
                        <template v-slot:edit>
                            <v-text-field
                                :placeholder="
                                    $i18n.t('clientData.placeholders.address')
                                "
                                dense
                                v-model="clientEdit.address"
                                single-line
                                hide-details="true"
                            >
                            </v-text-field>
                        </template>
                        {{ formatter.string(client.address) }}
                    </TableEntry>

                    <TableEntry :editable="value">
                        <template v-slot:key>{{
                            $i18n.t('clientData.birthday')
                        }}</template>
                        <template v-slot:edit>
                            <v-menu
                                v-model="birthdayDatePicker"
                                :nudge-right="40"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        :value="displayedBirthday"
                                        prepend-icon="event"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="birthdayDate"
                                    @click:date="dateChanged"
                                ></v-date-picker>
                            </v-menu>
                        </template>
                        {{ formatter.date(client.birthday, 'birthday') }}
                    </TableEntry>

                    <TableEntry :editable="value">
                        <template v-slot:key>{{
                            $i18n.t('clientData.id')
                        }}</template>
                        <template v-slot:edit>
                            {{ formatter.string(client.id) }}
                        </template>
                        {{ formatter.string(client.id) }}
                    </TableEntry>
                    <v-divider></v-divider>
                </tbody>
            </template>
        </v-simple-table>
    </v-form>
</template>

<script>
import moment from 'moment-timezone'
import TableEntry from '@/components/client/TableEntry'
import DateUtil from '@/util/date'
import TextInput from '@/components/client/TextInput'
import Formatter from '@/util/formatter'

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
        clientEdit: {
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
            sexes: [{ sex: 'diverse' }, { sex: 'male' }, { sex: 'female' }],
            formIsValid: true,
            birthdayInputHideDetails: true,
            birthdayDatePicker: false,
            formatter: new Formatter(this.$i18n, '-'),
            birthdayFormatter: new Formatter(
                this.$i18n,
                this.$i18n.t('clientData.placeholders.birthday')
            ),
        }
    },

    computed: {
        selectedSex() {
            return { sex: this.clientEdit.sex }
        },

        birthdayDate: {
            get: function() {
                return DateUtil.formatDate(
                    this.clientEdit.birthday,
                    DateUtil.getDefaultTimeZone(),
                    DateUtil.getYearToDayFormat()
                )
            },

            set: function(value) {
                this.clientEdit.birthday = moment(value).toDate()
            },
        },

        displayedBirthday() {
            return this.birthdayFormatter.date(
                this.clientEdit.birthday,
                'birthday'
            )
        },

        mobileRules() {
            return [
                v => {
                    if (!v) return true

                    v = v.replace(/\s/g, '')
                    return (
                        //TODO

                        (v && /^[0-9+][0-9]{0,}$/.test(v)) ||
                        this.$i18n.t('clientData.validators.mobile')
                    )
                },
            ]
        },

        emailRules() {
            return [
                v => {
                    if (!v) return true
                    return (
                        /.+@.+\...+/.test(v) ||
                        this.$i18n.t('clientData.validators.email')
                    )
                },
            ]
        },
    },

    methods: {
        dateChanged(event) {
            console.log('dateChanged, ', event)
            setTimeout(() => (this.birthdayDatePicker = false), 50)
        },
        createSexSelectionText(v) {
            return this.formatter.string(v.sex)
        },

        getEditedClient() {
            return this.clientEdit
        },

        emitEndEditingEvent() {
            this.$emit('end-edit')
        },

        validate() {
            if (this.$refs.form.validate()) {
                console.log(this.clientEdit)
                this.$store
                    .dispatch('updateClient', this.clientEdit)
                    .finally(() => {
                        console.log('test')
                        this.emitEndEditingEvent()
                    })
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
