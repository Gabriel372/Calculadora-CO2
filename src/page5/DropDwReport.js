import style from './DropDwReport.module.css';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';
import { Link } from "react-router-dom"

function DropDwReport({DDReportOpen,setDDReportOpen,DDRegistOpen,setDDRegistOpen}) {
//DDRegistOpen
function ToggleDDReport() {
setDDReportOpen(!DDReportOpen)     
if (DDRegistOpen) {
    setDDRegistOpen(false) }  }


return (<div className={style.container}>
<button className={style.btnClick} onClick={ToggleDDReport}  >
RELATÓRIOS {DDReportOpen ?<IoIosArrowUp className={style.ArrowUp}/>:<IoIosArrowDown/>}</button> 

<div className={`${DDReportOpen ? style.dropShow : style.dropCollapse}`}>
<ul className={style.ul} >
<li className={style.li} ><Link to='/ClientManager'>FILTRO POR CPF OU PROJETO CLIENTES CADASTRADOS</Link></li>
<li className={style.li}><Link to='/SearchPrjctClntMnth'>FILTRO POR PROJETO CLIENTES CADASTRADOS NO MÊS</Link></li>
<li className={style.li}><Link to='/SearchPrjctBigTax'>FILTRO POR PROJETO A TAXA DE REDUÇÃO DE CONSUMO</Link></li>
<li className={style.li}><Link to='/ListConMonth'>FILTRO POR PROJETO LISTA DE CONSUMO MENSAL</Link></li>
<li className={style.li}><Link to='/AllProjct'>VER TODOS OS PROJETOS</Link></li>
</ul>
</div>
</div>


)}

export default DropDwReport;