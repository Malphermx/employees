import { IoCloseOutline } from 'react-icons/io5'
import { OverlayUI } from "./overlayUI"
import { onlyLetter, onlyNumber } from '../../utils/inputRules'
import IconUI from "./iconUI"
import { useState } from 'react'
import Loader from './loaderUI'
import { services } from '../../services/api'

const PopUpUI = (props:any) => {
    const [state, setState] = useState({
        loading:false,
        error:false,
        errorText:""
    })
   const handleAddEmployee = async (event:any ) => {
        event.preventDefault();
        setState({...state, loading:true})
        let form = event.currentTarget;

        let body = {
            // data:{
              name:"",
              last_name:"",
              birthday:"",
            // }
          };
      
          body.name = form.elements["name"].value
          body.last_name = form.elements["apellidos"].value
          body.birthday = form.elements["date"].value

      
          let regExpText = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;

          let tempNombre = body.name.trim();
          let tempApellidos = body.last_name.trim();
          let tempFecha = body.birthday
      
          let isInvalidNombre = !regExpText.test(tempNombre);
          let isInvalidApellidos = !regExpText.test(tempApellidos);

          if (!tempNombre || !tempApellidos || !tempFecha) {
            setState({ ...state, loading: false ,error:true, errorText:"Complete todos los campos para continuar."});
            return;
          } else if (isInvalidNombre) {
            setState({ ...state, loading: false ,error:true, errorText:"El campo nombre solo puede contener espacios y letras."});
            return;
          } else if (isInvalidApellidos) {
            setState({ ...state, loading: false ,error:true, errorText:"El campo Apellidos solo puede contener espacios y letras."});
            return;
          }
          console.log(JSON.stringify(body))
          const response_Addemploye:any = await services("POST", "examen/employees/christopher",body);
          console.log(response_Addemploye)
          if(response_Addemploye.status === 200){
            setState({...state, loading:false, })
            props.onClose()
            return
          }
          setState({...state,loading:false , error:response_Addemploye.response})
   } 
  return (
    <>
        <OverlayUI type={'black'} onClick={()=>{props.onClose()}}></OverlayUI>
        <div className='popUp'>
            <div className="d-flex">
                <div className='text--medium text--verde text--bold'> Agregar Nuevo Empleado</div>
                <div className="col"></div>
                <div className="cursor-pointer" onClick={()=>{props.onClose()}}>
                    <IconUI size={'20px'}>
                        <IoCloseOutline/>
                    </IconUI>
                </div>
            </div>
            <div className='my-3'>
                <div className='text text--red my-2 text-center'>{state.errorText}</div>
                {state.loading?
                    <Loader></Loader>
                :
                    <form autoComplete="off" className="w-100" onSubmit={handleAddEmployee} id="addEmploye_form">
                        <div className="d-flex flex-column justify-content-center align-items-center my-3 w-100">
                            <div className="form-group">
                                <input 
                                type="text"
                                maxLength={30} 
                                className="form-input" 
                                placeholder="Nombre(s)*" 
                                name="name" 
                                id='name'
                                autoComplete="false"
                                onKeyPress={onlyLetter} 
                                />
                                <label htmlFor="name" className="form-label">Nombre(s)*</label>
                            </div>
            
                            <div className="form-group">
                                <input 
                                type="text"
                                maxLength={30} 
                                className="form-input" 
                                placeholder="Apellido(s)*" 
                                name="apellidos" 
                                id='apellidos'
                                autoComplete="false"
                                onKeyPress={onlyLetter} 
                                />
                                <label htmlFor="apellidos" className="form-label">Apellido(s)*</label>
                            </div>
            
                            <div className="form-group d-flex justify-content-center">
                                <input 
                                    type='date'
                                    name="date"
                                    id="date"
                                    className='form-input w-50 w-md-75' 
                                    placeholder='Teléfono 10 digitos*'
                                />
                                <label htmlFor="date" className="form-label">Fecha de Nacimiento</label>
                            </div>
            
                            <div className='my-3'>
                                <input
                                    type="submit"
                                    value="FINALIZAR REGISTRO"
                                    className="btn w-100 mt-2"
                                ></input>
                            </div>
                    
                        </div>
                    </form>
                }
            </div>
        </div>
    </>
  )
}

export default PopUpUI
