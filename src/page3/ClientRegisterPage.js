import { json } from 'react-router-dom';
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
const [ConCo2EnEltrc,setConsCo2EnEltrc] = useState('0')
const [ConCo2Water,setConCo2Water] = useState('0')
const [ConCo2Resd,setConCo2Resd] = useState('0')
// const [ValueCon,setValueCon] = useState(0)
const [Year, Month, Day] = Data.split('-');
// const [ConsmApi,setConsmApi] = useState({})  
// const consumMonth={nome:Name,cpf:Cpf,projeto:Project,mes:Month,ano:Year,
//   consumo:`${parseFloat(ConCo2Water)+parseFloat(ConCo2EnEltrc)+parseFloat(ConCo2Resd)}`,taxaDeReducao:0} 
//  const cons = new ConsmObj('antonio','123','barra','11',)



  class ConsmObj {
    constructor(name, cpf, projeto, mes, ano, consumo, taxaDeReducao) {
      this.name = name;
      this.cpf = cpf;
      this.projeto = projeto;
      this.mes = mes;
      this.ano = ano;
      this.consumo = consumo;
      this.taxaDeReducao = taxaDeReducao;
    }
  }

  //JSON de consumoMensal: {"nome":"", "cpf":"", "projeto":"", "mes":"", "ano":"", "consumo":""}
  
  const registerClick = () => {
    // console.log(consumMonth);
      if (Population && T_gascpf && M_gas && T_watercpf && M_water && T_cpf && 
      M_energy && Phone && Email && Adress && Cpf && Name && Project && Data && Cons_eletric && Cons_water && Gen_waste) {
    
        const clientRegister = {data:Data,projeto:Project,nome:Name,cpf:Cpf,endereco:Adress,email:Email,
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
          .then((data) =>  { console.log('sucesso no post',data);SaveApiWater() })
          .catch((error) => console.log('erro ao postar emissao',error))

        const SaveApiWater = () => { 
          const emWater = {tipoEmissao:"agua",nome:Name,cpf:Cpf,mes:Month,ano:Year,gasto:Cons_water,consumo:0}  ;
        
         fetch(`http://191.252.38.35:8080/api/emissoes/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(emWater) } )
            .then((response) => { 
            if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`); }
            return response.json(); })
            .then((data) =>  { console.log('sucesso no post',data);setConCo2Water(data.consumo);SaveApiEnElctr() })
    .catch((error) => console.log('erro ao postar emissao',error))
        }
  
        const SaveApiEnElctr = () => { 
          const emEnergy = {tipoEmissao:"energiaeletrica",nome:Name,cpf:Cpf,mes:Month,ano:Year,gasto:Cons_eletric,consumo:0 }
        
        fetch(`http://191.252.38.35:8080/api/emissoes/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(emEnergy) } )
            .then((response) => { 
            if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`); }
            return response.json(); })
            .then((data) =>  { console.log('sucesso no post',data); setConsCo2EnEltrc(data.consumo);SaveApiResd()})
            .catch((error) => console.log('erro ao postar emissao',error))
        }
        
        const SaveApiResd = () => { 
          const emResidue = {tipoEmissao:"residuos",nome:Name,cpf:Cpf,mes:Month,ano:Year,gasto:Gen_waste,consumo:0};
        
        fetch(`http://191.252.38.35:8080/api/emissoes/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(emResidue) } )
            .then((response) => { 
            if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`); }
            return response.json(); })
            .then((data) =>  { console.log('sucesso no post',data);setConCo2Resd(data.consumo);SaveApiConsMonth()
          } )
            .catch((error) => console.log('erro ao postar emissao',error))
        }
  
        const SaveApiConsMonth = () => {  
      // consumMonth.consumo =parseFloat(ConCo2Water)+parseFloat(ConCo2EnEltrc)+parseFloat(ConCo2Resd) ;
          // consumMonth.consumo =`${parseFloat(ConCo2Water)+parseFloat(ConCo2EnEltrc)+parseFloat(ConCo2Resd)}`  ;

// const consumMonth={nome:Name,cpf:Cpf,projeto:Project,mes:Month,ano:Year,
//   consumo:`${parseFloat(ConCo2Water)+parseFloat(ConCo2EnEltrc)+parseFloat(ConCo2Resd)}`,taxaDeReducao:0} 
let sum = parseFloat(ConCo2Water)+parseFloat(ConCo2EnEltrc)+parseFloat(ConCo2Resd)
 const consumMonth = new ConsmObj(Name,Cpf,Project,Month,Year,`${sum}`,0 )

  setTimeout(()=> {

    console.log(consumMonth);
       fetch(`http://191.252.38.35:8080/api/consumoMensal/salvar?email=marcos@gmail.com&senha=1234567`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(consumMonth) } )
            .then((response) => { 
            if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`); }
            return response.json(); })
            .then((data) =>  { console.log('sucesso no post conumo mensal',data);setInterruptMsg(true);
            setTimeout(() => {setInterruptMsg(false)} ,8000) })
            .catch((error) => {console.log('erro ao postar cons. mensal',error);console.log(consumMonth);  }) 
    //   console.log(consumMonth);
    },5000)
        }
  
      }
      else {alert('Preencha os formularios'); 
    }} //CLICK REGISTER
  
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

const CleanValue = () =>{ setPopulation('');setT_gascpf('');setM_gas('');setName('')
setT_watercpf('');setT_cpf('');setM_energy('');setPhone('');setData('');
setEmail('');setAdress('');setCpf('');setProject('');setCons_water('');
setCons_eletric('');setGen_waste('');setM_water(''); setGen_waste('') ;setName('');
setConCo2Resd('');setConCo2Water('');setConsCo2EnEltrc('');
}

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
{/* <div><hr/></div> */}
<input className={style.inputMarginT} type="number" placeholder='Consumo de energia elétrica' onChange={changeCons_eletric} value={Cons_eletric}/>
<input type="number" placeholder='Consumo de água' onChange={changeCons_water} value={Cons_water}/>
<input className={style.inputMarginB} type="number" placeholder='Geração de residuos' onChange={changeGen_waste} value={Gen_waste}/>
<p className={InterruptMsg ? style.msgVisible : style.msgHidden}>Cadastrado com successo !</p>
<button type='button' onClick={registerClick}>Enviar</button>
<button className={style.btnView} type='button'>Ver resultado</button>

</div>

</div>
</div>
}

export default ClientRegisterPage