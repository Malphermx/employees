export default function Loader(props:any) {
    return (
        <div className="d-flex flex-column align-items-center">
            <div className="loader"></div>
            <div className={`text--${props.color} mx-2`}>Cargando...</div>
        </div>
    )
}