import {useState,useEffect,useRef} from "react";
import {AiOutlineUserAdd} from 'react-icons/all'
import {CSSTransition} from 'react-transition-group'
import PopUpUI from "./ui/popUpUI";
import Loader from "../components/ui/loaderUI";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import IconUI from "./ui/iconUI";

// import { allData } from "./constants";

const tableHead = {
  id: "ID",
  name: "Nombres",
  last_name: "Apellidos",
  birthday: "Cumpleaños",
};

const Table = (props:any) => {
  const countPerPage = 10;
  const [state, setState] = useState({
    show:false
  })
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(props.data.slice(0, countPerPage))
  );
  const searchData = useRef(
    throttle((val:any) => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        props.data
          .filter((item:any) => item.name.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );

  useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value]);

  const updatePage = (p:any) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(props.data.slice(from, to)));
  };

  const tableRows = (rowData:any) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection.map((key:any, index:any) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((name, index) => (
      <td key={index}>{name}</td>
    ));
  };

  return (
    <>
      <CSSTransition
        in={state.show}
        timeout={200} 
        classNames="popUpAnimate"
        unmountOnExit>
        <PopUpUI onClose={()=>{setState({...state, show:false});props.onLoad()}} ></PopUpUI>
      </CSSTransition>
      <div className="d-flex align-items-end">
        <div className="form-group input-search">
          <input
              className="form-input"
              placeholder="Buscar por Nombre"
              value={value}
              id='search'
              onChange={e => setValue(e.target.value)}
            />
            <label htmlFor="search" className="form-label">Buscar por Nombre</label>
        </div>
        <div className="col"></div>
        <div className="icon_btn icon_btn--rounded" onClick={()=>{
              setState({...state, show:true})
          }}>
            <IconUI size={24}>
                <AiOutlineUserAdd />
            </IconUI>
            <div className='icon_btn_help'>Agregar Empleado</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody className="trhover">{tableData()}</tbody>
      </table>
      <div className="d-flex justify-content-center">
        <Pagination
          pageSize={countPerPage}
          onChange={updatePage}
          current={currentPage}
          total={props.data.length}
        />
      </div>
    </>
  );
};
export default Table;
