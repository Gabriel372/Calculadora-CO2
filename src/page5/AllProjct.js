import NavbarLoged from "../page3/NavbarLoged"
import { useState,useEffect } from "react"
import style from './AllProjct.module.css'

function AllProjct() {
const [BoxClient,setBoxClient] = useState([])
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))
const [BoxClEmpty,setBoxClEmpty] = useState(false) 

useEffect(() => {
    fetch(`http://191.252.38.35:8080/api/clientes/listarProjetosAtivos?email=${admStorage.email}&senha=${admStorage.senha}`, {
    method: "POST",
      headers: { "Content-Type": "application/json" },  })
      .then((response) => response.json())
      .then((data) => 
      {  if (data.length > 0) { setBoxClient(data); setBoxClEmpty(false) }
else {setBoxClient([]) ;  setBoxClEmpty(true)  } } )
      .catch((error) => console.log(error));
  }, []);

return <div>
<NavbarLoged/>

<div className={style.container}> 
<h2 className={style.titH2}>Todos os projetos</h2>
{BoxClEmpty && <p>Não tem projeto</p>}

  <ul className={style.ul} ><div className={style.divAllPrjct}>
{BoxClient.map((project , index) => (<li key={index} className={style.li}> 
{project.projeto}
</li>))}
</div>
</ul> 

</div>

</div>

}

export default AllProjct
