import React, { useEffect, useState } from "react";
import _ from 'lodash';
import Todo from '../todo/Todo';
import AddTodo from '../add-todo/AddTodo';

const TodoList = (props) => {

    const [showAddTodo, setShowAddTodo] = useState(false);
    const [todo, setTodo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchAllTodos();
    }, []);

    async function fetchAllTodos() {
        setIsLoading(true);
        try {

            setTimeout(async () => {
                const result = await fetch("https://jsonplaceholder.typicode.com/todos/");
                const data = await result.json();
                setTodo(data);
                setIsLoading(false);
            }, 2000);
        }
        catch(error) {
            setIsLoading(false);
        }
    };

    function renderTodos() {
        if (isLoading) {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        }
        const todos = todo.map(item => {
            return <Todo key={ item.id } todo={ item } />
        });

        return (
            <div>
                { todos }
            </div>
        );
    }

    const _showAddTodo = () => {
        setShowAddTodo(true);
    }

    const _hideAddTodo = () => {
        setShowAddTodo(false);
    }
    
    const _addTodo = (text) => {
        const id = _.uniqueId("todo_");
        const newTodo = {
            userId : 1,
            id: id,
            title: text,
            completed: false
        };

        setTodo([newTodo, ...todo]);
    };
    return(
        <div className="container">
            <div className="d-flex justify-content-between pb-3"> 
                <h2 className="h3">TODO List</h2>
                <button 
                    type="button"
                    className="btn btn-primary"
                    onClick={_showAddTodo}
                >
                    Add Todo
                </button>
                <AddTodo 
                    title="Add modal"
                    show={showAddTodo}
                    closeModal={_hideAddTodo}
                    addTodo={_addTodo}
                />
            </div>
           { renderTodos() }
        </div>
    );
}

export default React.memo(TodoList);