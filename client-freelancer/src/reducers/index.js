import {ADD_TODO, DONE_TODO} from "../actions/index";

// https://github.com/reactjs/react-redux/blob/d5bf492ee35ad1be8ffd5fa6be689cd74df3b41e/src/components/createConnect.js#L91
const initialState = {
        "Do laundry" : 'active',
        "Empty trash" : 'active'
};

const todos = (state = initialState, action) => {


    switch (action.type) {
        case ADD_TODO :
           return {
               ...state,
               [action.newItem] : 'active'
           };

        case DONE_TODO :
            return {
                ...state,
                [action.changedTodo] : 'done'
            };

        default :
            return state;

    }
};

export default todos;