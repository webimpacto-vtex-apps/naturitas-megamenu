const marginClass = (item) => {
    switch(item){
        case 'Right':
            return ' mr-lg-auto '
        case 'Left':
            return ' ml-lg-auto '
        case 'Center':
            return ' mx-lg-auto '
        default: 
            return ''
    }
}

export default marginClass