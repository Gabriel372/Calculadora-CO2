import style from "./Navbar.module.css"
import terraAzulImg from '../images/terraAzulLogo.png'

function Navbar() {
  
return(
<div className={style.container}>  
<nav className={style.nav}>
<a href="http://institutoterrazul.org.br/">    
<img src={terraAzulImg} alt="TERRA AZUL" /></a>
</nav>
</div>  
)

 }

 export default Navbar