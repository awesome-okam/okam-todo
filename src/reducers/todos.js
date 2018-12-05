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
    let newArr = [].concat(state);
    newArr.unshift(todo);
    return newArr;
};

const editTodo = (state, {todo, id}) => {
    let found = findById(state, id);
    if (found === -1) {
        return state;
    }

    let newArr = [].concat(state);
    let curr = state[found];
    newArr[found] = Object.assign({}, curr, todo);
    return newArr;
};

const removeTodo = (state, {id}) => {
    let found = findById(state, id);
    if (found === -1) {
        return state;
    }

    let newArr = [].concat(state);
    newArr.splice(found, 1);
    return newArr;
};

const toggleTodo = (state, {id}) => {
    let found = findById(state, id);
    if (found === -1) {
        return state;
    }

    let newArr = [].concat(state);
    let curr = state[found];
    newArr[found] = Object.assign({}, curr, {completed: !curr.completed});
    return newArr;
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
