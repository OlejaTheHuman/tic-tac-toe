import React from "react";
import Cell from "./components/Cell";

let emptyBoard = [  '','','',
                    '','','',
                    '','','',
];

let aiFigure = 'o',
    huFigure = 'x';


function randomFigure(){
    return (Math.random() * (101 - 1) + 1).toFixed(0) % 2 === 0 ? aiFigure : huFigure;
}


function App() {
    const [boardState, setBoardState] = React.useState(emptyBoard);
    const [figure, setFigure] = React.useState(randomFigure);

    function changeFigure(figure){
        setFigure(figure === 'x' ? 'o' : 'x');
        return figure
    }

    function emptyIndices(board) {
        return board.filter(s => s !== "x" && s !== "o");
    }

    function minMax(board, figure) {

        let emptyCells = emptyIndices(board); // Получаем массив клеток, в которые можно сходить


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

        let everyMoves = moves.slice();

        let bestMove;
        if(figure === aiFigure){
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++){
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }else {
            // иначе пройти циклом по ходам и выбрать ход с наименьшим количеством очков
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        // Если Алгоритм ходит первым, то ставим нолик в центр
        let iter = 0;
        everyMoves.map((obj) => {
            if (obj.score === 0){
                iter++
            }})
        if(iter === 9){
            return {index: 4, score: 10};
        }

       return moves[bestMove];
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


    React.useEffect(()=>{
            //  Вот это костылище... В state figure лежит следующее значение фигуры,
            //  поэтому для проверки приходится менять его обратно :/
            //  TODO исправить это. Но нет ничего более вечного, чем временное 🧐
            let actualFigure = figure === 'x' ? 'o' : 'x';
            if(winning(boardState, actualFigure)){
                console.log(actualFigure, ' is winner!');
                alert(`${actualFigure} is winner!`);
                setBoardState(emptyBoard);
            }else if(!boardState.includes('')){
                alert('So... try one more time');
                setBoardState(emptyBoard);
            }
        }
    ,[boardState]);

    React.useEffect(() => {
        let copyBoard = boardState.slice();
        for(let i = 0; i < copyBoard.length; i++){
            if(copyBoard[i] === ''){
                copyBoard[i] = i;
            }
        }
        let result = minMax(copyBoard, aiFigure).index;
        if(figure === aiFigure){
            let temp = boardState.slice();
            console.log('result', result)
            temp[result] = aiFigure;
            setBoardState(temp);
            changeFigure(figure)
        }
    }, [figure])

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
