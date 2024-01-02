import style from './SearchPrjctClnt.module.css'
import { useState,useEffect } from 'react'
import NavbarLoged from '../page3/NavbarLoged'
import GeneratePdf from './GeneratePdf'

function SearchPrjctClnt() {
const [Boxclient,setBoxclient] = useState([]) //cx de clientes
const [ChangeInp,setChangeInp] = useState('') //cx de clientes
const [EmptyBoxCl,setEmptyBoxCl] = useState(false) 
 

const clickSearch = () => { 

 if (ChangeInp) {
fetch('http://191.252.38.35:8080/api/clientes/listarPorProjeto?email=marcos@gmail.com&senha=1234567',{
    method:"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify(ChangeInp) })
     .then((response) => response.json())
   .then((data) => {
    if(data.length === 0){setBoxclient([]) ; setEmptyBoxCl(true) ;console.log('cx de relatorio vazia',data);}
    else {setEmptyBoxCl(false) ; setBoxclient(data);}}  )
     .catch((error) => { console.log('erro', error);  }); 
 } 
 else{setBoxclient([]);setEmptyBoxCl(false) ;setTimeout(() => {alert('Preencha o formulário')  },50) ;}
}

const ChangeSearch = (e) => {setChangeInp(e.target.value);}

const Convert = (any) => { const [year, month, day] = any.split('-');
const DateConverted = `${day}/${month}/${year}`; return DateConverted; }

return <div>
<NavbarLoged/> 
<div className={style.container}>

<div className={style.divTitleAllPrjct}>
    <h2 className={style.titH2}>Filtro por projeto clientes cadastrados</h2>
    {Boxclient.length > 0 && <GeneratePdf />}
    </div>


<div><input className={style.cpfInput} type='text' onChange={ChangeSearch}  autoFocus value={ChangeInp} placeholder='Digite o projeto'/>    
<button onClick={clickSearch}>Buscar</button></div>   

{EmptyBoxCl && <p>Nenhum cliente cadastrado com esse projeto</p>}


{/* {Boxclient.length > 0 && <h3>Projeto: {ChangeInp}</h3>} */}

{Boxclient.length > 0 &&
  <ul className={style.ul} >
{Boxclient.map(client => (<li key={client.id} className={style.li}> 
    <p>CPF: {client.cpf}</p><p> Nome: {client.nome}</p>
    <p>Projeto: {client.projeto}</p>
    <p>Data de cadastro: {Convert(client.data)}</p>
    <p>Email: {client.email}</p>
    <p>Endereço: {client.endereco}</p>
    <p>Habitantes: {client.habitantes}</p>
    <p>Código do cliente/energia: {client.matriculaDeEnergia}</p>
    <p>Código do cliente/gás: {client.matriculaDeGas}</p>
    <p>Telefone: {client.telefone}</p>
    <p>Titular de água cpf: {client.titularAguaCpf}</p>
    <p>Titular de energia cpf: {client.titularEnergiaCpf}</p>
    <p>Titular de gás cpf: {client.titularGasCpf}</p>
</li>))}
</ul> }

</div>
</div>
}

export default SearchPrjctClnt