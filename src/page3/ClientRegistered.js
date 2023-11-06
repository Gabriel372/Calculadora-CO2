import style from './ClientRegistered.module.css'
import { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";

// import { useLocation } from 'react-router-dom';
function ClientRegistered() {
const [Boxclient,setBoxclient] = useState([]) 
const navigate = useNavigate();

// const [Clientesid,setClientesid] = useState('') //guardar id gerado por api
// Usa-se o endpoint "clientes/c89b4886-be20-41a1-8856-e7205375bfd2" para "POST",

// e "clientes/{id}" para as requisições "GET", "PUT" e "DELETE".

// Usa-se o endpoint "clientes/lista" com a requisição "POST" para listar os clientes,
// usando o JSON de administradores.

// cod id gerado pela api:'5608d4c8-e065-4507-99e5-b3938df30991'

//"clientes/c89b4886-be20-41a1-8856-e7205375bfd2"
// const idApi = '10e78053-101d-40ff-bb24-5fea0a4eb641'
//resposta ok do sev > {timestamp: '2023-10-12T19:18:09.982+00:00', status: 400, error: 'Bad Request', path: '/api/clientes/lista'}

// const Administradores = 'Administradores'


useEffect(() => {
// setClientesid(props.Id) //salvar id por props
// console.log(props.Id);
    // fetch('http://191.252.38.35:8080/api/clientes/10e78053-101d-40ff-bb24-5fea0a4eb641',{
const AdmTeste = {email:"marcos@gmail.com",senha:"1234567",nome:"Marcos Philippe"}
fetch('http://191.252.38.35:8080/api/clientes/lista',{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(AdmTeste) })
.then((response) => response.json())
.then((data) => setBoxclient(data) )  //armazenar clientes em box
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
{/* <p><b>Codigo do cliente/energia: </b>{clientRegister.matriculaDeEnergia}</p>
<p><b>Titular de energia do cpf: </b>{clientRegister.titularEnergiaCpf}</p>
<p><b>Código do cliente/água: </b>{clientRegister.matriculaDeagua}</p>
<p><b>Titular de água do cpf: </b>{clientRegister.titularAguaCpf}</p>
<p><b>Código do cliente/gás: </b>{clientRegister.matriculaDeGas}</p>
<p><b>Titular de gás cpf: </b>{clientRegister.titularGasCpf}</p>
<p className={style.pMb}><b>Nº de habitantes na residência: </b>{clientRegister.habitantes}</p> */}
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
