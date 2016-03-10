var ko = false, lastMove = false; // ko coordinate and last move coordinate
var curPlayer = JGO.BLACK;
var jboard, jsetup;
var lastHover = false, lastX = -1, lastY = -1; // hover helper vars

// Create a board and configure hover
function createGuessingBoard() {
    jboard = new JGO.Board(19);
    jsetup = new JGO.Setup(jboard, JGO.BOARD.medium);
    jsetup.setOptions({stars: {points:9}});
    jsetup.create('board', function(canvas) {

      canvas.addListener('click', function(coord, ev) {
        jboard.setMark(coord, '1');
        lastHover = false;
      });

      canvas.addListener('mousemove', function(coord, ev) {
        if(coord.i == -1 || coord.j == -1 || (coord.i == lastX && coord.j == lastY))
          return;

        if(lastHover) // clear previous hover if there was one
          jboard.setMark(new JGO.Coordinate(lastX, lastY), JGO.MARK.NONE);

        lastX = coord.i;
        lastY = coord.j;

        if(jboard.getType(coord) == JGO.CLEAR && jboard.getMark(coord) == JGO.MARK.NONE) {
          jboard.setMark(coord, JGO.MARK.CROSS);
          lastHover = true;
        } else
          lastHover = false;
      });

      canvas.addListener('mouseout', function(ev) {
        if(lastHover)
          jboard.setMark(new JGO.Coordinate(lastX, lastY), JGO.MARK.NONE);

        lastHover = false;
      });
    });
}

function addMove(coord, player) {
  var lastPlay = jboard.playMove(coord, curPlayer, ko);
  if(lastPlay.success) {
    var opponent = (curPlayer == JGO.BLACK) ? JGO.WHITE : JGO.BLACK;


    jboard.setType(coord, curPlayer); // play stone
    jboard.setType(lastPlay.captures, JGO.CLEAR); // clear opponent's stones

    if(lastMove)
      jboard.setMark(lastMove, JGO.MARK.NONE); // clear previous mark
    if(ko)
      jboard.setMark(ko, JGO.MARK.NONE); // clear previous ko mark

    jboard.setMark(coord, JGO.MARK.CIRCLE); // mark move
    lastMove = coord;

    if(lastPlay.ko)
      jboard.setMark(lastPlay.ko, JGO.MARK.SQUARE); // mark ko, too
    ko = lastPlay.ko;

    curPlayer = opponent;
    document.getElementById('playerturn').innerHTML = (curPlayer == JGO.BLACK) ? "Black" : "White";
  }
}
