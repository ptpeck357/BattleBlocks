=======
<h2>BattleBlocks!</h2>
NU Bootcamp Final MERN Project
<br>
<ul>
  <li>BattleBlocks is a two-player strategy game, with blocks randomly distributed on two sides of the board</li>
  <li>The <strong>Main Player</strong> is on the left, and <strong>Opponent</strong> is on the right</li>
  <li>The object of the game is to earn points</li>
  <li>Your points are accumulated and last forever, so the top point holders are on the leaderboard</li>
  <li>To earn points, you have to click on the 3rd-to-last, 2nd-to-last, or last block on your side</li>
  <li>Of course your opponent is trying to click on the blocks on their side, to keep you from earning points</li>
</ul>
<br>
There are two wrinkles that make the game interesting....
<ul>
  <li>1) The computer randomly intervenes 
  <li>2) There is "money" in the game, which you can use to improve your chances of earning points
</ul>
<br>
<h3>Detailed Game Play</h3>
<hr>
<strong>Object of Game</strong>

<ul>
  <li>The game begins with two players, one on the left and one on the right.</li>
  <li>The object of the game is to earn "Points" by clicking blocks. It is a game of speed and strategy.</li>
  <li>Game play continues until one player clears their board or somebody gives up.</li>
</ul>

<strong>Board Setup</strong>

<ul>
  <li>11 blocks are randomly distributed on the board, 6 on one side and 5 on the other.</li>
  <li>The computer is set on a timer, every 3 seconds it moves a random block from the "high side" to the "low side".</li>
  <li>Every time a block moves sides, it appears in a randomized location.</li>
</ul>

<strong>Game Play</strong>

Each player can click on the blocks on their respective sides to "move" them to the opposite side.

Moving a block has 3 possible effects:
<ol>
  <li>If the move happens from the "high side" of the board, the block moves, and the player earns 1 $BlockCoin$ </li>
  <li>If the move happens on the "low side" of the board, the block moves, and the player spends 1 $BlockCoin$ (if the player doesn't have any coins, they can't move any blocks) </li>
  <li>If the player has 3 or fewer blocks, the block moves, and the player will earn <strong>POINTS</strong></li>
</ol>

Points are earned in the following denominations:
<ul>
  <li>1 pt - for clicking the 3rd-to-last block on your side</li>
  <li>2 pts - for clicking the 2nd-to-last block on your side</li>
  <li>3 pts - for clicking the last block on your side</li>
</ul>