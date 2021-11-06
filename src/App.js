import React from "react";
import Cell from "./components/Cell";


let emptyBoard = [  'o','','x',
                    'o','','o',
                    '','x','o',
                 ];



/*let emptyBoard = [  '','','',
                    '','','',
                    '','','',
];*/


let goodResult = {};


let winCombinations = [
    '111000000',
    '000111000',
    '000000111',
    '100010001',
    '001010100',
    '010010010',
    '100100100',
    '001001001'
];

let aiFigure = 'o',
    huFigure = 'x';


function randomFigure(){
    return (Math.random() * (101 - 1) + 1).toFixed(0) % 2 === 0 ? aiFigure : huFigure;
}


function App() {
    const [boardState, setBoardState] = React.useState(emptyBoard);
    const [figure, setFigure] = React.useState('x');
    const [flag, setFlag] = React.useState(figure === aiFigure)

    function onClickFlag(state){
        setFlag(!state);
    }

    /*function emptyIndices(board){
        let boardCopy = board.slice();
        let result = [];
        while (boardCopy.includes('')){
            result.push(boardCopy.indexOf(''));
            boardCopy[boardCopy.indexOf('')] = '-';
        }
        return result;
    }
*/
    function emptyIndices(board) {
        return board.filter(s => s !== "x" && s !== "o");
    }

    function minMax(boardState, figure) {
        let board = boardState.slice();

        let emptyCells = emptyIndices(boardState); // Получаем массив клеток, в которые можно сходить
        for(let i = 0; i < board.length; i++){
            if(board[i] === ''){
                board[i] = i;
            }
        }

        if(winning(board, huFigure)){
            return {score: -10};
        }else if(winning(board, aiFigure)){
            return {score: 10};
        }else if(emptyCells.length === 0){
            return {score: 0};
        }

        // массив с ходами
        let moves = [];
        for(let i = 0; i < emptyCells.length; i++){
            let move = {};
            move.index = board[emptyCells[i]];
            board[emptyCells[i]] = figure;

            if(figure === aiFigure){
                let result = minMax(board, huFigure);
                move.score = result.score;
            }else{
                let result = minMax(board, aiFigure);
                move.score = result.score;
            }
            board[emptyCells[i]] = move.index;
            moves.push(move);

        }
        let bestMove;
        if(figure === aiFigure){
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }else{
            // иначе пройти циклом по ходам и выбрать ход с наименьшим количеством очков
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        // вернуть выбранный ход (объект) из массива ходов
        if (moves[bestMove].index !== undefined){
            goodResult = moves[bestMove]
            return moves[bestMove];
        }else {
            return goodResult;
        }
    }


    function winning(board, player) {
        if (
            (board[0] == player && board[1] == player && board[2] == player) ||
            (board[3] == player && board[4] == player && board[5] == player) ||
            (board[6] == player && board[7] == player && board[8] == player) ||
            (board[0] == player && board[3] == player && board[6] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) ||
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[0] == player && board[4] == player && board[8] == player) ||
            (board[2] == player && board[4] == player && board[6] == player)
        ) {
            return true;
        } else {
            return false;
        }
    }

    function isWin (board, figure){
        let combination;
        for(let i = 0; i < winCombinations.length; i++){
            combination = winCombinations[i].split('');
            let index;
            let result = [];
            for(let j = 0; j < 3; j++){
              index = combination.indexOf('1');
              if(boardState[index] === figure){
                  result.push(true);
              }else if(boardState[index] !== figure){
                  result.push(false);
              }
              combination[index] = 0;
            }
            if(!result.includes(false)) {
              return true;
            }
        }
    }


    React.useEffect(()=>{
        let copyBoard = boardState.slice()
        if(figure === huFigure) {
            setFlag(true);
        }
        if(flag){
            //console.log('copyBoard', copyBoard);
            let result = minMax(copyBoard, figure);
            //console.log('result', result);
            copyBoard[result.index] = aiFigure;
            //console.log('copyBoard 2', copyBoard);
            setBoardState(copyBoard);
            //console.log('boardState', boardState);
            setFigure(figure === 'x' ? 'o' : 'x');
            onClickFlag(flag);
        }
    }, [boardState]);

    React.useEffect(()=>{
            //  Вот это костылище... В state figure лежит следующее значение фигуры,
            //  поэтому для проверки приходится менять его обратно :/
            //  TODO исправить это. Но нет ничего более вечного, чем временное 🧐
            let actualFigure = figure === 'x' ? 'o' : 'x';
            if(isWin(boardState, actualFigure)){
                console.log(actualFigure, ' is winner!');
                alert(`${actualFigure} is winner!`);
                setBoardState(emptyBoard);
            }else if(!boardState.includes('')){
                alert('So... try one more time');
                setBoardState(emptyBoard);
            }
        }
        ,[boardState]);

    function changeFigure(figure){
       setFigure(figure === 'x' ? 'o' : 'x');
       return figure
    }

  return (
    <div className="board">
        {boardState.map((item, index) => <Cell
            index={index}
            figure={[figure, changeFigure]}
            state={[boardState, setBoardState]}
            key={`${item}_${index}`}
        >{item}
        </Cell>)}
    </div>
  );
}

export default App;
