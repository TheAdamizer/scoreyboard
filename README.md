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
  
  Will listen to scores piped in from STDIN
  For example `$ cat "./sample-input.txt" | scoreyboard`
  
  
  ##### With a file path:
  `$ scoreyboard "./sample-input.txt"`
  
  Will read the game scores from the specified file directly

  ##### With the sample param:
  `$ scoreyboard --sample`

  Will read the game scores from the original sample file


### Testing:
  `$ npm run test`
