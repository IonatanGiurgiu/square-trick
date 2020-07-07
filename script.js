color0 = "blue";
color1 = "green";

window.addEventListener("DOMContentLoaded", function() {
    let boxes = document.querySelectorAll(".box");
  
    Array.from(boxes, function(box) {
      box.addEventListener("click", function() {
        id = "b" + this.classList[1];
        var element = document.getElementById(id);
        boxState = element.innerHTML;
        if (boxState == 0) {
            element.innerHTML = 1;
            element.style.backgroundColor = color1;
        } else {
            element.innerHTML = 0;
            element.style.backgroundColor = color0;
        }
      });
    });
  });


  function randomize(n) {
    for(i = 1; i <= n; i++) {
        id = "b" + i.toString();
        var element = document.getElementById(id);
        val = Math.round(Math.random());
        if (val == 0) {
            element.innerHTML = 0;
            element.style.backgroundColor = color0;
        } else {
            element.innerHTML = 1;
            element.style.backgroundColor = color1;
        }
    }
  }

  function read(n) {
    board = [];
    line = [];
    for(i = 1; i <= n*n; i++) {
        line.push(parseInt(document.getElementById("b" + i.toString()).innerHTML));
        if (i % n == 0) {
            board.push(line);
            line = [];
        }
    }
    list_binary = [];

    xlessthan = parseInt(Math.log2(n));
    for (twice = 0; twice < 2; twice++){
        for (x = 0; x < xlessthan; x++){
            check_even = 0;
            rowend = parseInt(n/2**(x+1));
            for (row = 0; row < rowend; row++){
                for (col = 0; col < n; col++){
                    for (jump = 0; jump < 2**x; jump++){
                        if (board[row+jump*parseInt((n/2**x))][col] == 1){
                            check_even += 1;
                        }
                    }
                }
            }
            if (check_even % 2 == 0) {
                list_binary.push(1);
            } else {
                list_binary.push(0);
            }
        }
        if (twice == 0){
            board = transpose(board);
        }
    }
 
    decimal = n*n;
    for (i=0; i<xlessthan*2; i++) {
        decimal -= list_binary[i] * 2 ** (xlessthan*2-1-i);
    }

    square = document.getElementById("b" + decimal.toString());
    square.style.backgroundColor = "gold";
  }

  function transpose(matrix) {
    const rows = matrix.length, cols = matrix[0].length;
    const grid = [];
    for (let j = 0; j < cols; j++) {
      grid[j] = Array(rows);
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[j][i] = matrix[i][j];
      }
    }
    return grid;
  }