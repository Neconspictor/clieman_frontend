export default class ID {
    static createUniqueID(generator, dataArray) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            let id = generator()
            if (
                dataArray.filter(element => {
                    element.id === id
                }).length === 0
            ) {
                return id
            }
        }
    }

    static defaultCreateUniqueID(dataArray) {
        return ID.createUniqueID(() => {
            return ID.makeID(20, ID.defaultCharacters)
        }, dataArray)
    }

    static makeID(length, characters) {
        var result = ''
        var charactersLength = characters.length
        for (var i = 0; i < length; i++) {
            result += characters[Math.floor(Math.random() * charactersLength)]
        }
        return result
    }

    static defaultCharacters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
}
