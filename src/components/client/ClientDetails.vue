<template>
    <v-menu
        v-model="isOpen"
        :close-on-content-click="false"
        :close-on-click="!doEditing"
        :activator="DOMElement"
        :persistent="doEditing"
    >
        <v-card
            elevation="4"
            dense
            :width="'undef'"
            :min-width="width"
            v-click-outside="handleClickOutside"
            :class="animate ? 'shake-animation card' : ''"
        >
            <v-card-title class="text-body-2">
                <v-flex class="d-flex">
                    <div>
                        {{
                            `${formatter.string(
                                client.title
                            )} ${formatter.string(
                                client.forename
                            )} ${formatter.string(client.name)}`
                        }}
                    </div>
                </v-flex>
            </v-card-title>

            <v-card-subtitle class="text-caption">{{
                client.id
            }}</v-card-subtitle>

            <div>
                <div justify-right>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="startEdit" :disabled="doEditing">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </div>
                <v-divider></v-divider>
                <ClientCardForm
                    ref="clientCardForm"
                    :client="client"
                    :clientEdit="clientEdit"
                    :value="doEditing"
                    @end-edit="endEdit"
                />
            </div>

            <v-card-actions>
                <div v-if="doEditing" class="ml-4 mb-4 mt-4">
                    <v-btn color="error" text @click="endEdit">{{
                        $i18n.t('discard')
                    }}</v-btn>
                    <v-btn
                        color="success"
                        text
                        @click="this.$refs.clientCardForm.validate"
                        :disabled="!this.$refs.clientCardForm.formIsValid"
                        >{{ $i18n.t('save') }}</v-btn
                    >
                </div>

                <v-btn v-else text color="secondary" @click="isOpen = false">
                    {{ $i18n.t('close') }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
import ClientCardForm from '@/components/client/ClientCardForm'
import Formatter from '@/util/formatter'
import copy from '@/util/copy'

export default {
    components: {
        ClientCardForm,
    },

    props: {
        value: {
            type: Boolean,
            required: true,
        },

        client: {
            type: Object,
            required: true,
        },

        width: {
            type: String,
            default: '100%',
        },

        DOMElement: {
            type: Object,
            required: true,
        },
    },

    computed: {
        isOpen: {
            get: function() {
                return this.value
            },

            set: function(newValue) {
                this.$emit('input', newValue)
                console.log('ClientDetails:isOpen: newValue: ', newValue)
                console.log('ClientDetails:isOpen: value: ', this.value)
            },
        },
    },

    data() {
        return {
            doEditing: false,
            formatter: new Formatter(this.$i18n),
            isExpanded: false,
            animate: false,
            clientEdit: {},
        }
    },

    methods: {
        startEdit() {
            this.clientEdit = copy.deepCopy(this.client)
            this.doEditing = true
        },
        endEdit() {
            this.clientEdit = {}
            this.doEditing = false
            this.$forceUpdate()
        },

        isEditing() {
            return this.doEditing
        },

        handleClickOutside(event) {
            console.log('click event: ', event)
            console.log(
                'this.$refs.clientCardForm.birthdayDatePicker: ',
                this.$refs.clientCardForm.birthdayDatePicker
            )

            if (
                this.isOpen &&
                this.doEditing &&
                !this.$refs.clientCardForm.birthdayDatePicker
            ) {
                this.animate = true

                var elems = document.getElementsByClassName('v-menu__content')
                console.log(elems.length)
                for (let i = 0; i < elems.length; i++) {
                    console.log(elems[i].style.overflow)
                    console.log(elems[i].style)
                    elems[i].style.overflow = 'initial'
                }

                setTimeout(() => {
                    this.animate = false
                    var elems = document.getElementsByClassName(
                        'v-menu__content'
                    )
                    for (let i = 0; i < elems.length; i++) {
                        elems[i].style.overflow = 'auto'
                    }
                }, 150)
            }
        },
    },
}
</script>

<style lang="scss">
.card {
    overflow: none;
}

.shake-animation {
    animation-duration: 0.15s;
    animation-name: animate-shake;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

@keyframes animate-shake {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.03);
    }

    100% {
        transform: scale(1);
    }
}

.v-menu__content {
    position: absolute;
    display: inline-block;
    max-width: 80%;
    overflow: auto;
    contain: unset;
    will-change: transform;
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
        0px 8px 10px 1px rgba(0, 0, 0, 0.14),
        0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
}
</style>
