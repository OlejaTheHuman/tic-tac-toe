import React from "react";

function Cell({children, index, state, figure}){
    const [boardState, setBoardState] = state;
    const [figureState, changeFigure] = figure;

    const onClickFunc = () => {

        if(boardState[index] === ''){
        let board = boardState.slice();
        board[index] = figureState;
        setBoardState(board);
        changeFigure(figureState)
            console.log('clicked', index)
        }
    };

    return(
        <div onClick={onClickFunc} className="cell">
            {children}
        </div>
    );
}

export default Cell;