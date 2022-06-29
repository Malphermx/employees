export function onlyNumber (event:any){
    if (event.which != 8 && event.which != 0 && (event.which < 48 || event.which > 57) ){
        event.preventDefault();
    }
}

export function onlyLetter (event:any) {
    
    let key = event.keyCode || event.which;
    let tecla = String.fromCharCode(key).toLowerCase();
    let letras =  "\u00e1" + "\u00e9" +"\u00ed"+ "\u00f3"+"\u00fa"+"\u00f1"+" abcdefghijklmnopqrstuvwxyz";
    let especiales:any= "8-37-39-46";
    
    let tecla_especial = false;
    for(var i in especiales){
        if(key == especiales[i]){
            tecla_especial = true;
            break;
        }
    }

    if(letras.indexOf(tecla)==-1 && !tecla_especial){
        event.preventDefault();
    }
}


export function onlyLetterNumber (event:any) {
    let key = event.keyCode || event.which;
    let tecla = String.fromCharCode(key).toLowerCase();
    let letras =  "\u00e1" + "\u00e9" +"\u00ed"+ "\u00f3"+"\u00fa"+"\u00f1"+" abcdefghijklmnopqrstuvwxyz0123456789";
    let especiales:any = "8-37-39-46";

    let tecla_especial = false;
    for(var i in especiales){
        if(key == especiales[i]){
            tecla_especial = true;
            break;
        }
    }

    if(letras.indexOf(tecla)==-1 && !tecla_especial){
        event.preventDefault();
    }
}