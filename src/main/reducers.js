import {combineReducers} from 'redux'
import todoReducer from '../todo/todoReducer'
const rootReducer = combineReducers({ //recebe um objeto com todos os reducers
    todo :  todoReducer
})

export default rootReducer