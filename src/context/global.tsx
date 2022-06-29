import { createContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { token } from '../services/api';

// interface AppContextInterface {
//     global: {};
//     setGlobal: {};
//     _logOut: () => boolean;
//   }

export const GlobalContext = createContext<any | null>(null);

export function GlobalProvider({ children }: any){
    let history = useHistory()
    const [global, setGlobal] = useState({
        loading:false,
        user:{},
    })

    useEffect( () => {
        
        const getUser = async () => {

            if(global.user === null){
                if(token() !== null){
                    const user_response = {
                        data:{
                            usuario:"chris@hotmail.com",
                            pass:"123"   
                        },
                        status:200
                    }
                    // console.log(user_response)
                    if(user_response.status === 200){
                        setGlobal({...global, user:user_response.data})
                        history.replace('/Employees')
                        return;
                    }
    
                    _logOut()
                    history.replace('/')
                   
                }
            }
        }
        getUser()
        
    }, [])


    const _logOut = () => {
        window.localStorage.clear();
        setGlobal({...global ,user:{}})
        return true
    }
    
    return (
        <GlobalContext.Provider value={{global, setGlobal, _logOut}}>
            {children}
        </GlobalContext.Provider>
    )
}
