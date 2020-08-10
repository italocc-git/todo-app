import React from 'react'
import If from './If'
export default props => (
    /* 2 versao */
    <If test={!props.hide}>
        <button className={'btn btn-'+ props.style} 
            onClick={props.onClick}>
            <i className={'fa fa-'+ props.icon}></i>
        </button>
    </If>
    )
    



/* 1º Versão

    if(props.hide){
        return null
    }else{
        return(
            <button className={`btn btn-${props.style}`}
            onClick={props.onClickPai} >
                <i className={`fa fa-${props.icon}`}></i>
            </button>
        )
    }
}
*/