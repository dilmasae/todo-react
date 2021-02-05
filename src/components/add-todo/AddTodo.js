import React, { useState } from "react";
import ReactDOM from 'react-dom';

const AddTodo = (props) => {

    const show = props.show ?? false;
    const [text, setText] = useState("");

    const _hideModal = () => {
        setText("");
        props.closeModal();
    }

    
    if(!props.show) {
        return null;
    }

    return ReactDOM.createPortal(
        <form 
            className="modal fade show d-block"
            tabIndex="-1" 
            aria-labelledby="exampleModalLabel" 
            aria-hidden="true" 
            style={{backgroundColor: "rgba(0, 0, 0, .5)"}}
            onSubmit={ (e) => {
                e.preventDefault();
                props.addTodo(text)
                _hideModal();
            }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{ props.title }</h5>
                    <button 
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => _hideModal()}
                    >
                    </button>
                </div>
                <div className="modal-body">
                    <input 
                        className="form-control" 
                        type="text" 
                        required
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value)
                        }}
                    />
                </div>
                <div className="modal-footer">
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        data-bs-dismiss="modal"
                        onClick={() => _hideModal()}
                    >
                        Close
                    </button>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >
                        Save changes
                    </button>
                </div>
                </div>
            </div>
        </form>
    , document.getElementById('modal'));
}

export default React.memo(AddTodo);