import React,{Component} from 'react'
import Grid from '../template/grid'
import {connect} from 'react-redux'
import IconButton from '../template/iconButton'
import {bindActionCreators} from 'redux'
import {changeDescription , search , add, clear} from './todoActions'

class TodoForm extends Component{
    constructor(props){
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
        
    }
    


    keyHandler(e){
        const {add,search,description,clear} = this.props
        if(e.key === 'Enter'){
            e.shiftKey ? search(description) : add(description)
        }
        else if(e.key === 'Escape'){
            clear()
        }
    }
    //Metodo que é suportado somente em classes ,
    //Faz com que seja executado antes do componente ser renderizado
    componentWillMount(){

        this.props.search(this.props.description)
    }
    
    render() {
        const {add,search,description, changeDescription, clear} = this.props
        return(
            <div role='form' className='todoForm'>
                <Grid cols='12 9 10'>
                    <input id='description' className='form-control'
                        placeholder='Adicione uma tarefa'
                        onChange={changeDescription}
                        onKeyUp= {this.keyHandler}
                        
                        value={description}></input>
                </Grid>
                <Grid cols='12 3 2'>
                    <IconButton style='primary' icon='plus'
                        onClick={() => add(description)}></IconButton>
                    <IconButton style='info' icon='search'
                        onClick={() => search(description)}></IconButton>
                    <IconButton style='default' icon='close'
                        onClick={clear}></IconButton>    
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return (
        {description : state.todo.description}
    )
}

function mapDispatchToProps(dispatch) {
     return ( 
         bindActionCreators({changeDescription,search,add,clear}, dispatch)
     )
}
    //Dispatch responsavel por disparar as actions
   


export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)