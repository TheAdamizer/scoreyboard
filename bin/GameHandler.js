"use strict";

var _temp;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = (_temp = class GameHandler {
  constructor(outputResult) {
    _defineProperty(this, "handleGames", inputText => {
      const totalLength = inputText.length;
      let pos = 0;
      let currentGame = '';

      for (pos = 0; pos < totalLength; pos++) {
        const nextChar = inputText[pos];
        const lastChar = pos === totalLength - 1;

        if (nextChar === '\n' || lastChar) {
          if (lastChar) currentGame = currentGame.concat(nextChar);
          this.handleGame(currentGame, lastChar);
          currentGame = '';
        } else {
          currentGame = currentGame.concat(nextChar);
        }
      }
    });

    _defineProperty(this, "updateTeamEntry", (teamName, score) => {
      const {
        scoreMap
      } = this;

      if (!scoreMap[teamName]) {
        if (!this.roundCount) this.roundCount = 1;
        scoreMap[teamName] = {
          roundsPlayed: 1,
          currentScore: score
        };
      } else {
        scoreMap[teamName] = {
          roundsPlayed: scoreMap[teamName].roundsPlayed + 1,
          currentScore: scoreMap[teamName].currentScore + score
        };
      }
    });

    _defineProperty(this, "handleGame", (gameText, lastGame) => {
      if (gameText) {
        const gameResults = parseGameString(gameText);
        const team1Name = gameResults[0][0];
        const team2Name = gameResults[1][0];
        const scoreDiff = gameResults[0][1] - gameResults[1][1];
        let team1ScoreChange = 0;
        let team2ScoreChange = 0;

        if (scoreDiff < 0) {
          team2ScoreChange = 3;
        } else if (scoreDiff === 0) {
          team1ScoreChange = 1;
          team2ScoreChange = 1;
        } else {
          team1ScoreChange = 3;
        }

        if (this.scoreMap[team1Name] && this.roundCount < this.scoreMap[team1Name].roundsPlayed + 1) {
          this.outputResult(Object.assign({}, this.scoreMap));
          this.roundCount += 1;
        }

        this.updateTeamEntry(team1Name, team1ScoreChange);
        this.updateTeamEntry(team2Name, team2ScoreChange);
      }

      if (lastGame) {
        this.outputResult(Object.assign({}, this.scoreMap));
      }
    });

    this.scoreMap = {};
    this.roundCount = 0;
    this.outputResult = outputResult;
  }

}, _temp); // Parses a string like ' Santa Cruz Slugs 3'
// or 'San Jose Earthquakes 32'

const parseScoreString = scoreText => {
  let i = 0;
  let char = '';
  let numericVal = '';
  let text;

  if (scoreText[0] === ' ') {
    text = scoreText.slice(1);
  } else {
    text = scoreText;
  }

  const len = text.length;

  while (true) {
    char = text[len - i - 1];

    if (char === '\n' || char === '\r') {
      i++;
    } else if (char >= '0' && char <= '9') {
      numericVal = char.concat(numericVal);
      i++;
    } else {
      break;
    }
  }

  const teamString = text.slice(0, len - i - 1);
  return [teamString, parseInt(numericVal)];
};

const parseGameString = gameText => {
  const scoreStrings = gameText.split(',');
  let results = [];
  results.push(parseScoreString(scoreStrings[0]));
  results.push(parseScoreString(scoreStrings[1]));
  return results;
};