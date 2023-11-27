import style from './ClientRegistered.module.css'
import { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function ClientRegistered() {
const [Boxclient,setBoxclient] = useState([]) 
const navigate = useNavigate();

useEffect(() => {
const AdmTeste = {email:"marcos@gmail.com",senha:"1234567",nome:"Marcos Philippe"}
fetch('http://191.252.38.35:8080/api/clientes/lista',{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(AdmTeste) })
.then((response) => response.json())
.then((data) => setBoxclient(data) )  
.catch((error) => console.log(error))
 },[Boxclient])

const clickDelete = (clientRegister) => {
fetch(`http://191.252.38.35:8080/api/clientes/${clientRegister.id}`,{
method:"DELETE", })
.then((response) => {
if (!response.ok) {
throw new Error(`Erro ao excluir cliente: ${response.status}`); }
return response.json(); })
.then((data) => {
console.log(data); })
.catch((error) => console.log(error)); }

const clickInsert = (clientRegister) => {console.log(Boxclient);
navigate('/InsertData',{ state: { thisClient: clientRegister }}) }

const Convert = (any) => { const [year, month, day] = any.split('-');
const DateConverted = `${day}/${month}/${year}`; return DateConverted; }

return <div className={style.container}>
<h2>Clientes registrados</h2>
<ul className={style.ul} >
{Boxclient.map(clientRegister => (<li key={clientRegister.id} className={style.li}> 
<p><b>Projeto: </b>{clientRegister.projeto}</p>
<p><b>Nome: </b>{clientRegister.nome}</p>
<p><b>Data de cadastro: </b>{Convert(clientRegister.data)}</p>
<p><b>Cpf: </b>{clientRegister.cpf}</p>
<p><b>Endereço: </b>{clientRegister.endereco}</p>
<p><b>Email: </b>{clientRegister.email}</p>
<p><b>Telefone: </b>{clientRegister.telefone}</p>

<div className={style.divBtn}>
<button className={style.btnRemove} onClick={() => clickDelete(clientRegister.id)}>Remover</button>
<button className={style.btnInsert} onClick={() => clickInsert(clientRegister)}>Inserir dados</button>
</div>
</li>
  ))
}  </ul>
</div>
}

export default ClientRegistered ;
