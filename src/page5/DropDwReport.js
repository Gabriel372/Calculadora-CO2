import style from './DropDwReport.module.css';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';
import { Link } from "react-router-dom"

function DropDwReport() {
const [interrupt ,setInt] = useState(false)

const Click = () => {setInt(!interrupt) }

return (<div className={style.container}>
<button className={style.btnClick} onClick={Click}>RELATÓRIOS {interrupt ?<IoIosArrowUp className={style.ArrowUp}/>:<IoIosArrowDown/>}</button> 
<div className={`${interrupt ? style.dropShow : style.dropCollapse}`}>
<ul className={style.ul}>
<li className={style.li}><Link to='/SearchPrjctClnt'>BUSCA POR PROJETO CLIENTES CADASTRADOS</Link></li>
<li className={style.li}><Link to='/SearchPrjctBigTax'>BUSCA POR PROJETO MAIOR TAXA DE REDUÇÃO DE CONSUMO</Link></li>
<li className={style.li}><Link to='/SearchPrjctClntMnth'>BUSCA POR PROJETO CLIENTES CADASTRADOS NO MÊS</Link></li>
</ul>
</div>
</div>

)}

export default DropDwReport;