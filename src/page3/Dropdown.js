import style from './Dropdown.module.css';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';
import { Link } from "react-router-dom"


function Dropdown() {
const [interrupt ,setInt] = useState(false)

const Click = () => {setInt(!interrupt) }

return (<div className={style.container}>
<button className={style.btnClick} onClick={Click}>CADASTRO {interrupt ?<IoIosArrowUp className={style.ArrowUp}/>:<IoIosArrowDown/>}</button> 
<div className={`${interrupt ? style.dropShow : style.dropCollapse}`}>
<ul className={style.ul}>
<li className={style.li}><Link to='/ClientRegisterPage'>CLIENTE</Link></li>
<li className={style.li}><Link to='/AdmRegisterPage'>ADMINISTRADOR</Link></li>

</ul>
</div>
</div>

)}

export default Dropdown;