import React, { useState } from 'react'
import { HeaderComponent } from '../components/header-component'
import DropFileInput from '../components/dropFileInput-component'

const Upload = () => {

  const onFileChange = (files:any) => {
    console.log(files);
  }
  return (
    <div className=''>
      <HeaderComponent></HeaderComponent>
      <div className=''>
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className='text--big text-center text--verde text-bold mt-3'>
              GALERIA DE IMAGENES
            </div>              
            <DropFileInput onFileChange={(files) => onFileChange(files)}/>
        </div>
      </div>
    </div>
  )
}

export default Upload