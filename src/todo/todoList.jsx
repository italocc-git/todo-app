import React from 'react'
import IconButton from '../template/iconButton'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {markAsDone, markAsPending , remove} from './todoActions'

const TodoList = props => {

    const renderRows = () => {
        const description = props.description
        const list = props.list || []
        return list.map(todo => (
            <tr key={todo._id}>
                <td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
                <td>
                    <IconButton style='success' icon='check' hide={todo.done}
                        onClick={() => props.markAsDone(todo,description)}></IconButton>
                    <IconButton style='warning' icon='undo' hide={!todo.done} 
                        onClick={() => props.markAsPending(todo,description)}></IconButton>
                    <IconButton style='danger' icon='trash-o' hide={!todo.done} 
                        onClick={() => props.remove(todo,description)}></IconButton>
                </td>
            </tr>
        ))
    }
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className='tableActions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

function mapStateToProps(state) {
    return(
        {list : state.todo.list,
        description : state.todo.description}
    )
}

function mapDispatchToProps(dispatch) {
    return (
        bindActionCreators({markAsDone,markAsPending,remove}, dispatch)
    )
}


export default connect(mapStateToProps,mapDispatchToProps)(TodoList)