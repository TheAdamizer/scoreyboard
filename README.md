# scoreyboard: A simple soccer league scorer
[![CircleCI](https://circleci.com/gh/TheAdamizer/scoreyboard.svg?style=svg)](https://circleci.com/gh/TheAdamizer/scoreyboard)
[![codecov](https://codecov.io/gh/TheAdamizer/scoreyboard/branch/master/graph/badge.svg?token=YKrehvJB0z)](https://codecov.io/gh/TheAdamizer/scoreyboard)

### Installation:
    1. Install node: https://nodejs.org/en/

    2a. Install package globally with `npm i -g scoreyboard` or
  
    2a. Download repo directly, run `npm install` and then run `node ./bin/index.js` from the base directory


### Usage:
  ##### Without any parameters:
  `$ scoreyboard`
  
  Will look for ./sample-input.txt in the scoreyboard directory.  If not found, will default to listening to scores piped in from STDIN
  For example `$ cat "./sample-input.txt" | scoreyboard`
  
  
  ##### With one parameter:
  `$ scoreyboard "./sample-input.txt"`
  
  Will read the game scores from the specified file directly


### Testing:
  `$ npm run test`
