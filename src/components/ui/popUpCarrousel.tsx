import { IoCloseOutline } from 'react-icons/io5'
import { OverlayUI } from "./overlayUI"
import { onlyLetter, onlyNumber } from '../../utils/inputRules'
import IconUI from "./iconUI"
import { useState } from 'react'
import Loader from './loaderUI'
import Carousel from '../carousel-component'
import { services } from '../../services/api'

const PopUpCarrousel = (props:any) => {
    console.log(props.imagenes)
    const [imagenes, setImagenes] = useState(props.imagenes)
  return (
    <>
        <OverlayUI type={'black'} onClick={()=>{props.onClose()}}></OverlayUI>
        <div className='popUp'>
            <div className="d-flex">
                <div className='text--medium text--verde text--bold'> Vista Previa</div>
                <div className="col"></div>
                <div className="cursor-pointer" onClick={()=>{props.onClose()}}>
                    <IconUI size={'20px'}>
                        <IoCloseOutline/>
                    </IconUI>
                </div>
            </div>
            <div className='my-3'>
                <Carousel images={imagenes} autoPlay={false} showButtons={true}></Carousel>
            </div>
        </div>
    </>
  )
}

export default PopUpCarrousel
