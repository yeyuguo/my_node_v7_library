


function regular(reg){
    
    return function(str){
        return reg.exec(str)
    }
}

module.export = regular