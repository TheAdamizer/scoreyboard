#!/usr/bin/env node

const fs = require('fs')

const GameHandler = require('./GameHandler')
const FileParser = require('./FileParser')
const { formatToText } = require('./Format')

const gameHandler = new GameHandler(scoreMap => process.stdout.write(formatToText(scoreMap)))
const param = process.argv[2]
let filePath
if (param) {
    if (param === '--sample'){
        filePath = './sample-input.txt'
    } else {
        filePath = param
    }
}
if (fs.existsSync(filePath)) {
    const parser = new FileParser(filePath, gameHandler.handleGames)
    parser.readFile()
}
else {
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', gameHandler.handleGames)
}