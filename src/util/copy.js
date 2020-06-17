import rfdc from 'rfdc'

export default class {
    static deepCopy(object) {
        return rfdc()(object)
    }
}
