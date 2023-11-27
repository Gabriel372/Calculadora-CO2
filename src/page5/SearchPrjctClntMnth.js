import style from './SearchPrjctClntMnth.module.css'
import { useState,useEffect } from 'react'
import NavbarLoged from '../page3/NavbarLoged'


function SearchPrjctClntMnth() {
const [Boxclient,setBoxclient] = useState([]) //cx de clientes
const [ChangeInp,setChangeInp] = useState('') //cx de clientes
const [NotFound,setNotFound] = useState('Projeto nao encontrado') //cx de clientes
 
//ChangeInp
//Notfound

// useEffect(() => {
//     fetch('http://191.252.38.35:8080/api/clientes/listarPorProjeto?email=marcos@gmail.com&senha=1234567',{
//         method:"POST",
//          headers:{"Content-Type":"application/json"},
//          body:JSON.stringify('barra') })
//          .then((response) => response.json())
//          .then((data) => {console.log('relatorio recebido', data);setBoxclient(data)} )
//          .catch((error) => { console.log('erro', error);  }); 
// },[])

const clickSearch = () => { 

 if (ChangeInp) {
fetch('http://191.252.38.35:8080/api/clientes/listarPorProjeto?email=marcos@gmail.com&senha=1234567',{
    method:"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify(ChangeInp) })
     .then((response) => response.json())
     .then((data) => {console.log('relatorio recebido', data);setBoxclient(data)} )
     .catch((error) => { console.log('erro', error);  }); 

//     const cpfFiltred = Boxclientemit.filter((client) => client.cpf === Changeinp);
//     const projectFiltred = Boxclientemit.filter((client) => client.projeto === Changeinp);  
// if (cpfFiltred.length > 0) { setFound([...cpfFiltred]);  }    
// // else if (nameFiltred.length > 0 ) { setFound([...nameFiltred]);  }
// else if (projectFiltred.length > 0 ) { setFound([...projectFiltred]);}
// else if (Found.length === 0 ) { SetNotfound('Nenhum cliente encontrado');  }
 }  
//  setChangeinp('') 
}

const ChangeSearch = (e) => {setChangeInp(e.target.value);setBoxclient([])}

const Convert = (any) => { const [year, month, day] = any.split('-');
const DateConverted = `${day}/${month}/${year}`; return DateConverted; }


// cpf data eamil endereco id matriculaDeAgua matriculaDeEnergia matriculaDeGas 
// nome projeto telefone titularAguaCpf titularEnergiaCpf titularGasCpf




return <div>
<NavbarLoged/> 
<div className={style.container}>
    <h2 className={style.searcH2}>Busca por projeto clientes
cadastrados no mês</h2>

<div><input className={style.cpfInput} type='text' onChange={ChangeSearch}  autoFocus value={ChangeInp} placeholder='Digite o projeto'/>    
<button onClick={clickSearch}>Buscar</button></div>   

{Boxclient.length > 0 && <h3>Projeto: {ChangeInp}</h3>}

{Boxclient.length > 0 &&
  <ul className={style.ul} >
{Boxclient.map(client => (<li key={client.id} className={style.li}> 
    <p>Cpf: {client.cpf}</p><p> Nome: {client.nome}</p>
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

export default SearchPrjctClntMnth