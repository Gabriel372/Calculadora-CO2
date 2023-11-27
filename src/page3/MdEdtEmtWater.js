import style from './MdEdtEmtWater.module.css'
import { AiOutlineClose } from 'react-icons/ai';
import { useEffect,useState } from 'react' 

function MdEdtEmtWater(props) {
const [Client,setClient] = useState({...props.ClientView}) 
const [Cons_water,setCons_water] = useState('')
const [Year,setYear] = useState(props.WaterEdt.ano)
const [Month,setMonth] = useState(props.WaterEdt.mes)
const [InterruptMsg,setInterruptMsg] = useState(false)

useEffect(() => {
  setClient({...props.ClientView})
  setYear(props.WaterEdt.ano)
  setMonth(props.WaterEdt.mes)
  }, [props.IntrrptMdEdtEmtWater,props.ClientView,props.WaterEdt]);

const clickClose = () => {
setYear('')
setMonth('')
setCons_water('')
props.setIntrrptMdEdtEmtWater(false); 
}   

const changeSelYear = (e) => { setYear(e.target.value) ;}
const changeSelMonth = (e) => { setMonth(e.target.value) ;}
const changeCons_water = (e) =>{ setCons_water(e.target.value); }

const clickUpdate = () => {
if (Cons_water ) {
  const emWater = {tipoEmissao:"agua",nome:Client.nome,cpf:Client.cpf,mes:Month,ano:Year,gasto:Cons_water,consumo:0}  ;
  
  fetch(`http://191.252.38.35:8080/api/emissoes/${props.WaterEdt.id}`,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(emWater) } )
    .then((response) => { 
    if (!response.ok) {
    throw new Error(`Erro na solicitação: ${response.statusText}`); }
    return response.json(); })
    .then((data) =>  { 
    console.log('sucesso no post',data);setInterruptMsg(true);
    setTimeout(()=>setInterruptMsg(false),8000);
    props.setActiveMdEdtWater(false)
    })
    .catch((error) => console.log('erro ao postar emissao',error))
}
else {alert('Preencha os formularios') }
}

return <div className={props.IntrrptMdEdtEmtWater ? style.modalOn : style.modalOff }>

<div className={style.squareEdit}>

<div className={style.divHeader}>
 <h2>Editar emissão :Água</h2>
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
<select  className={style.selEmYear} onChange={changeSelYear} value={Year}>

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
<p className={style.pModText}>Digite o consumo de água:</p>
 <input className={style.inptEdtEmt}type="number" onChange={changeCons_water} placeholder='m³' value={Cons_water}/>
 </div>
 
 </div>

 <button className={style.btnUpdate} onClick={clickUpdate}>Atualizar </button>
 <p className={InterruptMsg ? style.msgVisible : style.msgHidden}>Editado com successo !</p>

</div>

</div>
}

export default MdEdtEmtWater 