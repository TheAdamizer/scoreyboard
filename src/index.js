#!/usr/bin/env node

const fs = require('fs')

const GameHandler = require('./GameHandler')
const FileParser = require('./FileParser')
const { formatToText } = require('./Format')

const gameHandler = new GameHandler(scoreMap => process.stdout.write(formatToText(scoreMap)))
const filePath = process.argv[2] ? process.argv[2] : './sample-input.txt'
if (fs.existsSync(filePath)) {
    const parser = new FileParser(process.argv[2] ? process.argv[2] : './sample-input.txt', gameHandler.handleGames)
    parser.readFile()
}
else {
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', data => gameHandler.handleGames(data))
}