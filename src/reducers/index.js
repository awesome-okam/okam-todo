/**
 * @file redux root reducer
 * @author xxx
 */

import {combineReducers} from 'redux';
import todos from './todos';

export default combineReducers({
    todos
});
