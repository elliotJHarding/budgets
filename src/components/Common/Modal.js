import React, {useContext} from "react";

export default function Modal({children, visible, setVisible}) {

    return (
        <div className={`modal__background ${visible ? '': 'hidden'}`} onClick={() => setVisible(false)}>
            <div className="modal" onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    )

}