import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageConfig } from '../config/ImageConfig'; 
import uploadImg from '../assets/img/cloud-upload-regular-240.png';

const DropFileInput = (props:any) => {

    const wrapperRef:any = useRef(null);

    const [fileList, setFileList] = useState([]);
    const [state, setState] = useState([])

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
            const updateURL:any = [...state, archivoUrl];
            // arrayURL.push(archivoUrl)
            setState(updateURL)
            // state.imgUrl.push(archivoUrl)
        }
        
    }

    // useEffect(() => {
    //   if(state?.length === 0){
        
    //   }
    
     
    // }, [state])
    

    // const fileRemove = (file:any) => {
    //     const updatedList = [...fileList];
    //     console.log(updatedList)
    //     updatedList.splice(fileList.indexOf(file), 1);
    //     setFileList(updatedList);
    //     props.onFileChange(updatedList);
    // }

    return (
        <>
            <div   className='storage container'>
                <div className="row">
                    {state?.length === undefined ?
                        <div>De momento no has subido imágenes</div>    
                    :
                        <>
                        {state?.map((item,id):any =>{
                            console.log(item)
                            console.log(id)
                            return ( 
                                <div key={id} className="col" onClick={()=>{}}>
                                    <img src={item}  width={'150px'} height={'150px'}/>
                                </div>
                            )
                        })}
                        </>
                    }
                </div>
            </div>
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
