import React from "react";

const Todo = (props) => {

    const text = props.todo.title;
    const id = props.todo.id;

    return(
        <div className="container">
           <div className="card">
                <div className="card-body d-flex justify-content-between">
                    <p className="card-text">
                        { text }    
                    </p>
                    <button className="btn btn-outline-danger">X</button>
                </div>
            </div>
        </div>
    );
}

export default React.memo(Todo);