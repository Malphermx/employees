import { useEffect, useState } from 'react'
import { HeaderComponent } from '../components/header-component'
import Table from '../components/table-component'
import Loader from '../components/ui/loaderUI'

import { services } from '../services/api'


const Employees = () => {

  const [state, setState] = useState({
    employees:[],
    loading:false,
    error:false,
  })
  const getEmployees = async () => {
    // if(state.employees.length === 0){
      setState({...state, loading:true})
      const response_employees:any = await services("GET", "examen/employees/christopher",null);
      // console.log(response_employees)
      if(response_employees.status === 200){
          setState({...state, loading:false, employees:response_employees.data.data.employees})
      }else{
          setState({...state,loading:false , error:true})
      }
    // }  
  };
  useEffect(() => {
    getEmployees()
  }, [])
  
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <div className='container'>
        <div className='text--big text-center text--verde text-bold mt-3'>LISTA DE EMPLEADOS</div>
        {state.loading?
          <div className='d-flex justify-content-center align-items-center vh-100'>
            <Loader></Loader>
          </div>
        :
          <Table data={state.employees} onLoad={()=>{getEmployees()}}></Table>          
        }
      </div>
      
          
        
      
    </div>
  )
}

export default Employees