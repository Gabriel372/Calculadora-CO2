import style from './SearchPrjctClntMnth.module.css'
import { useState,useEffect } from 'react'
import NavbarLoged from '../page3/NavbarLoged'

function SearchPrjctClntMnth() {
const [Boxclient,setBoxclient] = useState([]) //cx de clientes
const [BoxClEmpty,setBoxClEmpty] = useState(false) //cx de clientes
const [Project,setProject] = useState('') //cx de clientes
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))
const [Month,setMonth] = useState('')
const [Year,setYear] = useState('')

const clickSearch = () => { 
 if (Project && Month && Year) {

    fetch(`http://191.252.38.35:8080/api/consumoMensal/listarPorProjetoEMesEAno?email=${admStorage.email}&senha=${admStorage.senha}&ano=${Year}&mes=${Month}`,{
        method:"POST",
         headers:{"Content-Type":"application/json"},
         body:JSON.stringify(Project) })
         .then((response) => response.json())
         .then((data) => {
         if(data.length === 0){setBoxclient([]) ; setBoxClEmpty(true) ;console.log('cx de relatorio vazia',data);}
         else {console.log('relatorio recebido', data);setBoxClEmpty(false)
         setBoxclient(data)}} )
         .catch((error) => { console.log('erro', error);  }); 
 }  
else {setBoxClEmpty(false) ;setTimeout(() => {alert('Preencha o formulário')  },50)   }
}

const ChangeSearch = (e) => {setProject(e.target.value)}

const Convert = (any) => { const [year, month, day] = any.split('-');
const DateConverted = `${day}/${month}/${year}`; return DateConverted; }

const changeSelYear = (e) => { setYear(e.target.value) ; }
const changeSelMonth = (e) => { setMonth(e.target.value) ;}

return <div>
<NavbarLoged/> 
<div className={style.container}>
    <h2 className={style.searcH2}>Filtro por projeto clientes cadastrados no mês</h2>

<div className={style.divInpSrchPrtcj}>

<p className={style.pSelSrchPrjct}>Selecione o ano:
<select className={style.selEmYear} onChange={changeSelYear} placeholder='selecioneee' value={Year}>
<option value=''></option>
  {Array.from({ length: 31 }, (_, i) => i + 2023).map(num => (
    <option className={style.selEmYear}  key={num} value={num}>{num}</option>
  ))}
</select>
</p>

<p className={style.pSelSrchPrjct}>Selecione o mês:
<select className={style.selEmMonth} onChange={changeSelMonth} value={Month}>
<option value=''></option>
  {['1', '2', '3', '4', '5', '6', '7', '8', '9',
   '10', '11', '12'].map((mes, index) => (
    <option key={index} value={index + 1}>{mes}</option>
  ))}
</select>
</p>

<input className={style.inpDigPrjct} type='text' onChange={ChangeSearch}  autoFocus value={Project} placeholder='Digite o projeto'/>    
</div>

<button  className={style.btnPrjctMon} onClick={clickSearch}>Buscar</button>  

{/* {Boxclient.length > 0 && <h3>Ano:{Year} / mês:{Month} / projeto:{Project}</h3>} */}

{BoxClEmpty && <p>Nenhum cliente encontrado</p>}

{Boxclient.length > 0 &&
  <ul className={style.ul} >
{Boxclient.map(client => (<li key={client.id} className={style.li}> 
    <p>CPF: {client.cpf}</p>
    <p> Nome: {client.nome}</p>
    <p>Projeto: {client.projeto}</p>
    <p>Gerou: {client.consumo} kg CO²e</p>
    {/* <p>Taxa de redução: {client.taxaDeReducao} %</p> */}
</li>))}
</ul> }

</div>
</div>
}

export default SearchPrjctClntMnth