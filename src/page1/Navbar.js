// import { Link } from "react-router-dom"
// import Container from "./Container"
import style from "./Navbar.module.css"
import terraAzulImg from '../images/terraAzulLogo.png'
// import logo from '../../img/costs_logo.png'
//ClientRegistred
//ReportPage
function Navbar() {
  
return(
<div className={style.container}>  
<nav className={style.nav}>
<a href="http://institutoterrazul.org.br/">    
<img src={terraAzulImg} alt="TERRA AZUL" /></a>
<ul >
{/* <li > <Link to='/'>LOGIN</Link></li> */}
{/* <li > <Link to='/AdmRegisterPage'>REGISTRO DO ADMINISTRADOR</Link></li> */}
{/* <li > <Link to='/ClientRegisterPage'>REGISTRO DO CLIENTE</Link></li> */}
{/* <li > <Link to='/ClientRegistered'>CLIENTES REGISTRADOS</Link></li> */}
{/* <li > <Link to='/InsertData'>INSERIR DADOS</Link></li> */}
{/* <li > <Link to='/ReportPage'>RELATORIO DE EMISSOES</Link></li> */}

</ul>
</nav>
</div>  
)

 }

 export default Navbar