import style from './ModViewEmit.module.css'
import { AiOutlineClose } from 'react-icons/ai';
import { useState,useEffect } from 'react' //AiOutlineClose
import MdEdtEmtWater from './MdEdtEmtWater';
import MdEdtEmtEletrEn from './MdEdtEmtEletrEn'
import MdEdtEmtResd from './MdEdtEmtResd'
function ModViewEmit(props) {

const [ClientView,setClientView] = useState({...props.ClViewEmt}) 
const [IntrrptMdEdtEmtWater,setIntrrptMdEdtEmtWater] = useState(false)
const [IntrrptMdEdtEmtEletrEn,setIntrrptMdEdtEmtEletrEn] = useState(false)
const [IntrrptMdEdtEmtResd,setIntrrptMdEdtEmtResd] = useState(false)
const [WaterEdt,setWaterEdt] = useState('')
const [EltrEnEdt,setEltrEnEdt] = useState('')
const [ResdEdt,setResdEdt] = useState('')

useEffect(() => {
setClientView({...props.ClViewEmt})
}, [props.ModInterruptEMit,props.ClViewEmt]);

const clickClose = () => { props.setMdIntrruptViewEMt(false);  }   
const clickEditEmtWater = (agua) => {setIntrrptMdEdtEmtWater(true); setWaterEdt(agua) ;}
const clickEditEmtEnergy = (energiaeletrica) => {setIntrrptMdEdtEmtEletrEn(true);setEltrEnEdt(energiaeletrica);}
const clickEdtEmtResd = (residuos) => {setIntrrptMdEdtEmtResd(true);setResdEdt(residuos)}

return <div className={props.MdIntrruptViewEMt ? style.modalOn : style.modalOff }>
 <MdEdtEmtWater setIntrrptMdEdtEmtWater={setIntrrptMdEdtEmtWater} IntrrptMdEdtEmtWater={IntrrptMdEdtEmtWater} ClientView={ClientView} WaterEdt={WaterEdt}/>
<MdEdtEmtEletrEn IntrrptMdEdtEmtEletrEn={IntrrptMdEdtEmtEletrEn} setIntrrptMdEdtEmtEletrEn={setIntrrptMdEdtEmtEletrEn} ClientView={ClientView} EltrEnEdt={EltrEnEdt}/>
<MdEdtEmtResd IntrrptMdEdtEmtResd={IntrrptMdEdtEmtResd} setIntrrptMdEdtEmtResd={setIntrrptMdEdtEmtResd}   ClientView={ClientView} ResdEdt={ResdEdt}/>
<div className={style.squareModVwEdt}> 

<div className={style.divHeader}>
<h2 className={style.h2ModEmit}>Visualizar emissoes do cliente</h2>   
<button className={style.btnCloseModVwEmt} onClick={clickClose}>  <AiOutlineClose /></button>
</div>

 <div>
<p className={style.pModText}>Projeto: {ClientView.projeto}</p>
<p className={style.pModText}>Cpf: {ClientView.cpf}</p>
<p className={style.pModText}>Nome: {ClientView.nome}</p>
</div>

<h3>Agua</h3> 
<div className={style.divGridVwEmt}>
{ClientView.emissoes.agua.map(agua => (
<div className={style.divGridMdVwemt} key={agua.id}>
<p className={style.pModText}>Ano: {agua.ano}</p>
<p className={style.pModText}>Mês: {agua.mes}</p>
<p className={style.pModText}>Gasto: {agua.gasto} m³</p>
<p className={style.pModText}>Gerou: {agua.consumo} kg CO² e</p>
<button className={style.btnEditEmWater} onClick={ () => clickEditEmtWater(agua)}>Editar</button>
</div>))}
</div> 

<h3>Energia elétrica</h3> 
<div className={style.divGridVwEmt}>
{ClientView.emissoes.energiaeletrica.map(energiaeletrica => (
<div className={style.divGridMdVwemt} key={energiaeletrica.id}>
<p className={style.pModText}>Ano: {energiaeletrica.ano}</p>
<p className={style.pModText}>Mês: {energiaeletrica.mes}</p>
<p className={style.pModText}>Gasto: {energiaeletrica.gasto} kwh</p>
<p className={style.pModText}>Gerou: {energiaeletrica.consumo} kg CO² e</p>
<button className={style.btnEditEmWater} onClick={ () => clickEditEmtEnergy(energiaeletrica)}>Editar</button>
</div>))}
</div> 

<h3>Resíduos</h3>  
<div className={style.divGridVwEmt}>
{ClientView.emissoes.residuos.map(residuos => (
<div className={style.divGridMdVwemt} key={residuos.id}>
<p className={style.pModText}>Ano: {residuos.ano}</p>
<p className={style.pModText}>Mês: {residuos.mes}</p>
<p className={style.pModText}>Emitiu: {residuos.gasto} kg</p>
<p className={style.pModText}>Gerou: {residuos.consumo} kg CO² e</p>
<button className={style.btnEditEmWater} onClick={ () => clickEdtEmtResd(residuos)}>Editar</button>
</div>))}
</div> 

</div>

</div>
}

export default ModViewEmit 