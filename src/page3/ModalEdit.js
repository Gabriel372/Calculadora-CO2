import style from './ModalEdit.module.css'
import { useState ,useEffect} from 'react'
import { AiOutlineClose } from 'react-icons/ai';

function ModalEdit(props) {
    const [InterruptMsg,setInterruptMsg] = useState(false)
    const [ClientUpdt,setClientUpdt] = useState({...props.Clientedit}) 

  useEffect(() => {
setClientUpdt({...props.Clientedit})
  }, [props.Clientedit]);

const clickClose = () => {
  props.clickSearch(); 
    setClientUpdt({...props.Clientedit})
    setInterruptMsg(false)
    props.setModInterruptEdit(false); }

const clickUpdate= () => {
if ( ClientUpdt.data && ClientUpdt.projeto && ClientUpdt.nome && ClientUpdt.cpf && ClientUpdt.endereco && ClientUpdt.endereco
&& ClientUpdt.telefone && ClientUpdt.matriculaDeEnergia && ClientUpdt.titularEnergiaCpf && ClientUpdt.matriculaDeAgua
&& ClientUpdt.titularAguaCpf && ClientUpdt.matriculaDeGas && ClientUpdt.titularGasCpf && ClientUpdt.habitantes !== '' ) {  
  
const ClientPost = {data:ClientUpdt.data,projeto:ClientUpdt.projeto,nome:ClientUpdt.nome,cpf:ClientUpdt.cpf,endereco:ClientUpdt.endereco,email:ClientUpdt.email,
telefone:ClientUpdt.telefone,matriculaDeEnergia:ClientUpdt.matriculaDeEnergia,titularEnergiaCpf:ClientUpdt.titularEnergiaCpf,matriculaDeAgua:ClientUpdt.matriculaDeAgua,
titularAguaCpf:ClientUpdt.titularAguaCpf,matriculaDeGas:ClientUpdt.matriculaDeGas,titularGasCpf:ClientUpdt.titularGasCpf,habitantes:ClientUpdt.habitantes } 

fetch(`http://191.252.38.35:8080/api/clientes/${ClientUpdt.id}`,{
 method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(ClientPost) } )
.then((response) => { 
if (!response.ok) { throw new Error(`Erro na solicitação: ${response.statusText}`);}
return response.json(); })
.then((data) =>  {
  if (ClientUpdt.nome !== props.Clientedit.nome || ClientUpdt.cpf !== props.Clientedit.cpf) {
    UpdateEmWater() }  
 console.log(`cliente atualizado`,data);})
.catch((error) => console.log('erro ao atualizar cliente',error)) 

function UpdateEmWater() { 
  
props.Clientedit.emissoes.agua.forEach( emissao => {
  let emWater = {tipoEmissao:"agua",nome:ClientUpdt.nome,cpf:ClientUpdt.cpf,mes:props.Clientedit.emissoes.agua.mes,ano:props.Clientedit.emissoes.agua.ano,gasto:props.Clientedit.emissoes.agua.gasto,consumo:0,taxaDeReducao:0}

  fetch(`http://191.252.38.35:8080/api/emissoes/${emissao.id}`,{
  method:"PUT",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(emWater) } )
  .then((response) => { 
  if (!response.ok) {
  throw new Error(`Erro na solicitação: ${response.statusText}`); }
  return response.json(); })
  .then((data) =>  { 
  console.log('sucesso no post',data);UpdateEmEnEletr() })
  .catch((error) => console.log('erro ao postar emissao',error))  });  }

  function UpdateEmEnEletr() { 
  
    props.Clientedit.emissoes.energiaeletrica.forEach( emissao => {

      let emEnEletr = {tipoEmissao:"energiaeletrica",nome:ClientUpdt.nome,cpf:ClientUpdt.cpf,mes:props.Clientedit.emissoes.energiaeletrica.mes,ano:props.Clientedit.emissoes.energiaeletrica.ano,gasto:props.Clientedit.emissoes.energiaeletrica.gasto,consumo:0,taxaDeReducao:0} ;

      fetch(`http://191.252.38.35:8080/api/emissoes/${emissao.id}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(emEnEletr) } )
      .then((response) => { 
      if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.statusText}`); }
      return response.json(); })
      .then((data) =>  { console.log('sucesso no post',data); UpdateEmResidue()    })
      .catch((error) => console.log('erro ao postar emissao',error))  });  }

      function UpdateEmResidue() { 
  
        props.Clientedit.emissoes.residuos.forEach( emissao => {
    
          let emResidue = {tipoEmissao:"residuos",nome:ClientUpdt.nome,cpf:ClientUpdt.cpf,mes:props.Clientedit.emissoes.residuos.mes,ano:props.Clientedit.emissoes.residuos.ano,gasto:props.Clientedit.emissoes.residuos.gasto,consumo:0,taxaDeReducao:0}
        
          fetch(`http://191.252.38.35:8080/api/emissoes/${emissao.id}`,{
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(emResidue) } )
          .then((response) => { 
          if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.statusText}`); }
          return response.json(); })
          .then((data) =>  { 
          console.log('sucesso no post',data);
          setInterruptMsg(true); setTimeout(() => setInterruptMsg(false), 8000)  })
          .catch((error) => console.log('erro ao postar emissao',error))  });  }
}//fechamento do 1º if
else{ alert('Preencha os formularios') } }

const changeProject = (e) =>{ setClientUpdt({...ClientUpdt, projeto:e.target.value }) }
const changeData = (e) => { setClientUpdt({...ClientUpdt, data:e.target.value }) }
const changePopulation = (e) =>{ setClientUpdt({...ClientUpdt, habitantes:e.target.value }) }
const changeT_gascpf = (e) => { setClientUpdt({...ClientUpdt, titularGasCpf:e.target.value }) }
const changeT_watercpf = (e) => { setClientUpdt({...ClientUpdt, titularAguaCpf:e.target.value }) }
const changeT_energycpf = (e) => { setClientUpdt({...ClientUpdt, titularEnergiaCpf:e.target.value }) }
const changeM_gas = (e) => { setClientUpdt({...ClientUpdt, matriculaDeGas:e.target.value }) }
const changeM_water = (e) => { setClientUpdt({...ClientUpdt, matriculaDeAgua:e.target.value }) }
const changeM_energy = (e) => { setClientUpdt({...ClientUpdt, matriculaDeEnergia:e.target.value }) }
const changePhone = (e) => { setClientUpdt({...ClientUpdt, telefone:e.target.value }) }
const changeEmail = (e) => { setClientUpdt({...ClientUpdt, email:e.target.value }) }
const changeAdress = (e) =>{ setClientUpdt({...ClientUpdt, endereco:e.target.value }) }
const changeCpf = (e) =>{ setClientUpdt({...ClientUpdt, cpf:e.target.value }) }
const changeName = (e) =>{ setClientUpdt({...ClientUpdt, nome:e.target.value }) }

return <div className={props.ModInterruptEdit ? style.modalOn : style.modalOff }>
 <div className={style.squareEdit}> 
 <div className={style.divHeader}>
 <h2>Editar cliente</h2>   
  <button className={style.btnClose} onClick={clickClose}>  <AiOutlineClose /></button>
 </div>
 <label className={style.labelModEdit}>Data de cadastro:<input className={style.inputModEdit} type="date" onChange={changeData} value={ClientUpdt.data}/></label>
<label className={style.labelModEdit} >Projeto: <input className={style.inputModEdit} type="text" placeholder='Projeto' onChange={changeProject} value={ClientUpdt.projeto}/></label>
<label className={style.labelModEdit}>Nome completo: <input className={style.inputModEdit} type="text" placeholder='Nome completo' onChange={changeName} value={ClientUpdt.nome}/></label>
<label className={style.labelModEdit}>Cpf: <input className={style.inputModEdit} type="number" placeholder='Cpf' onChange={changeCpf} value={ClientUpdt.cpf}/></label>
<label className={style.labelModEdit}>Endereço <input className={style.inputModEdit} type="text" placeholder='Endereço' onChange={changeAdress} value={ClientUpdt.endereco}/></label>
<label className={style.labelModEdit}>Email: <input className={style.inputModEdit} type="e-mail" placeholder='Email' onChange={changeEmail} value={ClientUpdt.email}/></label>
<label className={style.labelModEdit}>Telefone: <input className={style.inputModEdit} type="number"  placeholder='Telefone' onChange={changePhone} value={ClientUpdt.telefone}/></label>
<label className={style.labelModEdit}>Titular de energia cpf:<input className={style.inputModEdit} type="number" placeholder='Titular de energia do cpf' onChange={changeT_energycpf} value={ClientUpdt.titularEnergiaCpf}/></label>
<label className={style.labelModEdit}>Titular de gas cpf:<input className={style.inputModEdit} type="number" placeholder='Titular de gás do cpf' onChange={changeT_gascpf} value={ClientUpdt.titularGasCpf}/></label>
<label className={style.labelModEdit}>Titular de água cpf:<input className={style.inputModEdit} type="number" placeholder='Titular de água do cpf' onChange={changeT_watercpf} value={ClientUpdt.titularAguaCpf}/></label>
<label className={style.labelModEdit}>Código do clinete / energia:<input className={style.inputModEdit} type="number"  placeholder='Código do cliente / energia' onChange={changeM_energy} value={ClientUpdt.matriculaDeEnergia}/></label>
<label className={style.labelModEdit}>Código do cliente / gás:<input className={style.inputModEdit} type="number" placeholder='Código do cliente / gás' onChange={changeM_gas} value={ClientUpdt.matriculaDeGas}/></label>
<label className={style.labelModEdit}>Código do cliente / água:<input className={style.inputModEdit} type="number" placeholder='Código do cliente / água' onChange={changeM_water} value={ClientUpdt.matriculaDeAgua}/></label>
<label className={style.labelModEdit}>Nº de habitantes na residência:<input className={style.inputModEdit} type="number" placeholder='Nº de habitantes na residência' onChange={changePopulation} value={ClientUpdt.habitantes}/></label>
<button className={style.btnUpdate} onClick={clickUpdate}>Atualizar </button>

<p className={InterruptMsg ? style.msgVisible : style.msgHidden}>Editado com successo !</p>
</div> 
</div>
}

export default ModalEdit 