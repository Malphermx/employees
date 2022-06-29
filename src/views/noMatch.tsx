import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { token } from '../services/api';

const NoMatch = () => {
    let location = useLocation();
    const history = useHistory();
    useEffect(() => {
      let utoken = token()
      if(utoken){
          history.replace('/employees')
      }else{
        history.replace('/')
      }
    },[])
  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
        <div className=''>   
            <h3>
              No match for <code>{location.pathname}</code>
            </h3>
        </div>
    </div>
  )
}

export default NoMatch