import { Link } from "react-router-dom"
import style from "./NavbarLoged.module.css"
import terraAzulImg from '../images/terraAzulLogo.png'
import Dropdown from "./Dropdown"
import DropDwReport from "../page5/DropDwReport"

function NavbarLoged() {

return(
 <div className={style.container}>  
<nav className={style.nav}>
<a href="http://institutoterrazul.org.br/">    
<img src={terraAzulImg} alt="TERRA AZUL" /></a>
<ul >
<li > <Link to='/AdmRegisterPage'>REGISTRO DO ADMINISTRADOR</Link></li>
<li > <Dropdown/></li> 
<li > <DropDwReport/></li>
<li > <Link to='/' onClick={() =>{sessionStorage.removeItem('admStorage')}}>SAIR</Link></li>
</ul>
</nav>
</div> 
)

 }

 export default NavbarLoged