import React from 'react'
import ReactDOM from 'react-dom'
import App from './main/app'
import {createStore , applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import reducers from './main/reducers'
import promise from 'redux-promise'
import multi from 'redux-multi' //Usar multi actions
import thunk from 'redux-thunk'
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ &&
 window.__REDUX_DEVTOOLS_EXTENSION__()

 //São três chamadas , começando da esquerda para a direita, 
 //O retorno da função é passada para a proxima chamada
const store = applyMiddleware(thunk,multi,promise)(createStore)(reducers,devTools) //Todo estado que será alterado , o store receberá esses dados
//Automaticamente aplica os middlewares

ReactDOM.render(
    // Provider provê a integração do react com o redux
    <Provider store={store}>
        <App/> 
    </Provider>,
     document.querySelector('#app'))