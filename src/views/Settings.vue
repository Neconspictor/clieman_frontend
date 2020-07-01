<template>
    <div class="body">
        <div id="left" class="column">
            <div class="left-bottom left-content">
                <v-container class="pl-8">
                    <v-row>
                        <v-col>
                            <v-list>
                                <v-list-item
                                    @click="goToInRightSide($refs.calendar)"
                                >
                                    <v-icon>event</v-icon>
                                    <div class="ml-1">
                                        {{ this.$i18n.t('calendar') }}
                                    </div>
                                </v-list-item>
                                <v-list-item
                                    @click="goToInRightSide($refs.language)"
                                >
                                    <v-icon>language</v-icon>
                                    <div class="ml-1">
                                        {{ this.$i18n.t('language') }}
                                    </div>
                                </v-list-item>
                                <v-list-item
                                    @click="goToInRightSide($refs.account)"
                                >
                                    <v-icon>mdi-account</v-icon>
                                    <div class="ml-1">
                                        {{ this.$i18n.t('account') }}
                                    </div>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </div>

        <div id="right" class="column" ref="rightside">
            <div class="right-bottom" ref="rightbottom">
                <v-container class="right-content" ref="rightcontent">
                    <SettingEntry ref="calendar" :title="$i18n.t('calendar')">
                        <v-row class="ml-4" align="center">
                            <span class="mr-4 ">
                                Active working hours:
                            </span>
                            <v-row style="margin-bottom: -10px;">
                                <div>
                                    <TimePicker
                                        :value="
                                            calendarOptions.workingRange.start
                                        "
                                        @input="
                                            v => updateWorkingRange(v, 'start')
                                        "
                                        label="Start"
                                        width="100px"
                                    />
                                </div>
                                <div>
                                    <TimePicker
                                        :value="
                                            calendarOptions.workingRange.end
                                        "
                                        @input="
                                            v => updateWorkingRange(v, 'end')
                                        "
                                        label="End"
                                        width="100px"
                                    />
                                </div>
                            </v-row>
                        </v-row>
                    </SettingEntry>
                    <SettingEntry ref="language" :title="$i18n.t('language')">
                        <v-row class="ml-4">
                            <v-select
                                :value="currentLanguage"
                                style="max-width: max-content;"
                                :items="languages"
                                :placeholder="
                                    $i18n.t('settingsData.selectLanguage')
                                "
                                outlined
                                :item-text="lang => lang.label"
                                @change="setLanguage"
                                return-object
                            ></v-select>
                        </v-row>
                    </SettingEntry>
                    <SettingEntry ref="account" :title="$i18n.t('account')">
                        <EditableText
                            :maxWidth="'500px'"
                            @save="saveEditedUserName"
                            :label="$i18n.t('username')"
                            prepend-icon="mdi-account-circle"
                            :tooltipText="$i18n.t('editData.username')"
                            :value="account.username"
                        />

                        <v-row class="ml-4" style="max-width: 500px">
                            <v-text-field
                                :label="$i18n.t('email')"
                                type="email"
                                v-model="account.email"
                                prepend-icon="alternate_email"
                                readonly
                            >
                            </v-text-field>
                            <EditButton
                                btnClass="mt-4"
                                :tooltipText="$i18n.t('editData.email')"
                            />
                        </v-row>
                        <v-row class="ml-4" style="max-width: 500px">
                            <PasswordField v-model="account.password" />

                            <EditButton
                                btnClass="mt-4"
                                :tooltipText="$i18n.t('editData.password')"
                            />
                        </v-row>
                    </SettingEntry>
                </v-container>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import moment from 'moment-timezone'
import TimePicker from '@/components/TimePicker'
import { mapState, mapActions, mapGetters } from 'vuex'
import rfdc from 'rfdc'
import SettingEntry from '@/components/SettingEntry'
import EditButton from '@/components/util/EditButton'
import PasswordField from '@/components/util/PasswordField'
//import EditableField from '@/components/util/EditableField'
import EditableText from '@/components/util/EditableText'

export default {
    components: {
        TimePicker,
        SettingEntry,
        EditButton,
        PasswordField,
        // EditableField,
        EditableText,
    },
    data() {
        return {
            items: [
                { title: 'Home', icon: 'mdi-home-city' },
                { title: 'My Account', icon: 'mdi-account' },
                { title: 'Users', icon: 'mdi-account-group-outline' },
            ],

            calendarWorkingHourStart: moment('08:00', 'HH:mm').toDate(),
            calendarWorkingHourEnd: moment('18:00', 'HH:mm').toDate(),

            account: {
                username: 'Schlomo',
                usernameEdit: '',
                email: 'testimonial.schlomo@googlemail.com',
                password: 'testPassword1234',
            },
        }
    },

    computed: {
        ...mapState('settings', {
            calendarOptions: state => state.calendarOptions,
            languages: state => state.languages,
        }),

        ...mapGetters('settings', ['getLanguage']),

        currentLanguage() {
            return this.getLanguage(this.$vuetify.lang.current)
        },
    },

    methods: {
        ...mapActions('settings', ['setCalendarOptions']),

        goToInRightSide(ref) {
            console.log('ref: ', ref)

            $([this.$refs.rightbottom]).animate(
                {
                    scrollTop: ref.$el.offsetTop,
                },
                400
            )
        },

        updateWorkingRange(newDate, key) {
            const copy = rfdc()(this.calendarOptions)
            copy.workingRange[key] = newDate
            this.setCalendarOptions(copy)
        },

        setLanguage(language) {
            this.$vuetify.lang.current = language.lang
            this.$i18n.locale = this.$vuetify.lang.current
        },

        saveEditedUserName({ setEditState, value }) {
            this.account.username = value
            setEditState(false)
        },
    },
}
</script>

<style lang="scss" scoped>
scrollbar {
    background: green;
}

.body {
    height: calc(100vh - 179px);
    //overflow: hidden; /*makes the body non-scrollable (we will add scrolling to the sidebar and main content containers)*/
    //margin: 0px; /*removes default style*/
    display: flex; /*enables flex content for its children*/
    //box-sizing: border-box;
    margin-top: -23px;
}

.column {
    height: 100%; /*allows both columns to span the full height of the browser window*/
    display: flex;
    flex-direction: column; /*places the left and right headers above the bottom content*/
}

#right {
    width: 100%;
}

.top-right {
    //flex-shrink: 0;
    display: inline-flex;
}

ul {
    display: inline-flex;
    list-style: none;
}

.left-bottom {
    flex-grow: 1; /*ensures that the container will take up the full height of the parent container*/
    overflow-y: auto; /*adds scroll to this container*/
    width: 100%;
    overflow-x: auto;
}

.left-content {
    white-space: nowrap;
    text-overflow: ellipsis;
    //overflow-x: hidden;
    //margin-right: 10px;
}

.right-bottom {
    flex-grow: 1; /*ensures that the container will take up the full height of the parent container*/
    overflow-y: auto; /*adds scroll to this container*/
}

.right-content {
    //max-width: 700px;
    width: 90%;
    //width: fit-content;
}
</style>
