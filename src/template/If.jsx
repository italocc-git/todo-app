import React from 'react'

export default props =>{
    /* Por questão de simplicidade e interpretação do codigo .
    Não irei adicionar esse componente  */

    if(props.test) {
        return props.children
    }
    else{
        return false
    }
}