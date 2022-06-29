import React, { useContext, useEffect, useState } from 'react'
import IconUI from "../components/ui/iconUI";
import { token } from '../services/api';
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../context/global'
import Loader from "../components/ui/loaderUI";

const Login = () => {

  const [text, setText] = useState("this text will be copied or cut");
  const {global,setGlobal, _logOut} = useContext(GlobalContext)

  const history = useHistory()
  const [state, setState] = useState({
    loading:false,
    eye:false,
    passRecovery:false,
    error:false,
    errorText:""
  })
  useEffect(() => {
    let utoken = token()
    if(utoken){
        history.replace('/employees')
    }
  },[])
  const handleLogin = async(event:any) =>{
        event.preventDefault();
        setState({...state, loading:true})
        let form = event.currentTarget;
        let body = {
          data:{
              usuario:"",
              pass:""   
          },
          status:200
        }
        body.data.usuario = form.elements['email'].value
        body.data.pass = form.elements['pass'].value

        let regExpEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; // eslint-disable-line

        let tempEmail = body.data.usuario.trim();
        let tempPass = body.data.pass.trim();

        let isInvalidEmail = !regExpEmail.test(tempEmail);

        if (!tempEmail || !tempPass) {
          setState({ ...state, loading: false ,error:true, errorText:"Complete los campos para continuar."});
          return;
        }else if (isInvalidEmail) {
          setState({ ...state, loading: false ,error:true, errorText:"El formato de Correo Electrónico no es el correcto."});
          return;
        }
        // console.log(body)
        let login_response = {
          data:{
              usuario:"chris@hotmail.com",
              pass:"123"   
          },
          status:200
        }
        // console.log(login_response)
     
      //LOGIN SUCCESS
      if(body.data.usuario === login_response.data.usuario && body.data.pass === login_response.data.pass){
          window.localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.');          
          if(login_response.status === 200){
              setGlobal({...global, user:login_response.data})
              history.replace('/employees');
              return;
          }
    
      }
      //LOGIN UNKWON ERROR   
      setState({ ...state, loading: false ,error:true, errorText:'Ingrese usuario y contraseña correctos.'});
  }

  // onCopy
  const copyHandler = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
  };

  // onCut
  const cutHandler = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
  };

  // onPaste
  const pasteHandler = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
  };
  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg--login">

      <div className="bg-light p-5">
        <div className="text--medium text-center text--bold text--verde my-3">INICIAR SESIÓN</div>
        <div className='text text--red my-2 text-center'>{state.errorText}</div>
        <div className="form-login">
          <form onSubmit={handleLogin} id='login_form'>

            <div className="form-group">
                <input 
                  type="email" 
                  name="email"
                  id="email" 
                  className="form-input" 
                  placeholder="tu@correo.com"
                  autoComplete="false"
                  onCopy={copyHandler}
                  onCut={cutHandler}
                  onPaste={pasteHandler}
                />
                <label htmlFor="email" className="form-label">tu@correo.com</label>
            </div>
            

            <div className="d-flex align-items-end">
                  <div className="form-group">
                    <input
                      type={state.eye ? "text":"password"}
                      placeholder="Contraseña"
                      name='pass'
                      id="pass" 
                      className="form-input m-0"
                      autoComplete="false"
                      onCopy={copyHandler}
                      onCut={cutHandler}
                      onPaste={pasteHandler}
                    />
                    <label htmlFor="pass" className="form-label">Contraseña</label>
                </div>
                

                <div className="form-input_icon cursor-pointer" onClick={()=>{setState({...state, eye:!state.eye})}}>
                    <IconUI color={"#188a59"} size={'20px'}>
                      {state.eye ? 
                      <AiFillEye />
                      :<AiFillEyeInvisible />
                      }
                    </IconUI>
                </div>

            </div>

            {state.loading  ?
              <div className="my-3">
                <Loader></Loader>
              </div>
            :
              <>

                <input type="submit" value="INGRESAR" className="btn w-100 mt-4 m-auto"></input>
              </>
            }
          </form>
        </div>
      </div>
      
    </div>
  )
}

export default Login