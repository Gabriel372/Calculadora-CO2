import style from './MenuMobile.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";

function MenuMobile() {
const [interrupt ,setInt] = useState(false)
    
return <div className={style.MobileContainer} >

<button className={style.btnMobile} onClick={()=>{setInt(!interrupt)}}  >
{interrupt ? <IoClose />:<FiMenu />}
</button>
<div className={`${interrupt ? style.menuShow : style.menuCollapse}`} onClick={()=>{setInt(!interrupt)}} > 

<ul className={style.MobileUl}><li></li>

<Link to='/StartPg'><li>HOME</li></Link>
<Link to='/AdmRegisterPage'><li>CADASTRAR ADMINISTRADOR </li></Link>
<Link to='/ClientRegisterPage'><li>CADASTRAR CLIENTE</li></Link>
<Link to='/ClientManager'><li>FILTRO POR CPF OU PROJETO CLIENTES CADASTRADOS</li></Link>
<Link to='/SearchPrjctClntMnth'><li>FILTRO POR PROJETO CLIENTES CADASTRADOS NO MÊS</li></Link> 
<Link to='/SearchPrjctBigTax'><li> FILTRO POR PROJETO TAXA DE REDUÇÃO DE CONSUMO</li></Link>
<Link to='/ListConMonth'><li> FILTRO POR PROJETO LISTA DE CONSUMO MENSAL</li></Link> 
<Link to='/AllProjct'><li>VER TODOS OS PROJETOS</li></Link> 
<Link to='/' onClick={() =>{sessionStorage.removeItem('admStorage')}}><li>SAIR</li></Link>
</ul>
</div>
</div>

}

export default MenuMobile