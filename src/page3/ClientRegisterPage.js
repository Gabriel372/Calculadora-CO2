import style from './ClientRegisterPage.module.css'
import NavbarLoged from './NavbarLoged'
import { useState } from 'react';
// import { ApiContext } from '../context/ApiContext'

function ClientRegisterPage() {
const [Population,setPopulation] = useState('')   
const [T_gascpf,setT_gascpf] = useState('')   
const [M_gas,setM_gas] = useState('') 
const [T_watercpf,setT_watercpf] = useState('') 
const [M_water,setM_water] = useState('') 
const [T_cpf,setT_cpf] = useState('') 
const [M_energy,setM_energy] = useState('')
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
const [InterruptMsg,setInterruptMsg] = useState(false)
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))
const [Year, Month, Day] = Data.split('-');
const [IntrrptResgist,setIntrrptResgist] = useState(false)


  const registerClick = () => {
      if (!IntrrptResgist && Population && T_gascpf && M_gas && T_watercpf && M_water && T_cpf && 
      M_energy && Phone && Email && Adress && Cpf && Name && Project && Data && Cons_eletric && Cons_water && Gen_waste) {
        let ProjectValLower = Project.toLowerCase() ;
        setIntrrptResgist(true) ;

        const clientRegister = {data:Data,projeto:ProjectValLower,nome:Name,cpf:Cpf,endereco:Adress,email:Email,
        telefone:Phone,matriculaDeEnergia:M_energy,titularEnergiaCpf:T_cpf,matriculaDeAgua:M_water,
        titularAguaCpf:T_watercpf,matriculaDeGas:M_gas,titularGasCpf:T_gascpf,habitantes:Population} 
    
          fetch(`http://191.252.38.35:8080/api/clientes/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(clientRegister) } )
          .then((response) => { 
          if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.statusText}`); }
          return response.json(); })
          .then(() =>  { SaveApiWater() ; setIntrrptResgist(false) ;  })
          .catch((error) => console.log('erro ao postar emissao',error))

        const SaveApiWater = () => { 
          const emWater = {tipoEmissao:"agua",nome:Name,cpf:Cpf,mes:Month,ano:Year,gasto:Cons_water,consumo:0,taxaDeReducao:0}  ;
        
         fetch(`http://191.252.38.35:8080/api/emissoes/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(emWater) } )
            .then((response) => { 
            if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`); }
            return response.json(); })
            .then(() =>  { SaveApiEnElctr() })
    .catch((error) => console.log('erro ao postar emissao',error)   )   }
  
        const SaveApiEnElctr = () => { 
          const emEnergy = {tipoEmissao:"energiaeletrica",nome:Name,cpf:Cpf,mes:Month,ano:Year,gasto:Cons_eletric,consumo:0,taxaDeReducao:0}
        
        fetch(`http://191.252.38.35:8080/api/emissoes/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(emEnergy) } )
            .then((response) => { 
            if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`); }
            return response.json(); })
            .then(() =>  { SaveApiResd()})
            .catch((error) => console.log('erro ao postar emissao',error)) }
        
        const SaveApiResd = () => { 
          const emResidue = {tipoEmissao:"residuos",nome:Name,cpf:Cpf,mes:Month,ano:Year,gasto:Gen_waste,consumo:0,taxaDeReducao:0}
        
        fetch(`http://191.252.38.35:8080/api/emissoes/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(emResidue) } )
            .then((response) => { 
            if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`); }
            return response.json(); })
            .then(() =>  { ;SaveApiConsMonth() } )
            .catch((error) => console.log('erro ao postar emissao',error))  }

        const SaveApiConsMonth = () => {  
const consumMonth={nome:Name,cpf:Cpf,projeto:Project,mes:Month,ano:Year,consumo:0,taxaDeReducao:0,beneficio:0} 
       fetch(`http://191.252.38.35:8080/api/consumoMensal/criaConsumoMensal?email=${admStorage.email}&senha=${admStorage.senha}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(consumMonth) } )
            .then((response) => { 
            if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`); }
            return response.json(); })
            .then(() =>  { ;CleanValue()
            setInterruptMsg(true);setTimeout(() => {setInterruptMsg(false)} ,8000) })
            .catch((error) => {console.log('erro ao postar cons. mensal',error);console.log(consumMonth);  })  } }
      else {alert('Preencha os formularios');  }} //CLICK REGISTER
  
function CleanValue() { setPopulation('');setT_gascpf('');setM_gas('');setName('')
setT_watercpf('');setT_cpf('');setM_energy('');setPhone('');setData('');
setEmail('');setAdress('');setCpf('');setProject('');setCons_water('');
setCons_eletric('');setGen_waste('');setM_water(''); setGen_waste('') ;setName(''); }

return <div> <NavbarLoged/>
<div className={style.container}>
   
    <h2>Cadastrado do cliente</h2>
<div className={style.squareLogin}>
<label>Data de cadastro:<input className={style.inputDate} type="date" onChange={(e)=> setData(e.target.value) } value={Data}/>
</label>
<input  type="text" placeholder='Projeto' onChange={(e)=> setProject(e.target.value) } autoComplete="on" value={Project}/>
<input  type="text" placeholder='Nome completo' onChange={(e)=> setName(e.target.value) } value={Name}/>
<input  type="number" placeholder='Cpf' onChange={(e)=> setCpf(e.target.value) } value={Cpf}/>
<input  type="text" placeholder='Endereço' onChange={(e)=> setAdress(e.target.value) } value={Adress}/>
<input  type="e-mail" placeholder='Email' onChange={(e)=> setEmail(e.target.value) } value={Email}/>
<input  type="number"  placeholder='Telefone' onChange={(e)=> setPhone(e.target.value) } value={Phone}/>
<input  type="number"  placeholder='Código do cliente / energia' onChange={(e)=> setM_energy(e.target.value) } value={M_energy}/>
<input  type="number" placeholder='Titular de energia do cpf' onChange={(e)=> setT_cpf(e.target.value) } value={T_cpf}/>
<input  type="number" placeholder='Código do cliente / água' onChange={(e)=> setM_water(e.target.value) }value={M_water}/>
<input  type="number" placeholder='Titular de água do cpf' onChange={(e)=> setT_watercpf(e.target.value) } value={T_watercpf}/>
<input  type="number" placeholder='Código do cliente / gás' onChange={(e)=> setM_gas(e.target.value) } value={M_gas}/>
<input type="number" placeholder='Titular de gás do cpf' onChange={(e)=> setT_gascpf(e.target.value) } value={T_gascpf}/>
<input type="number" placeholder='Nº de habitantes na residência' onChange={(e)=> setPopulation(e.target.value) } value={Population}/>
<input className={style.inputMarginT} type="number" placeholder='Consumo de energia elétrica' onChange={(e)=> setCons_eletric(e.target.value) } value={Cons_eletric}/>
<input type="number" placeholder='Consumo de água' onChange={(e)=> setCons_water(e.target.value) } value={Cons_water}/>
<input className={style.inputMarginB} type="number" placeholder='Geração de residuos' onChange={(e)=> setGen_waste(e.target.value) } value={Gen_waste}/>

<p className={InterruptMsg ? style.msgVisible : style.msgHidden}>Cadastrado com sucesso !</p>
<button type='button' onClick={registerClick}>Enviar</button>
<button className={style.btnView} type='button'>Ver resultado</button>

</div>

</div>
</div>
}

export default ClientRegisterPage