import { useEffect, useState } from "react";
import IconUI from "./ui/iconUI";
import {MdKeyboardArrowRight,MdKeyboardArrowLeft} from 'react-icons/all'

// interface Props {
//   images: string[];
//   autoPlay?: boolean;
//   showButtons?: boolean;
// }

export default function Carousel(props: any) {
  // console.log(props.images)  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [state, setState] = useState({
    imgLength:0
  })
  const [loaded, setLoaded] = useState(false);

  // const filterImagesActive = (images:any) =>{
  //   const filtered = images.filter((obj:any)=>{
  //     return obj.is_active === "1"
  //   })
  //   setState({...state, imgLength:filtered.length})
  //   return filtered
  // }
  
  useEffect(() => {
    if (props.autoPlay || !props.showButtons) {
      const interval = setInterval(() => {
        selectNewImage(selectedIndex, props.images);
      }, 5000);
      return () => clearInterval(interval);
    }
  });

  const selectNewImage = (index: number, images:any[], next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next ? selectedIndex < images.length - 1 : selectedIndex > 0;
      const nextIndex = next ? (condition ? selectedIndex + 1 : 0) : (condition ? selectedIndex - 1  : images.length - 1);
      setSelectedIndex(nextIndex);
      setLoaded(true);
    }, 500);
  };

  const previous = () => {
    selectNewImage(selectedIndex, props.images, false);
  };

  const next = () => {
    selectNewImage(selectedIndex, props.images);
  };
  return (
    <>
      <div className="container p-0">
        <div className="d-flex justify-content-evenly align-items-center w-100">
            {props.showButtons ? (
            <>
                <div className="cursor-pointer dropbtn mx-1" onClick={previous}>
                  <IconUI size={'30px'}>
                    <MdKeyboardArrowLeft/>
                  </IconUI>
                </div>

              
                    
                  <div className={loaded ? "loaded banner mx-2" : "banner mx-2"}>
                   
                        <div className="d-flex flex-row justify-content-center align-items-center h-100">
                          <div className="d-flex flex-column align-items-center justify-content-center me-sm-0 me-md-4">
                            <img src={props.images[selectedIndex] } className='imgCarousel' alt={props.images[selectedIndex]} onLoad={() => setLoaded(true)}/>
                          </div>
  
                    
                        </div>
                        
            
                  </div>
                 
                
                <div className="cursor-pointer dropbtn mx-1" onClick={next}>
                  <IconUI size={'30px'}>
                    <MdKeyboardArrowRight/>
                  </IconUI>
                </div>
            </>
            ) : (
            <></>
            )}
        </div>
      </div>
    </>
  );
}