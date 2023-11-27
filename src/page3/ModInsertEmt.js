import style from './ModInsertEmt.module.css'
import { AiOutlineClose } from 'react-icons/ai';
import { useState,useEffect } from 'react'

function ModInsertEmt(props) {
const [Cons_eletric,setCons_eletric] = useState('')
 const [Cons_water,setCons_water] = useState('')
 const [Gen_waste,setGen_waste] = useState('')
 const [Month,setMonth] = useState('')
 const [Year,setYear] = useState('')
const [ClientEmition,setClientEmition] = useState({...props.ClientEmt}) 
const [InterruptMsg,setInterruptMsg] = useState(false)

useEffect(() => {
setClientEmition({...props.ClientEmt})
}, [props.ClientEmt,props.ModInterruptEMit,props.Found]);

const clickClose = () => {
setCons_eletric('') ;setCons_water('') ;setGen_waste('') ;setYear('');setMonth('');
props.setModInterruptEMit(false); }   

const changeCons_eletric = (e) =>{ setCons_eletric(e.target.value); }
const changeCons_water = (e) =>{ setCons_water(e.target.value) }
const changeGen_waste = (e) =>{ setGen_waste(e.target.value) }

const changeSelYear = (e) => { setYear(e.target.value) ; }
const changeSelMonth = (e) => { setMonth(e.target.value) ;}

const clickInsert = () => {
    if (Cons_eletric && Cons_water && Gen_waste && Year && Month) {
    
    const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))
    
    const emEnergy = {tipoEmissao:"energiaeletrica",nome:props.ClientEmt.nome,cpf:props.ClientEmt.cpf,mes:Month,ano:Year,gasto:Cons_eletric,consumo:0 } ; 
    const emWater = {tipoEmissao:"agua",nome:props.ClientEmt.nome,cpf:props.ClientEmt.cpf,mes:Month,ano:Year,gasto:Cons_water,consumo:0}  ;
    const emResidue = {tipoEmissao:"residuos",nome:props.ClientEmt.nome,cpf:props.ClientEmt.cpf,mes:Month,ano:Year,gasto:Gen_waste,consumo:0};
    
        fetch(`http://191.252.38.35:8080/api/emissoes/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(emEnergy) } )
        .then((response) => { 
        if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.statusText}`); }
        return response.json(); })
        .then((data) =>  { 
        console.log('sucesso no post',data); 
        })
        .catch((error) => console.log('erro ao postar emissao',error))
    
        fetch(`http://191.252.38.35:8080/api/emissoes/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(emWater) } )
        .then((response) => { 
        if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.statusText}`); }
        return response.json(); })
        .then((data) =>  { 
        console.log('sucesso no post',data);
        })
        .catch((error) => console.log('erro ao postar emissao',error))
    
        fetch(`http://191.252.38.35:8080/api/emissoes/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(emResidue) } )
        .then((response) => { 
        if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.statusText}`); }
        return response.json(); })
        .then((data) =>  {
        setInterruptMsg(true);
setTimeout(() => {setInterruptMsg(false)} ,8000) 
      setCons_eletric('') ;setCons_water('') ;setGen_waste('') ;setYear('');setMonth('');
        console.log('sucesso no post',data);
        })
        .catch((error) => console.log('erro ao postar emissao',error))
    }
    else {alert('Preencha os formularios') }
}

return <div className={props.ModInterruptEMit ? style.modalOn : style.modalOff }>
  <div className={style.squareEdit}> 
  <div className={style.divHeader}>
 <h2 className={style.h2ModEmit}>Inserção de emissões mensais</h2>   
 <button className={style.btnClose} onClick={clickClose}>  <AiOutlineClose /></button>
 </div>

 <div className={style.pModEmit}>

<div>
<p className={style.pModText}>Projeto: {ClientEmition.projeto}</p>
<p className={style.pModText}>Cpf: {ClientEmition.cpf}</p>
<p className={style.pModText}>Nome: {ClientEmition.nome}</p>
</div>

<div className={style.divSelEmt}>
<p className={style.pModText}>Selecione o ano:</p>

<select className={style.selEmYear} onChange={changeSelYear} placeholder='selecioneee' value={Year}>
<option value=''></option>
  {Array.from({ length: 31 }, (_, i) => i + 2023).map(num => (
    <option className={style.selEmYear}  key={num} value={num}>{num}</option>
  ))}
</select>

<p className={style.pModText}>Selecione o mês:</p>

<select className={style.selEmMonth} onChange={changeSelMonth} value={Month}>
<option value=''></option>
  {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
   'Outubro', 'Novembro', 'Dezembro'].map((mes, index) => (
    <option key={index} value={index + 1}>{mes}</option>
  ))}
</select>
</div>

</div>
 <input  type="number" placeholder='Consumo de energia elétrica kwh' onChange={changeCons_eletric} autoFocus value={Cons_eletric}/>
<input type="number" placeholder='Consumo de água m³' onChange={changeCons_water} value={Cons_water}/>
<input  type="number" placeholder='Geração de residuos kg' onChange={changeGen_waste} value={Gen_waste}/>

<button className={style.btnUpdate} onClick={clickInsert}>Inserir </button>
<p className={InterruptMsg ? style.msgVisible : style.msgHidden}>Inseridas com successo !</p>
</div>

</div>
}

export default ModInsertEmt 