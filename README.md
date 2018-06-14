
<h2>BattleBlocks!</h2>
<h3>'Wack-a-mole Meets Chess'<h3>

This is a one-of-a-kind game, we invented it for this project, and it doesn't exist anywhere else.

This is a Northwestern University Bootcamp Final MERN Project

### Synopsis
<ul>
  <li>BattleBlocks is a 2-player strategy board game</li>
  <li>To earn points, you have to clear blocks off of your side</li>
  <li>When you clear a block, it appears randomly on your opponents side</li>
  <li>The rounds are played in realtime, so of course your opponent is trying to clear their side at the same time</li>
  <li>The game is played in "rounds" between two players, typical rounds last 8-10 minutes</li>
  <li>Your points are accumulated and last forever, so the top point holders are on the top of the Leaderboard</li>
</ul>
<br>
There are two wrinkles that make the game interesting....
<ol>
  <li>The computer randomly intervenes, reducing the number of blocks creating scarcity</li>
  <li>There is a currency in the game, called $BlockCoins$, which you must use to pay to remove blocks</li>
</ol>
<br>
<h3>Detailed Game Play</h3>
<hr>

<strong>Object of Game</strong>
<ul>
  <li>The game is played in "rounds"; each round begins with two players, "Host" on the left and "Guest" on the right</li>
  <li>The object of each round is to earn "Points" by removing blocks. It is a game of speed and strategy</li>
  <li>Game play continues until one player clears their board or somebody gives up</li>
</ul>

<strong>Board Setup</strong>
<ul>
  <li>42 blocks are randomly distributed on the board, 21 on each side</li>
  <li>Every time a block moves sides, it appears in a randomized location</li>
  <li>Every few moves, the computer randomly removes a block</li>
</ul>

<strong>Game Play</strong>

Each player can only click on the blocks on their respective sides to "move" them to the opposite side

There are no turns, gameplay is <strong>realtime</strong> so players can click on as many blocks as they have $BlockCoins$

Moving a block has 3 possible effects:
<ol>
  <li>If the move happens from the "high side" of the board, the block moves, and the player <strong>earns 1 $BlockCoin$</strong></li>
  <li>If the move happens on the "low side" of the board, the block moves, and the player <strong>spends 1 $BlockCoin$</strong> (if the player doesn't have any coins, they can't move any blocks)</li>
  <li>If the player has 3 or fewer blocks, the block moves, and the player will <strong>earn POINTS</strong></li>
</ol>

Points are earned in the following denominations:
<ul>
  <li>1 pt - for clicking the 3rd-to-last block on your side</li>
  <li>2 pts - for clicking the 2nd-to-last block on your side</li>
  <li>3 pts - for clicking the last block on your side</li>
</ul>

<strong>Winning or Ending Game</strong>

Each round ends in one of two ways:
<ol>
  <li>A player successfully clicks on the <strong>last</strong> block on their side and "clears" their board</li>
  <li>A player quits the round by clicking "Lobby"</li>
</ol>

Continual Play
<ul>
  <li>Each player has a login and accrues points indefinitely from round-to-round</li>
  <li>High scoring players appear on the "Wall of Fame" in the leaderboard section of the site</li>
  <li>$BlockCoins$ are only useful in the round in which they were earned, and do not persist to future games</li>
</ul>

<hr>

## Try It
+ [Live](https://battle-blocks.herokuapp.com/)

### Built With
+ [Mongo](https://www.mongodb.com/)
+ [Express JS](https://expressjs.com/)
+ [React JS](https://reactjs.org/)
+ [Node JS](https://nodejs.org/en/)
+ [Bootstrap 4](https://getbootstrap.com/)
+ [Mongoose](http://mongoosejs.com/)
+ [Firebase](https://firebase.google.com/)
+ [Passport JS](http://www.passportjs.org/)

### Node Package Dependencies Reference
+ [axios](https://www.npmjs.com/package/axios)
+ [bcryptjs](https://www.npmjs.com/package/bcryptjs)
+ [body-parser](https://www.npmjs.com/package/body-parser)
+ [connect-mongodb-session](https://www.npmjs.com/package/connect-mongodb-session)
+ [express](https://www.npmjs.com/package/express)
+ [express-session](https://www.npmjs.com/package/express-session)
+ [express-validator](https://www.npmjs.com/package/express-validator)
+ [firebase](https://www.npmjs.com/package/firebase)
+ [mongoose](https://www.npmjs.com/package/mongoose)
+ [multer](https://www.npmjs.com/package/multer)
+ [passport](https://www.npmjs.com/package/passport)
+ [passport-local](https://www.npmjs.com/package/passport-local)
+ [re-base](https://www.npmjs.com/package/re-base)
+ [react](https://www.npmjs.com/package/react)
+ [react-dom](https://www.npmjs.com/package/react-dom)
+ [react-dropzone](https://www.npmjs.com/package/react-dropzone)
+ [react-json-table](https://www.npmjs.com/package/react-json-table)
+ [react-modal](https://www.npmjs.com/package/react-modal)
+ [react-router-dom](https://www.npmjs.com/package/react-router-dom)
+ [react-scripts](https://www.npmjs.com/package/react-scripts)
+ [react-table](https://www.npmjs.com/package/react-table)
+ [react-transition-group](https://www.npmjs.com/package/react-transition-group)
+ [react-transitions](https://www.npmjs.com/package/react-transitions)
+ [reactstrap](https://www.npmjs.com/package/reactstrap)
+ [router](https://www.npmjs.com/package/router)

### Contributors
+ [Brett Barnes](https://github.com/bigbert836)
+ [Israel Peck](https://github.com/therealizzi)
+ [Peter Peck](https://github.com/ptpeck357)
+ [Vinnie Sharma](https://github.com/vasmarm)

### License
+ Open Source

