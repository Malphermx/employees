import { useContext } from 'react'
import { useHistory,useLocation  } from 'react-router-dom'
import { GlobalContext } from '../context/global'
import {CgLogOut,IoPeopleSharp , GrGallery} from 'react-icons/all'
import IconUI from './ui/iconUI'


export const HeaderComponent = (props:any) => {
  const history = useHistory()
  const location = useLocation();
  const {_logOut} = useContext(GlobalContext)
  return (
    <header className="container text text--verde border-bottom--green">
        <div className="d-flex align-items-center">
            <a href="/">
                <div className='d-flex align-items-center'>
                    <div className="logo"></div>
                    {/* <div className='text--bold'>LogoCompany</div> */}
                </div>
            </a>
            <div className="col"></div>

            <div className={location.pathname === "/employees"? "icon_btn icon_btn--active icon_btn--rounded me-2":"icon_btn icon_btn--rounded me-2"} onClick={()=>{
                 history.replace('/employees')
              }}>
                  <IconUI size={24}>
                      <IoPeopleSharp />
                  </IconUI>
                  <div className='icon_btn_help'>Empleados</div>
              </div>
              <div className={location.pathname === "/upload"? "icon_btn icon_btn--active icon_btn--rounded":"icon_btn icon_btn--rounded"} onClick={()=>{
                 history.replace('/upload')
              }}>
                  <IconUI size={24}>
                      <GrGallery />
                  </IconUI>
                  <div className='icon_btn_help'>Imagenes</div>
              </div>
            <div className="col"></div>
            <div className="icon_btn icon_btn--rounded" onClick={()=>{
                 _logOut()
              }}>
                  <IconUI size={24}>
                      <CgLogOut />
                  </IconUI>
                  <div className='icon_btn_help'>Cerrar Sesión</div>
              </div>
            
        </div>
    </header>
  )
}
