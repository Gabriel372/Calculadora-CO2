import style from './ClientRegisterPage.module.css'
import NavbarLoged from './NavbarLoged'
import { useState,useContext } from 'react';
import { ApiContext } from '../context/ApiContext'

// import ClientManager from './ClientManager'

// import { useNavigate } from "react-router-dom";
// import { useLocation } from 'react-router-dom';
// import ClientRegistered from './ClientRegistered';
// import LoginPage from '../page1/LoginPage';

function ClientRegisterPage() {

//*** PEGAR ID P/ CAPURAR TODOS OS CLIENTES DA API

// const navigate = useNavigate();
// const {state} = useLocation();
// const { admLoged } = state || {};
//true = deu certo o login

const [Population,setPopulation] = useState('')   
const [T_gascpf,setT_gascpf] = useState('')   
const [M_gas,setM_gas] = useState('') 
const [T_watercpf,setT_watercpf] = useState('') 
const [M_water,setM_water] = useState('') 
const [T_cpf,setT_cpf] = useState('') 
const [M_energy,setM_energy] = useState('')//codigo do cliente/energia 
const [Phone,setPhone] = useState('') 
const [Email,setEmail] = useState('') 
const [Adress,setAdress] = useState('') 
const [Cpf,setCpf] = useState('') 
const [Name,setName] = useState('') 
const [Project,setProject] = useState('') 
const [Data,setData] = useState('') 
const [Cons_eletric,setCons_eletric] = useState('')
const [Cons_water,setCons_water] = useState('')
const [Gen_waste,setGen_waste] = useState('')
const { Admincontext } = useContext(ApiContext);
// const [Id,setId] = useState('') //id gerado por api

const registerClick = () => {
if (Population && T_gascpf && M_gas && T_watercpf && M_water && T_cpf && 
M_energy && Phone && Email && Adress && Cpf && M_energy && Phone && Email 
&& Adress && Cpf && Name && Project && Data && Cons_eletric && Cons_water && Gen_waste) {

const clientRegister = {data:Data,projeto:Project,nome:Name,cpf:Cpf,endereco:Adress,email:Email,
telefone:Phone,matriculaDeEnergia:M_energy,titularEnergiaCpf:T_cpf,matriculaDeAgua:M_water,
titularAguaCpf:T_watercpf,matriculaDeGas:M_gas,titularGasCpf:T_gascpf,habitantes:Population } 

console.log(clientRegister);
fetch(`http://191.252.38.35:8080/api/clientes/salvar?email=${Admincontext.email}&senha=${Admincontext.senha}`,{
// fetch("http://localhost:5000/alladmins",{    
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(clientRegister) } )
.then((response) => { 
if (!response.ok) {
throw new Error(`Erro na solicitação: ${response.statusText}`);
}
return response.json();
})
.then((data) =>  {/* setId(data.id)*/;setPopulation('');setT_gascpf('');setM_gas('');
setT_watercpf('');setT_cpf('');setT_cpf('');setM_energy('');setPhone('');
setEmail('');setAdress('');setCpf('');setProject('');setCons_water('');
setCons_eletric('');setGen_waste('');setM_water(''); console.log(`json de clientes`,data);})
.catch((error) => console.log('erro ao registrar cliente',error)) 
//POST EMISSOES
 const [Year, Month, Day] = Data.split('-');
console.log(Year,Month,Day);
const emEnergy = {tipoEmissao:"energiaeletrica",nome:Name,cpf:Cpf,mes:Month,ano:Year,consumo:Cons_eletric} ; 
const emWater = {tipoEmissao:"agua",nome:Name,cpf:Cpf,mes:Month,ano:Year,consumo:Cons_water}  ;
const emResidue = {tipoEmissao:"residuos",nome:Name,cpf:Cpf,mes:Month,ano:Year,consumo:Gen_waste};  


    fetch(`http://191.252.38.35:8080/api/emissoes/salvar?email=${Admincontext.email}&senha=${Admincontext.senha}`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(emEnergy) } )
    .then((response) => { 
    if (!response.ok) {
    throw new Error(`Erro na solicitação: ${response.statusText}`); }
    return response.json(); })
    .then((data) =>  { setM_energy('') ;
    console.log('sucesso no post',data); 
    })
    .catch((error) => console.log('erro ao postar emissao',error))

    fetch(`http://191.252.38.35:8080/api/emissoes/salvar?email=${Admincontext.email}&senha=${Admincontext.senha}`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(emWater) } )
    .then((response) => { 
    if (!response.ok) {
    throw new Error(`Erro na solicitação: ${response.statusText}`); }
    return response.json(); })
    .then((data) =>  { setM_water('') ;
    console.log('sucesso no post',data);
    // navigate('/ClientRegistered') 
    })
    .catch((error) => console.log('erro ao postar emissao',error))

    fetch(`http://191.252.38.35:8080/api/emissoes/salvar?email=${Admincontext.email}&senha=${Admincontext.senha}`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(emResidue) } )
    .then((response) => { 
    if (!response.ok) {
    throw new Error(`Erro na solicitação: ${response.statusText}`); }
    return response.json(); })
    .then((data) =>  { setGen_waste('') ;setData('');setName('');
    console.log('sucesso no post',data);
    // navigate('/ClientRegistered') 
    })
    .catch((error) => console.log('erro ao postar emissao',error))
}
else {alert('Preencha os formularios') }} //CLICK REGISTER

const changeData = (e) =>{ setData(e.target.value);console.log(Data);}
const changePopulation = (e) =>{ setPopulation(e.target.value) }
const changeT_gascpf = (e) =>{ setT_gascpf(e.target.value) }
const changeM_gas = (e) =>{ setM_gas(e.target.value) }
const changeT_watercpf = (e) =>{ setT_watercpf(e.target.value) }
const changeM_water = (e) =>{ setM_water(e.target.value) }
const changeT_cpf = (e) =>{ setT_cpf(e.target.value) }
const changeM_energy = (e) =>{ setM_energy(e.target.value) }
const changePhone = (e) =>{ setPhone(e.target.value) }
const changeEmail = (e) =>{ setEmail(e.target.value) }
const changeAdress = (e) =>{ setAdress(e.target.value) }
const changeCpf = (e) =>{ setCpf(e.target.value) }
const changeName = (e) =>{ setName(e.target.value) }
const changeProject = (e) =>{ setProject(e.target.value) }
const changeCons_eletric = (e) =>{ setCons_eletric(e.target.value) }
const changeCons_water = (e) =>{ setCons_water(e.target.value) }
const changeGen_waste = (e) =>{ setGen_waste(e.target.value) }//geraçao de residuos

return <div> <NavbarLoged/>
<div className={style.container}>
   
    <h2>Registro do cliente</h2>
<div className={style.squareLogin}>
<label>Data de cadastro:<input className={style.inputDate} type="date" onChange={changeData} value={Data}/>
</label>
<input  type="text" placeholder='Projeto' onChange={changeProject} value={Project}/>
<input  type="text" placeholder='Nome completo' onChange={changeName} value={Name}/>
<input  type="number" placeholder='Cpf' onChange={changeCpf} value={Cpf}/>
<input  type="text" placeholder='Endereço' onChange={changeAdress} value={Adress}/>
<input  type="e-mail" placeholder='Email' onChange={changeEmail} value={Email}/>
<input  type="number"  placeholder='Telefone' onChange={changePhone} value={Phone}/>
<input  type="number"  placeholder='Código do cliente / energia' onChange={changeM_energy} value={M_energy}/>
<input  type="number" placeholder='Titular de energia do cpf' onChange={changeT_cpf} value={T_cpf}/>
<input  type="number" placeholder='Código do cliente / água' onChange={changeM_water} value={M_water}/>
<input  type="number" placeholder='Titular de água do cpf' onChange={changeT_watercpf} value={T_watercpf}/>
<input  type="number" placeholder='Código do cliente / gás' onChange={changeM_gas} value={M_gas}/>
<input type="number" placeholder='Titular de gás do cpf' onChange={changeT_gascpf} value={T_gascpf}/>
<input type="number" placeholder='Nº de habitantes na residência' onChange={changePopulation} value={Population}/>
<div><br/></div>
<input type="number" placeholder='Consumo de energia elétrica' onChange={changeCons_eletric} value={Cons_eletric}/>
<input type="number" placeholder='Consumo de água' onChange={changeCons_water} value={Cons_water}/>
<input type="number" placeholder='Geração de residuos' onChange={changeGen_waste} value={Gen_waste}/>
<button type='button' onClick={registerClick}>Enviar</button>
<button className={style.btnView} type='button'>Ver resultado</button>

</div>
{/* <ClientManager/> */}
{/* <ClientRegistered Id={Id}/> */}
</div>
</div>
}

export default ClientRegisterPage