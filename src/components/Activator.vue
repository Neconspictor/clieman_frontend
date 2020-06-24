<template>
    <div>
        <component
            v-bind:is="wrapper"
            v-model="isOpen"
            :close-on-content-click="false"
            :close-on-click="!doEditing"
            :activator="activator"
            :persistent="dialogPersistent"
            ref="comp"
            :width="width"
        >
            <slot></slot>
        </component>
    </div>
</template>

<script>
import VMenu from 'vuetify/lib/components/VMenu'
import VDialog from 'vuetify/lib/components/VDialog'

export default {
    components: {
        VMenu,
        VDialog,
    },
    props: {
        activator: {
            type: Object,
            default: null,
        },

        value: {
            type: Boolean,
            default: false,
        },

        doEditing: {
            type: Boolean,
            default: false,
        },

        width: {
            type: [Number, String],
            default: 'undef',
        },

        dialogPersistent: {
            type: Boolean,
            default: true,
        },
    },

    computed: {
        isOpen: {
            get: function() {
                return this.value
            },

            set: function(newValue) {
                this.$emit('input', newValue)
            },
        },

        wrapper() {
            if (this.doEditing) return VDialog
            return VMenu
        },

        refs() {
            return this.$slots.default[0]
        },
    },
}
</script>

<style lang="scss" scoped></style>
