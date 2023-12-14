import style from './DropDwReport.module.css';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';
import { Link } from "react-router-dom"
import ListConMonth from './ListConMonth';

//ListConMonth

function DropDwReport() {
const [interrupt ,setInt] = useState(false)

const Click = () => {setInt(!interrupt) }
//onMouseEnter={() => {setInt(true)}} onMouseOut={()=>{setInt(false)}} 


return (<div className={style.container}>
<button className={style.btnClick} onClick={Click}  >
RELATÓRIOS {interrupt ?<IoIosArrowUp className={style.ArrowUp}/>:<IoIosArrowDown/>}</button> 
<div className={`${interrupt ? style.dropShow : style.dropCollapse}`}>
<ul className={style.ul} >
<li className={style.li}><Link to='/AllProjct'>VER TODOS OS PROJETOS</Link></li>
<li className={style.li} ><Link to='/SearchPrjctClnt'>FILTRO POR PROJETO CLIENTES CADASTRADOS</Link></li>
<li className={style.li}><Link to='/SearchPrjctClntMnth'>FILTRO POR PROJETO CLIENTES CADASTRADOS NO MÊS</Link></li>
<li className={style.li}><Link to='/SearchPrjctBigTax'>FILTRO POR PROJETO A TAXA DE REDUÇÃO DE CONSUMO</Link></li>
<li className={style.li}><Link to='/ListConMonth'>FILTRO POR PROJETO LISTA DE CONSUMO MENSAL</Link></li>
</ul>
</div>
</div>


)}

export default DropDwReport;