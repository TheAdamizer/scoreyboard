# scoreyboard: A simple soccer league scorer

### Installation:
    1. Install node: https://nodejs.org/en/
  
    2a. Download repo directly and run `node ./index.js` from the base directory or
  
    2b. Install package globally with `npm i -g scoreyboard`


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
