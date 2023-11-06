import style from './ReportPage.module.css'
import NavbarLoged from '../page3/NavbarLoged'
import { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
// import { useLocation } from 'react-router-dom';
function ReportPage() {
const [Boxemition,setBoxemition] = useState([]) 
const [Boxeletric,setBoxeletric] = useState([]) 
const [Boxwater,setBoxwater] = useState([]) 
const [Boxresidue,setBoxresidue] = useState([]) 


const navigate = useNavigate();

useEffect(() => {
const AdmJson = {email:"marcos@gmail.com",senha:"1234567",nome:"Marcos Philippe"}
fetch('http://191.252.38.35:8080/api/emissoes/lista',{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(AdmJson) })
.then((response) => response.json())
.then((data) => {setBoxemition(data); })
.catch((error) => { console.log('erro', error);  });

//DELETAR TODAS EMISSOES
// Boxemition.forEach((emition) => {
//   fetch(`http://191.252.38.35:8080/api/emissoes/${emition.id}`,{
//         method:"DELETE", })
//         .then((response) => {
//         if (!response.ok) {
//         throw new Error(`Erro ao excluir cliente: ${response.status}`); }
//         return response.json(); })
//         .then((data) => {
//         console.log(data);
//        /* setFound(prevState => prevState.filter(c => c.id !== Clientdel.id)); */})
//         .catch((error) => console.log(error));  }  )
// console.log(Boxemition);

}, [Boxemition]);






//DELETAR EMISSOES FORECH

// const DeleteAllEmiss = () => {
// console.log('delete');

// }



// const allEletric = Boxemition.filter((item) => item.tipoEmissao === 'energiaeletrica')
// setBoxeletric([allEletric]);
// const allWater = Boxemition.filter((item) => item.tipoEmissao === 'agua')
// setBoxwater([allWater]);
// const allResidue = Boxemition.filter((item) => item.tipoEmissao === 'residuos')
// setBoxresidue([allResidue]);


// setBoxeletric(Boxemition.find((item)=> item.tipoEmissao === 'energiaeletrica' )) 

// Boxemition.filter((emEnergy) => setBoxeletric([...Boxeletric,emEnergy]))
// console.log(Boxeletric);


// const clickDelete = (clientRegister) => {
// fetch(`http://191.252.38.35:8080/api/clientes/${clientRegister.id}`,{
// method:"DELETE", })
// .then((response) => {
// if (!response.ok) {
// throw new Error(`Erro ao excluir cliente: ${response.status}`); }
// return response.json(); })
// .then((data) => {
// console.log(data); })
// .catch((error) => console.log(error)); }

const SelElectric = () => {
  console.log(Boxemition);

  navigate('/EletricEmiss',{ state: { Boxemition: Boxemition }})
// navigate('/EletricEmiss',{ state: { Boxeletric: Boxeletric }})
}
const SelWater = () => {
navigate('/WaterEmiss',{ state: { Boxwater: Boxwater }})
}
const SelResidue = () => {
navigate('/ResidueGen',{ state: { Boxresidue: Boxresidue }})
}

return  <div><NavbarLoged/>
 <div className={style.container}>
<h2>Relatório de emissoes</h2>
<p>Selecione a categoria:</p>
<div className={style.divBtn}>
<button className={style.btnInsert} onClick={SelElectric}>Energia elétrica</button>
<button className={style.btnInsert} onClick={SelWater}>água</button>
<button className={style.btnInsert} onClick={SelResidue}>Residuos</button>
</div>
{/* <ul className={style.ul} >{Boxclient.map(clientRegister => (<li key={clientRegister.id} className={style.li}> 
<p><b>Projeto:</b>{clientRegister.projeto}</p>

<p className={style.pMb}><b>Nº de habitantes na residência:</b>{clientRegister.habitantes}</p>
<div className={style.divBtn}>
</div>
</li>
  ))
}  </ul> */}
</div>
</div>
}

export default ReportPage ;