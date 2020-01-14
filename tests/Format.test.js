const { formatToText } = require('../Format')

describe('Scoremap formats and sorts property into output text', () => {
    it('Sorts by score if all scores unique', () => {
        expect(formatToText({
            "Team A": { roundsPlayed: 4, currentScore: 11 },
            "Team B": { roundsPlayed: 4, currentScore: 13 },
            "Team C": { roundsPlayed: 4, currentScore: 1 },
            "Team D": { roundsPlayed: 4, currentScore: 2 },
        })).toEqual('Matchday 4\nTeam B, 13 pts\nTeam A, 11 pts\nTeam D, 2 pts\n\n')
    })
    it('Sorts by a name if two scores are the same', () => {
        expect(formatToText({
            "Team A": { roundsPlayed: 4, currentScore: 11 },
            "Team B": { roundsPlayed: 4, currentScore: 13 },
            "Team C": { roundsPlayed: 4, currentScore: 2 },
            "Team D": { roundsPlayed: 4, currentScore: 2 },
        })).toEqual('Matchday 4\nTeam B, 13 pts\nTeam A, 11 pts\nTeam C, 2 pts\n\n')
    })
    it('Sorts by only name if all scores are the same', () => {
        expect(formatToText({
            "Team A": { roundsPlayed: 4, currentScore: 13 },
            "Team B": { roundsPlayed: 4, currentScore: 13 },
            "Team C": { roundsPlayed: 4, currentScore: 13 },
            "Team D": { roundsPlayed: 4, currentScore: 13 },
        })).toEqual('Matchday 4\nTeam A, 13 pts\nTeam B, 13 pts\nTeam C, 13 pts\n\n')
    })
})