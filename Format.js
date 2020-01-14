module.exports = {
    formatToText: scoreMap => {
        const formatSingleLine = teamName => `${teamName}, ${scoreMap[teamName].currentScore} pts\n`
        const sortedTeams = Object.keys(scoreMap).sort((teamA, teamB) => {
            const diff = scoreMap[teamA].currentScore - scoreMap[teamB].currentScore
            if (diff !== 0) {
                return -diff
            } else {
                return (teamA < teamB) ? -1 : 1
            }
        })
        const matchday = scoreMap[sortedTeams[0]].roundsPlayed
        return (
            `Matchday ${matchday}\n${formatSingleLine(sortedTeams[0], scoreMap)}${formatSingleLine(sortedTeams[1], scoreMap)}${formatSingleLine(sortedTeams[2], scoreMap)}\n`
        )
    }
}