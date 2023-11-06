import { Link } from "react-router-dom"
// import Container from "./Container"
import style from "./NavbarLoged.module.css"
// import terraAzulImg from 
import terraAzulImg from '../images/terraAzulLogo.png'
import Dropdown from "./Dropdown"
// import logo from '../../img/costs_logo.png'
//ClientRegistred
//ReportPage
//ClientManager
function NavbarLoged() {
            
return(
 <div className={style.container}>  
<nav className={style.nav}>
<a href="http://institutoterrazul.org.br/">    
<img src={terraAzulImg} alt="TERRA AZUL" /></a>
<ul >
<li > <Link to='/AdmRegisterPage'>REGISTRO DO ADMINISTRADOR</Link></li>
<li > <Dropdown/></li> 
<li > <Link to='/ReportPage'>RELATORIO DE EMISSOES</Link></li>
<li > <Link to='/'>SAIR</Link></li>

{/* <li > <Link to='/ClientRegistered'>CLIENTES REGISTRADOS</Link></li> */}
{/* <li > <Link to='/InsertData'>INSERIR DADOS</Link></li> */}

</ul>
</nav>
</div> 
)

 }

 export default NavbarLoged