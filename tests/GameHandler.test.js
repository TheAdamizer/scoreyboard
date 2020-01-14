const GameHandler = require('../bin/GameHandler')

describe('GameHandler initializes with an empty score map', () => {
    const outputSpy = jest.fn()
    const gameHandler = new GameHandler(outputSpy)
    it('Sorts by score if all scores unique', () => {
        expect(gameHandler.scoreMap).toEqual({})
    })
    it('Adds new teams and initial scores as they are seen', () => {
        gameHandler.handleGames('Team A 5, Team B 4\n')
        expect(gameHandler.scoreMap).toEqual({
            'Team A': { roundsPlayed: 1, currentScore: 3},
            'Team B': { roundsPlayed: 1, currentScore: 0}
        })
        expect(outputSpy.mock.calls.length).toEqual(0)
        gameHandler.handleGames('Team C 1, Team D 1\n')
        expect(gameHandler.scoreMap).toEqual({
            'Team A': { roundsPlayed: 1, currentScore: 3},
            'Team B': { roundsPlayed: 1, currentScore: 0},
            'Team C': { roundsPlayed: 1, currentScore: 1},
            'Team D': { roundsPlayed: 1, currentScore: 1}
        })
        gameHandler.handleGames('Team E 1, Team F 2\n')
        expect(gameHandler.scoreMap).toEqual({
            'Team A': { roundsPlayed: 1, currentScore: 3},
            'Team B': { roundsPlayed: 1, currentScore: 0},
            'Team C': { roundsPlayed: 1, currentScore: 1},
            'Team D': { roundsPlayed: 1, currentScore: 1},
            'Team E': { roundsPlayed: 1, currentScore: 0},
            'Team F': { roundsPlayed: 1, currentScore: 3}
        })
        expect(outputSpy.mock.calls.length).toEqual(0)
    })
    it('Outputs score map when team seen for second time', () => {
        gameHandler.handleGames('Team A 1, Team B 1\n')
        expect(outputSpy.mock.calls[0]).toEqual([{
            'Team A': { roundsPlayed: 1, currentScore: 3},
            'Team B': { roundsPlayed: 1, currentScore: 0},
            'Team C': { roundsPlayed: 1, currentScore: 1},
            'Team D': { roundsPlayed: 1, currentScore: 1},
            'Team E': { roundsPlayed: 1, currentScore: 0},
            'Team F': { roundsPlayed: 1, currentScore: 3}
        }])
        expect(gameHandler.scoreMap).toEqual({
            'Team A': { roundsPlayed: 2, currentScore: 4},
            'Team B': { roundsPlayed: 2, currentScore: 1},
            'Team C': { roundsPlayed: 1, currentScore: 1},
            'Team D': { roundsPlayed: 1, currentScore: 1},
            'Team E': { roundsPlayed: 1, currentScore: 0},
            'Team F': { roundsPlayed: 1, currentScore: 3}
        })
    })
    it('handles two digit numbers successfully', () => {
        gameHandler.handleGames('Team C 20, Team D 12\n')
        expect(gameHandler.scoreMap).toEqual({
            'Team A': { roundsPlayed: 2, currentScore: 4},
            'Team B': { roundsPlayed: 2, currentScore: 1},
            'Team C': { roundsPlayed: 2, currentScore: 4},
            'Team D': { roundsPlayed: 2, currentScore: 1},
            'Team E': { roundsPlayed: 1, currentScore: 0},
            'Team F': { roundsPlayed: 1, currentScore: 3}
        })
    })
    it('handles the last game of the input text as a round', () => {
        gameHandler.handleGames('Team E 10, Team F 2')
        expect(gameHandler.scoreMap).toEqual({
            'Team A': { roundsPlayed: 2, currentScore: 4},
            'Team B': { roundsPlayed: 2, currentScore: 1},
            'Team C': { roundsPlayed: 2, currentScore: 4},
            'Team D': { roundsPlayed: 2, currentScore: 1},
            'Team E': { roundsPlayed: 2, currentScore: 3},
            'Team F': { roundsPlayed: 2, currentScore: 3}
        })
        expect(outputSpy.mock.calls[1]).toEqual([{
            'Team A': { roundsPlayed: 2, currentScore: 4},
            'Team B': { roundsPlayed: 2, currentScore: 1},
            'Team C': { roundsPlayed: 2, currentScore: 4},
            'Team D': { roundsPlayed: 2, currentScore: 1},
            'Team E': { roundsPlayed: 2, currentScore: 3},
            'Team F': { roundsPlayed: 2, currentScore: 3}
        }])
    })
})