import style from './ListConMonth.module.css'
// import DropDwReport from './DropDwReport'
import NavbarLoged from '../page3/NavbarLoged'
import { useState } from 'react'
import GeneratePdf from './GeneratePdf'

function ListConMonth() {
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))
const [InpValue,setInpValue] = useState('') 
const [Cpf,setCpf] = useState('') 
const [Project,setProject] = useState('') 
const [BoxClient,setBoxClient] = useState([])
const [BoxClEmpty,setBoxClEmpty] = useState(false) 

function clickSearch() { 
if ( !isNaN(Cpf) && Cpf !== '' ) {
fetch(`http://191.252.38.35:8080/api/consumoMensal/listarPorCpf?email=${admStorage.email}&senha=${admStorage.senha}`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(Cpf) })
.then((response) => response.json())
.then((data) => {  
if (data.length > 0) { 
setBoxClient(OrganizeClient(data)) ;setBoxClEmpty(false) ;ClearValue() }
 else {setBoxClient([]) ;  setBoxClEmpty(true)  }
})  
.catch((error) => console.log(error))
}

else  if (Project){
//console.log(`é texto: ${Project}`);
fetch(`http://191.252.38.35:8080/api/consumoMensal/listarPorProjeto?email=${admStorage.email}&senha=${admStorage.senha}`,{
method:"POST",
headers:{"Content-Type":"application/json"},
 body:JSON.stringify(Project) })
.then((response) => response.json())
.then((data) => {  
 if (data.length > 0) { 
setBoxClient(OrganizeClient(data)) ;setBoxClEmpty(false) ;ClearValue() }
else {setBoxClient([]) ;  setBoxClEmpty(true)  }
})  
.catch((error) => console.log(error))
}
else if (InpValue === '') {alert('Preencha o formulário')}
}

function ClearValue() {setProject('') ;setCpf('') }

function OrganizeClient(data){
    return data.map(cliente => ({
        ...cliente,
        data: new Date(cliente.ano, cliente.mes - 1)
    })).sort((a, b) => {
        return  a.nome === b.nome ? b.data - a.data : a.nome.localeCompare(b.nome);
    });
}

function changeProjct(e) {setInpValue(e.target.value);setCpf(e.target.value);setProject(e.target.value)  }

return <div>
    <NavbarLoged/>
<div className={style.container}>

<div className={style.divTitleAllPrjct}>
    <h2 className={style.titH2}>Filtro por projeto ou cpf lista de consumo mensal</h2>
{BoxClient.length > 0 && <GeneratePdf />}
</div>

    <input className={style.cpfInput} type='text' onChange={changeProjct}  autoFocus value={InpValue} placeholder='Digite o projeto ou CPF'/>    
<button onClick={clickSearch}>Buscar</button>

{BoxClEmpty && <p>Nenhum cliente encontrado</p>}

<ul className={style.ul} >
{BoxClient.map((client) => (<li key={client.id} className={style.li}> 
<p>Ano: {client.ano}</p>
<p>Mês: {client.mes}</p>
<p>Projeto: {client.projeto}</p>
<p>CPF: {client.cpf}</p>
<p>Nome: {client.nome}</p>
<p>Gerou: {client.consumo} Kg CO²e</p>
<p>Taxa de redução: {Number(client.taxaDeReducao).toFixed(2)} %</p>
<p>Benefício: R${client.beneficio}</p>


</li>))}

</ul> 

</div>

</div>

}

export default ListConMonth
