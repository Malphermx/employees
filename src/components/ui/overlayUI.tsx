export const OverlayUI = (props:any) => {
    return (
        <div className={`overlay overlay--${props.type} overlay--${props.overlay}`} onClick={()=>{
            props.onClick()
        }}>
        </div>

    )
}
