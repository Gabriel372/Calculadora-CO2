import style from './MdEdtEmtResd.module.css'
import { AiOutlineClose } from 'react-icons/ai';
import { useState,useEffect } from 'react' 

function MdEdtEmtResd(props) {

const [Cons_Resd,setCons_Resd] = useState('')
const [Year,setYear] = useState(props.ResdEdt.ano)
const [Month,setMonth] = useState(props.ResdEdt.mes)
const [InterruptMsg,setInterruptMsg] = useState(false)

useEffect(() => {
  setYear(props.ResdEdt.ano)
  setMonth(props.ResdEdt.mes)
  }, [props.IntrruptMdEdtEmt,props.ClientView,props.ResdEdt]);

const clickClose = () => {
setYear('')
setMonth('')
setCons_Resd('')
props.setIntrrptMdEdtEmtResd(false); 
}   

const changeSelYear = (e) => { setYear(e.target.value) ;}
const changeSelMonth = (e) => { setMonth(e.target.value) ;}
const changeCons_Resd = (e) =>{ setCons_Resd(e.target.value); }

const clickUpdate = () => {
if (Cons_Resd ) {
  const emResd = {tipoEmissao:"residuos",nome:props.ClientView.nome,cpf:props.ClientView.cpf,mes:Month,ano:Year,gasto:Cons_Resd,consumo:0}  ;
  
  fetch(`http://191.252.38.35:8080/api/emissoes/${props.ResdEdt.id}`,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(emResd) } )
    .then((response) => { 
    if (!response.ok) {
    throw new Error(`Erro na solicitação: ${response.statusText}`); }
    return response.json(); })
    .then((data) =>  { 
    console.log('sucesso no post',data);setInterruptMsg(true);
    setTimeout(()=>setInterruptMsg(false),8000);
    })
    .catch((error) => console.log('erro ao postar emissao',error))

}

else {alert('Preencha os formularios') }
}

return <div className={props.IntrrptMdEdtEmtResd ? style.modalOn : style.modalOff }>
 <div className={style.squareEdit}>

<div className={style.divHeader}>
 <h2>Editar emissão :Resíduos</h2>
 <button className={style.btnClose} onClick={clickClose}>  <AiOutlineClose /></button>
 </div>

 <div className={style.divInfoClient}>
 <p >Projeto: {props.ClientView.projeto}</p>
 <p >Cpf: {props.ClientView.cpf}</p>
 <p>Nome: {props.ClientView.nome}</p>
 </div>
<br></br>

<div className={style.divInpEdtEmt}>

<div className={style.Mright}>
<p className={style.pModText}>Selecione o ano:</p>
<select value={Year} className={style.selEmYear} onChange={changeSelYear} placeholder='selecioneee' >
  {Array.from({ length: 31 }, (_, i) => i + 2023).map(num => (
    <option className={style.optEdtEmtYear}  key={num} value={num}>{num}</option>
  ))}
</select>
</div>

<div className={style.Mright}>
<p className={style.pModText}>Selecione o mês:</p>
<select value={Month} className={style.selEmMonth} onChange={changeSelMonth}>
  {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
   'Outubro', 'Novembro', 'Dezembro'].map((mes, index) => (
    <option key={index} value={index + 1}>{mes}</option>
  ))}
</select>
</div>

<div>
<p className={style.pModText}>Digite a quantidade de resíduo gerado:</p>
 <input className={style.inptEdtEmt}type="number" onChange={changeCons_Resd} placeholder='kg' value={Cons_Resd}/>
 </div>

</div>

<button className={style.btnUpdate} onClick={clickUpdate}>Atualizar </button>
<p className={InterruptMsg ? style.msgVisible : style.msgHidden}>Editado com successo !</p>

 </div>

</div>
}

export default MdEdtEmtResd