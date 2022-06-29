import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {CSSTransition} from 'react-transition-group'
import { ImageConfig } from '../config/ImageConfig'; 
import PopUpCarrousel from './ui/popUpCarrousel';
import uploadImg from '../assets/img/cloud-upload-regular-240.png';

const DropFileInput = (props:any) => {

    const wrapperRef:any = useRef(null);

    const [fileList, setFileList] = useState([]);
    const [state, setState] = useState([])
    const [show, setShow] = useState(Boolean)
    const [success, setSuccess] = useState(Boolean)

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e:any) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList:any = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
            const archivoUrl= URL.createObjectURL(newFile)
            const updateURL:any = [...state, archivoUrl]
            setState(updateURL)
        }
        
    }

    // const fileRemove = (file:any) => {
    //     const updatedList = [...fileList];
    //     console.log(updatedList)
    //     updatedList.splice(fileList.indexOf(file), 1);
    //     setFileList(updatedList);
    //     props.onFileChange(updatedList);
    // }

    return (
        <>
            <CSSTransition
                in={show}
                timeout={200} 
                classNames="popUpAnimate"
                unmountOnExit>
                <PopUpCarrousel onClose={()=>{setShow(false)}} imagenes={state}></PopUpCarrousel>
            </CSSTransition>
           
            <div   className='storage container'>
                <div className="row">
                    {state?.length === 0 ?
                        <div className='text-medium text--verde text-center'>No hay imágenes :C</div>    
                    :
                        <>
                            <div className='text text--verde text-center my-2'>Haz click en tu imagen para previsualizar</div>
                            {state?.map((item,id):any =>{
                                return ( 
                                    <div key={id} className="col-sm-12 col-md-4 cursor-pointer d-flex justify-content-center" onClick={()=>{setShow(true)}}>
                                        <img src={item} className="m-auto"  width={'150px'} height={'150px'}/>
                                    </div>
                                )
                            })}
                        </>

                    }
                </div>
                
            </div>
            {success?
                <div>Se guardo en el LocalStorage Correctamente</div>
                :
                null
            }
            
            <div className='btn mt-2' onClick={()=>{
                const imagenes:any = state
                window.localStorage.setItem('imagenes', JSON.stringify(imagenes) )
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                },2000);
             }}>Guadar Imágenes</div>
            <div
                ref={wrapperRef}
                className="drop-file-input my-3"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                    <p>Arrastra y suelta tus imágenes</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
            
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;
