import style from './MdEdtEmtEletrEn.module.css'
import { AiOutlineClose } from 'react-icons/ai';
import { useState,useEffect } from 'react' //AiOutlineClose

function MdEdtEmtEletrEn(props) {

const [Client,setClient] = useState({...props.ClientView}) 
const [Cons_EletrEn,setCons_EletrEn] = useState('')
const [Year,setYear] = useState(props.EltrEnEdt.ano)//props.EltrEnEdt.emissoes.energiaeletrica.ano
const [Month,setMonth] = useState(props.EltrEnEdt.mes)
const [InterruptMsg,setInterruptMsg] = useState(false)

useEffect(() => {
  setClient({...props.ClientView})
  setYear(props.EltrEnEdt.ano)
  setMonth(props.EltrEnEdt.mes)
  }, [props.IntrruptMdEdtEmt,props.ClientView,props.EltrEnEdt]);

const clickClose = () => {
setYear('')
setMonth('')
setCons_EletrEn('')
// setCons_water('')
props.setIntrrptMdEdtEmtEletrEn(false); 
}   

const changeSelYear = (e) => { setYear(e.target.value) ;}
const changeSelMonth = (e) => { setMonth(e.target.value) ;}
const changeCons_EletrEn = (e) =>{ setCons_EletrEn(e.target.value); }

const clickUpdate = () => {
if (Cons_EletrEn ) {
  const emEletrEn = {tipoEmissao:"energiaeletrica",nome:props.ClientView.nome,cpf:props.ClientView.cpf,mes:Month,ano:Year,gasto:Cons_EletrEn,consumo:0}  ;
  
  fetch(`http://191.252.38.35:8080/api/emissoes/${props.EltrEnEdt.id}`,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(emEletrEn) } )
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
console.log('ok');
}

return <div className={props.IntrrptMdEdtEmtEletrEn ? style.modalOn : style.modalOff }>
 <div className={style.squareEdit}>

<div className={style.divHeader}>
 <h2>Editar emissão :Energia elétrica</h2>
 <button className={style.btnClose} onClick={clickClose}>  <AiOutlineClose /></button>
 </div>

 <div className={style.divInpEdtEmt}>
 <p>Projeto: {Client.projeto}</p>
 <p >Cpf: {Client.cpf}</p>
 <p>Nome: {Client.nome}</p>
 </div>
<br></br>

<div className={style.divInpEdtEmt}>

<div>
<p className={style.pModText}>Selecione o ano:</p>
<select value={Year} className={style.selEmYear} onChange={changeSelYear} placeholder='selecioneee'>
  {Array.from({ length: 31 }, (_, i) => i + 2023).map(num => (
    <option className={style.optEdtEmtYear}  key={num} value={num}>{num}</option>
  ))}
</select>
</div>

<div className={style.mgInput}>
<p className={style.pModText}>Selecione o mês:</p>
<select value={Month} className={style.selEmMonth} onChange={changeSelMonth}>
  {['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
   'Outubro', 'Novembro', 'Dezembro'].map((mes, index) => (
    <option key={index} value={index + 1}>{mes}</option>
  ))}
</select>
</div>

<div className={style.mgInput}>
<p className={style.pModText}>Digite o consumo de energia:</p>
 <input className={style.inptEdtEmt}type="number" onChange={changeCons_EletrEn} placeholder='kwh' value={Cons_EletrEn}/>
 </div>

</div>

<button className={style.btnUpdate} onClick={clickUpdate}>Atualizar </button>
<p className={InterruptMsg ? style.msgVisible : style.msgHidden}>Editado com successo !</p>

 </div>

</div>
}

export default MdEdtEmtEletrEn 