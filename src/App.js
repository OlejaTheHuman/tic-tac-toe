import React from "react";
import Cell from "./components/Cell";

let board = [   '','','',
                '','','',
                '','','',
            ];

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


function App() {
    const [boardState, setBoardState] = React.useState(board);
    const [figure, setFigure] = React.useState('x');

    function isWin (figure){
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
                  alert(`${figure} is win!`);
                  setBoardState(board);
                  return true;
              }
          }
    }

    React.useEffect(()=>{
            //  Вот это костылище... В state figure лежит следующее значение фигуры,
            //  поэтому для проверки приходится менять его обратно :/
            // TODO исправить это. Но нет ничего более вечного, чем временное 🧐
            let actualFigure = figure === 'x' ? 'o' : 'x';
            if(isWin(actualFigure)){
                console.log(actualFigure, ' is win!')
            }else if(!boardState.includes('')){
                alert('So... try one more time');
                setBoardState(board);
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
