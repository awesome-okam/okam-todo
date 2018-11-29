/**
 * @file counter reducers
 * @author xxx
 */

import {
    ADD_TODO,
    EDIT_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    FETCH_TODOS
} from '../constants/todo';

import createReducer from './utils';

function findById(todos, id) {
    let found = -1;
    todos.filter((item, index) => {
        if (item.id === id) {
            found = index;
            return true;
        }
        return false;
    });
    return found;
}

const addTodo = (state, {todo}) => {
    state.unshift(todo);
    return state;
};

const editTodo = (state, {todo, id}) => {
    let found = findById(state, id);
    if (found === -1) {
        return state;
    }

    let curr = state[found];
    Object.assign(curr, todo);
    return state;
};

const removeTodo = (state, {id}) => {
    let found = findById(state, id);
    if (found === -1) {
        return state;
    }
    state.splice(found, 1);
    return state;
};

const toggleTodo = (state, {id}) => {
    let found = findById(state, id);
    if (found === -1) {
        return state;
    }

    let curr = state[found];
    Object.assign(curr, {completed: !curr.completed});
    return state;
};

const fetchTodos = (state, {isFetching, payload, isFail}) => {
    if (isFetching) {
        return state;
    }

    if (isFail) {
        return state;
    }

    let todos = (payload && payload.data) || [];

    return todos;
};

export default createReducer([], {
    [ADD_TODO]: addTodo,
    [EDIT_TODO]: editTodo,
    [REMOVE_TODO]: removeTodo,
    [TOGGLE_TODO]: toggleTodo,
    [FETCH_TODOS]: fetchTodos
});
