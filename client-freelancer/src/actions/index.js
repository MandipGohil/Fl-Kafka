export const ADD_TODO = 'ADD_TODO';
export const DONE_TODO = 'DONE_TODO';


export function addTodo(newItem) {
    return {
        type : ADD_TODO,
        newItem                                // this is same as newItem : newItem in ES6
    }
}

export function doneTodo(changedTodo) {
    return {
        type : DONE_TODO,
        changedTodo
    }
}

