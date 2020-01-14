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
        require('../index')
        setTimeout(() => {
            expect(consoleOutput[0]).toEqual("Matchday 1\nCapitola Seahorses, 3 pts\nFelton Lumberjacks, 3 pts\nSan Jose Earthquakes, 1 pts\n\n")
            expect(consoleOutput[1]).toEqual("Matchday 2\nCapitola Seahorses, 4 pts\nAptos FC, 3 pts\nFelton Lumberjacks, 3 pts\n\n")
            expect(consoleOutput[2]).toEqual("Matchday 3\nAptos FC, 6 pts\nFelton Lumberjacks, 6 pts\nMonterey United, 6 pts\n\n")
            expect(consoleOutput[3]).toEqual("Matchday 4\nAptos FC, 9 pts\nFelton Lumberjacks, 7 pts\nMonterey United, 6 pts\n\n")
            done()
        }, 4000)
    }, 5000)
})
