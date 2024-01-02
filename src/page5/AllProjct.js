import NavbarLoged from "../page3/NavbarLoged"
import { useState,useEffect } from "react"
import style from './AllProjct.module.css'
import GeneratePdf from './GeneratePdf'
import React, { useRef } from 'react';

function AllProjct() {
const [BoxAllProject,setBoxAllProject] = useState([])
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))
const [BoxClEmpty,setBoxClEmpty] = useState(false) 
const divRef = useRef();


useEffect(() => {
    fetch(`http://191.252.38.35:8080/api/clientes/listarProjetosAtivos?email=${admStorage.email}&senha=${admStorage.senha}`, {
    method: "POST",
      headers: { "Content-Type": "application/json" },  })
      .then((response) => response.json())
      .then((data) => 
      {  if (data.length > 0) { setBoxAllProject(data); setBoxClEmpty(false) }
else {setBoxAllProject([]) ;  setBoxClEmpty(true)  } } )
      .catch((error) => console.log(error));
  }, []);

return <div>
<NavbarLoged/>

<div className={style.container}> 

<div className={style.divToPdf} ref={divRef} > 

<div className={style.divTitleAllPrjct}>
<h2 className={style.titH2}>Todos os projetos</h2>
{BoxAllProject.length > 0 && <GeneratePdf />}
</div>

{BoxAllProject.length === 0  && <p>Não tem projeto</p>}

  <ul className={style.ul} ><div className={style.divAllPrjct}>
{BoxAllProject.map((project , index) => (<li key={index} className={style.li}> 
{project.projeto}
</li>))}
</div>
</ul> 

</div>


</div>

</div>

}

export default AllProjct
