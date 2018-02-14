
<h2>BattleBlocks!</h2>
A Northwestern University Bootcamp Final MERN Project
<hr>
<strong>Summary</strong>
<ul>
  <li>BattleBlocks is a multi-player strategy board game</li>
  <li>The game is played in "rounds" between two players</li>
  <li>The <strong>Main Player</strong> is on the left, and <strong>Opponent</strong> is on the right</li>
  <li>The object of the game is to earn points in each round and make it onto the Leaderboard</li>
  <li>Your points are accumulated and last forever, so the top point holders are on the Leaderboard</li>
  <li>To earn points, you have to try to clear the blocks on your side</li>
  <li>The rounds are played in realtime, so course your opponent is trying to clear the blocks on their side at the same time</li>
</ul>
<br>
There are two wrinkles that make the game interesting....
<ol>
  <li>The computer randomly intervenes </li>
  <li>There is a currency in the game, called $BlockCoins$, which you need in order to earning points</li>
</ol>
<br>
<h3>Detailed Game Play</h3>
<hr>

<strong>Object of Game</strong>
<ul>
  <li>The game is played in "rounds"; each round begins with two players, one on the left and one on the right</li>
  <li>The object of each round is to earn "Points" by clicking blocks. It is a game of speed and strategy</li>
  <li>Game play continues until one player clears their board or somebody gives up</li>
</ul>

<strong>Board Setup</strong>
<ul>
  <li>11 blocks are randomly distributed on the board, 6 on one side and 5 on the other</li>
  <li>The computer is set on a timer, every 3 seconds it moves a random block from the "high side" to the "low side"</li>
  <li>Every time a block moves sides, it appears in a randomized location</li>
</ul>

<strong>Game Play</strong>

Each player can click on the blocks on their respective sides to "move" them to the opposite side

There are no turns, gameplay is <strong>realtime</strong> so players can click on as many blocks as they want

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

The game is played in "rounds", and each round ends in one of two ways:
<ol>
  <li>A player successfully clicks on the last block on their side and "clears" their board</li>
  <li>A player quits the round by clicking "End Game"</li>
</ol>

Continual Play
<ul>
  <li>Each player has a login and accrues points indefinitely from round-to-round</li>
  <li>High scoring players appear on the "Wall of Fame" in the leaderboard section of the site</li>
  <li>$BlockCoins$ are only useful in the round in which they were earned, and do not persist to future games</li>
  <li>It is not common for players to clear the board completely, so rounds usually end when a player clicks "End Game"</li>
</ul>

<hr>

## Contributors
+ [Brett Barnes](https://github.com/bigbert836)
+ [Israel Peck](https://github.com/therealizzi)
+ [Peter Peck](https://github.com/ptpeck357)
+ [Vinnie Sharma](https://github.com/vasmarm)

<strong>END Of README</strong>