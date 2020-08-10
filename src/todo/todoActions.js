import axios from 'axios'
const URL = 'http://localhost:3003/api/todos'

export const changeDescription = event => {
    return({
        type: 'DESCRIPTION_CHANGED',
        //dados que serão alterados , pode ser outro nome no lugar de payload
        payload : event.target.value
    })
}


export const search  = (description) => {
    const search = description ? `&description__regex=/${description}/` : '' 
    const request = axios.get(`${URL}?sort=-createdAt${search}`)
    return {
        type: 'TODO_SEARCHED',
        payload : request //resultado da requisição assincrona
    }
}

/* export const add = (description) => {
    const request = axios.post(URL, {description : description})  //Lá no banco de dados , possui um campo chamado description .
    return [
        {type : 'TODO_ADDED',payload : request},
        search()
    ]

    //Obs: Exemplo do Redux Multi que permite disparar várias actions, mas sem ordem(em paralelo sem esperar a primeira action)
} */

export const add = (description) => {
    return function (dispatch)  {
        axios.post(URL , {description : description})
            .then(resp => dispatch(clear()))
            .then(_ => dispatch(search()))
    } //DEssa maneira o axios funciona , a action tem q esperar ser adicionada para depois fazer o search
}

export const markAsDone = (todo,description) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, {...todo , done : true})
        //DESNECESSARIO .then(resp => dispatch( { type:'TODO_MARK_AS_DONE', payload: resp.data }))
        .then(_ => dispatch(search(description))) 
        //Espera a primeira action ser concluida para chamar a proxima que é a função search
    }
}

export const markAsPending = (todo,description) => {

    return dispatch => {
        axios.put(`${URL}/${todo._id}`, {...todo, done : false})
        // DESNECESSARIO.then(resp => dispatch({type : 'TODO_MARK_AS_PENDING', payload: resp.data}))
        .then(_ => dispatch( search(description)))
    }
}

export const remove = (todo,description) => {

    return function (dispatch)  {
        axios.delete(`${URL}/${todo._id}`)
        .then(resp => dispatch(search(description)))
    }
}

export const clear = () =>{
    return [{ type:'TODO_CLEAR' },search()]
} 