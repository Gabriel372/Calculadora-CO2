import { Link } from "react-router-dom"
import style from "./NavbarLoged.module.css"
import terraAzulImg from '../images/terraAzulLogo.png'
import Dropdown from "./Dropdown"
import DropDwReport from "../page5/DropDwReport"
import MenuMobile from './MenuMobile'
import { useState } from "react"

function NavbarLoged() {
const [DDReportOpen ,setDDReportOpen] = useState(false)
const [DDRegistOpen ,setDDRegistOpen] = useState(false)

return(
 <div className={style.container}>  
<nav className={style.nav}>
<a href="http://institutoterrazul.org.br/">    
<img src={terraAzulImg} alt="TERRA AZUL" /></a>
<ul className={style.DesktopUl}>
<li > <Link to='/StartPg'>HOME</Link></li> 
<li > <Dropdown DDRegistOpen={DDRegistOpen} setDDRegistOpen={setDDRegistOpen} DDReportOpen={DDReportOpen} setDDReportOpen={setDDReportOpen}/></li> 
{/* <li > <Link to='/ClientManager'>FILTRO DO CLIENTE</Link></li> */}
<li > <DropDwReport DDReportOpen={DDReportOpen} setDDReportOpen={setDDReportOpen} DDRegistOpen={DDRegistOpen} setDDRegistOpen={setDDRegistOpen} /></li>
<li > <Link to='/' onClick={() =>{sessionStorage.removeItem('admStorage')}}>SAIR</Link></li>
</ul>
<MenuMobile/>

</nav>
</div> 
)

 }

 export default NavbarLoged