const FileParser = require('../bin/FileParser')


it('calls the spy function on file data when file found successfully', done => {
    const handlerSpy = jest.fn()
    const parser = new FileParser('./tests/test-file.txt', handlerSpy)
    parser.readFile().then(() => {
        expect(handlerSpy.mock.calls[0]).toEqual(['test file 1'])
        done()
    })
})

it('errors out if file not found', done => {
    const handlerSpy = jest.fn()
    const parser = new FileParser('./non-existant-file.txt', handlerSpy)
    parser.readFile().catch(error => {
        expect(error).toEqual(new Error('Error occurred reading file stream'))
        done()
    })
})