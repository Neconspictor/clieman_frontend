<script>
import { VTextField } from 'vuetify/lib'
export default {
    extends: VTextField,

    props: {
        hideDetails: {
            type: Boolean,
            default: true,
        },

        autoHide: {
            type: Boolean,
            default: false,
        },
    },

    watch: {
        hasError(val) {
            if (this.shouldValidate) {
                if (this.autoHide) this.hideDetails = !val
                this.$emit('update:error', val)
            }
        },
    },

    created() {
        if (this.autoHide && !this.hideDetails) {
            console.error(
                'If auto-hide is set to true, hide-details has to be set to true!'
            )
        }

        this.validate(true, this.value)
    },
}
</script>

<style lang="scss" scoped></style>
