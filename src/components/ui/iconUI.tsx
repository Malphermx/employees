export default function IconUI(props:any) {
    
    return (
        <div className="d-flex align-items-center" style={{color:props.color, fontSize:props.size, stroke:props.color}}>
            {props.children}
        </div>
    )
}
