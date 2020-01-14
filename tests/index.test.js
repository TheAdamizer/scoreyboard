const { exec } = require('child_process')
const path = require('path')

describe('console output', () => {
    let consoleOutput
    let originalWrite
    beforeEach(() => {
        consoleOutput = []
        originalWrite = process.stdout.write
        process.stdout.write = data => consoleOutput.push(data)
    })
    afterEach(() => {
        process.stdout.write = originalWrite
    })
    it('calls to stdout when rounds seen', done => {
        const targetDir = process.cwd()
        const targetJs = path.join(targetDir, 'bin/index.js')
        exec(`node ${targetJs} --sample`, (err, stdout, stderr) => {
            expect(stdout).toEqual(
                "Matchday 1\nCapitola Seahorses, 3 pts\nFelton Lumberjacks, 3 pts\nSan Jose Earthquakes, 1 pts\n\n" +
                "Matchday 2\nCapitola Seahorses, 4 pts\nAptos FC, 3 pts\nFelton Lumberjacks, 3 pts\n\n" +
                "Matchday 3\nAptos FC, 6 pts\nFelton Lumberjacks, 6 pts\nMonterey United, 6 pts\n\n" +
                "Matchday 4\nAptos FC, 9 pts\nFelton Lumberjacks, 7 pts\nMonterey United, 6 pts\n\n"
            )
            done()
        })
    }, 2500)
    it('handles input file without ending line', done => {
        const targetDir = process.cwd()
        const targetJs = path.join(targetDir, 'bin/index.js')
        const targetInput = path.join(targetDir, 'tests/sample-input-no-end-line.txt')
        exec(`node ${targetJs} ${targetInput}`, (err, stdout, stderr) => {
            console.log(err)
            console.log(stderr)
            console.log(stdout)
            expect(stdout).toEqual(
                "Matchday 1\nAptos FC, 3 pts\nFelton Lumberjacks, 3 pts\nSan Jose Earthquakes, 1 pts\n\n" +
                "Matchday 2\nAptos FC, 6 pts\nFelton Lumberjacks, 3 pts\nMonterey United, 3 pts\n\n" +
                "Matchday 3\nAptos FC, 9 pts\nFelton Lumberjacks, 6 pts\nMonterey United, 6 pts\n\n" +
                "Matchday 4\nAptos FC, 12 pts\nFelton Lumberjacks, 7 pts\nMonterey United, 6 pts\n\n"
            )
            done()
        })
    }, 2500)
})
