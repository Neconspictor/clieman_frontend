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
                            </v-list>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </div>

        <div id="right" class="column" ref="rightside">
            <div class="right-bottom" ref="rightbottom">
                <div class="right-content" ref="rightcontent">
                    <v-container class="ml-4 mr-0">
                        <v-row>
                            <v-col>
                                <div ref="calendar">
                                    <h1 class="font-weight-thin">
                                        {{ this.$i18n.t('calendar') }}
                                    </h1>
                                </div>

                                <v-row>
                                    <v-col justify-center align-center>
                                        <v-row class="ml-4" align="center">
                                            <span class="mr-4 ">
                                                Active working hours:
                                            </span>
                                            <v-row
                                                style="margin-bottom: -10px;"
                                            >
                                                <div>
                                                    <TimePicker
                                                        v-model="
                                                            calendarWorkingHourStart
                                                        "
                                                        label="Start"
                                                        width="100px"
                                                    />
                                                </div>
                                                <div>
                                                    <TimePicker
                                                        v-model="
                                                            calendarWorkingHourEnd
                                                        "
                                                        label="End"
                                                        width="100px"
                                                    />
                                                </div>
                                            </v-row>
                                        </v-row>
                                    </v-col>
                                </v-row>

                                <v-divider></v-divider>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import moment from 'moment-timezone'
import TimePicker from '@/components/TimePicker'

export default {
    components: {
        TimePicker,
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
        }
    },

    methods: {
        goToInRightSide(elem) {
            $([this.$refs.rightbottom]).animate(
                {
                    scrollTop: elem.offsetTop,
                },
                400
            )
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

.top-left {
    //flex-shink: 0;
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
