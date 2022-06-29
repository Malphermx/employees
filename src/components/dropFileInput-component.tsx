import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageConfig } from '../config/ImageConfig'; 
import uploadImg from '../assets/img/cloud-upload-regular-240.png';

const DropFileInput = (props:any) => {

    const wrapperRef:any = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e:any) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList:any = [...fileList, newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
        console.log(fileList)
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
            {/* {fileList.length > 0 ? (
                <>
                    {fileList.map((id:any,item:any) =>{
                        console.log(item)
                        return(
                            <div key={id}>
        
                            </div>
                        )
                    })}
                </>
            ):null} */}
            
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func
}

export default DropFileInput;
