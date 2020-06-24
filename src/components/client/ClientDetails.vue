<template>
    <Activator
        v-model="isOpen"
        :doEditing="doEditing"
        :activator="DOMElement"
        :width="width"
    >
        <v-card
            elevation="4"
            dense
            :min-width="width"
            :max-width="width"
            :width="undef"
            :style="cssProps"
        >
            <div :class="toolbarClasses">
                <v-card-title class="d-flex flex-row justify-start">
                    <span v-if="!doEditing">
                        {{
                            `${formatter.string(
                                client.title
                            )} ${formatter.string(
                                client.forename
                            )} ${formatter.string(client.name)}`
                        }}
                    </span>
                    <span v-else>
                        {{
                            `${formatter.string(
                                clientEdit.title
                            )} ${formatter.string(
                                clientEdit.forename
                            )} ${formatter.string(clientEdit.name)}`
                        }}
                    </span>
                </v-card-title>

                <v-card-subtitle class="text-caption">{{
                    client.id
                }}</v-card-subtitle>
            </div>

            <v-card-text>
                <v-divider></v-divider>
                <ClientCardForm
                    ref="clientCardForm"
                    :client="client"
                    :clientEdit="clientEdit"
                    :value="doEditing"
                    @end-edit="endEdit"
                    @valid="updateValidation"
                />
            </v-card-text>

            <v-card-actions>
                <div v-if="doEditing" class="ml-4 mb-4 mt-4">
                    <v-btn color="error" text @click="endEdit"
                        >{{ $i18n.t('discard') }}
                        <v-icon>cancel</v-icon>
                    </v-btn>
                    <v-btn
                        color="success"
                        text
                        @click="validateForm"
                        :disabled="!formIsValid"
                        >{{ $i18n.t('save') }}
                        <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                </div>

                <div v-else>
                    <v-btn text @click="isOpen = false">
                        {{ $i18n.t('close') }}
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                    <v-btn text @click="startEdit" :disabled="doEditing">
                        {{ $i18n.t('edit') }}
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn text @click="startEdit" :disabled="doEditing">
                        {{ $i18n.t('delete') }}
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </div>
            </v-card-actions>
        </v-card>
    </Activator>
</template>

<script>
import Activator from '@/components//Activator'
import ClientCardForm from '@/components/client/ClientCardForm'

import Formatter from '@/util/formatter'
import copy from '@/util/copy'
import Dependent from 'vuetify/lib/mixins/dependent'

export default {
    components: {
        ClientCardForm,
        Activator,
    },

    mixins: [Dependent],

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
        cssProps() {
            return {
                '--primary-color': this.$vuetify.theme.themes.light.primary,
            }
        },
        isOpen: {
            get: function() {
                return this.value
            },

            set: function(newValue) {
                this.$emit('input', newValue)
            },
        },

        toolbarClasses() {
            let classes = ''
            if (this.$vuetify.theme.dark) {
                classes += 'theme-dark--my-toolbar'
            } else {
                classes += 'theme-light--my-toolbar'
            }

            return classes
        },
    },

    data() {
        return {
            doEditing: false,
            formatter: new Formatter(this.$i18n),
            isExpanded: false,
            animate: false,
            clientEdit: {},
            formIsValid: true,
            accentColor: '',
        }
    },

    methods: {
        validateForm() {
            this.$refs.clientCardForm.validate()
        },
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
        updateValidation(e) {
            this.formIsValid = e
        },
    },
}
</script>

<style lang="scss" scoped>
// Import the Vuetify styles somewhere global
@import '~vuetify/src/styles/styles.sass';

.card {
    overflow: none;
}

.v-menu__content {
    overflow: auto;
    contain: unset;
}

.theme-light--my-toolbar {
    background-color: var(--primary-color);
    color: white;
}

.theme--light.v-card > .v-card__text,
.theme--light.v-card .v-card__subtitle {
    color: rgba(255, 255, 255, 0.6);
}

.theme-dark--my-toolbar {
    background-color: map-get($material-dark, 'bg-color');
    outline-style: dotted;
}
</style>
