const fs = require('fs')

module.exports = class FileParser {
    constructor(file, handleData) {
        this.file = file
        this.handleData = handleData
    }
    async readFile() {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(this.file, { encoding: 'utf8' })
            stream.on('data', data => {
                this.handleData(data)
                stream.destroy()
            })
            stream.on('close', () => {
                resolve()
            })
            stream.on('error', () => {
                reject(new Error('Error occurred reading file stream'))
            })
        })
    }
}