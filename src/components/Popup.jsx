import React from "react";
import bender from '../images/futurama_PNG76.png'

function Popup(){
    const [popupState, setPopupState] = React.useState(false)

    function onClickPopup(state){
        setPopupState(!state);
    }

    return(
        <div className={`popup ${popupState ? 'none' : ''}`}>
            <img className='bender' src={bender} alt="bender"/>
            <div className="popup__content">
                <p>
                    Привет, человек
                    <br/>Ты пришел сыграть?
                    <br/>Ха-ха<br/>
                    Удачи, мясной!
                </p>
                <div onClick={()=>onClickPopup(popupState)} className="popup__button">
                    Начать!
                </div>
            </div>
        </div>
    );
}

export default Popup;