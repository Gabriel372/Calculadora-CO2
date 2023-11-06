import style from './InsertData.module.css'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
// import { useNavigate } from "react-router-dom";

function InsertData() {
const [Energy,setEnergy] = useState('')
const [Water,setWater] = useState('')
const [Residue,setResidue] = useState('')
const [Month,setMonth] = useState('')
const [Year,setYear] = useState('')
const {state} = useLocation();
const { thisClient } = state || {};
// const navigate = useNavigate();

const clickInsert = () => { 
if (Energy && Water && Residue && Month && Year) {
const emEnergy = {tipoEmissao:"energiaeletrica",nome:thisClient.nome,mes:Month,ano:Year,gasto:Energy}  
const emWater = {tipoEmissao:"agua",nome:thisClient.nome,mes:Month,ano:Year,gasto:Water}  
const emResidue = {tipoEmissao:"residuos",nome:thisClient.nome,mes:Month,ano:Year,gasto:Water}  
fetch("http://191.252.38.35:8080/api/emissoes/997609d7-ca07-46bc-9a73-79522454cfbe",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(emEnergy) } )
.then((response) => { 
if (!response.ok) {
throw new Error(`Erro na solicitação: ${response.statusText}`); }
return response.json(); })
.then((data) =>  { setEnergy('') ;
console.log('sucesso no post',data);
// navigate('/ClientRegistered') 
})
.catch((error) => console.log('erro ao postar emissao',error))

fetch("http://191.252.38.35:8080/api/emissoes/997609d7-ca07-46bc-9a73-79522454cfbe",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(emWater) } )
.then((response) => { 
if (!response.ok) {
throw new Error(`Erro na solicitação: ${response.statusText}`); }
return response.json(); })
.then((data) =>  { setWater('') ;
console.log('sucesso no post',data);
// navigate('/ClientRegistered') 
})
.catch((error) => console.log('erro ao postar emissao',error))

fetch("http://191.252.38.35:8080/api/emissoes/997609d7-ca07-46bc-9a73-79522454cfbe",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(emResidue) } )
.then((response) => { 
if (!response.ok) {
throw new Error(`Erro na solicitação: ${response.statusText}`); }
return response.json(); })
.then((data) =>  { setResidue('')
console.log('sucesso no post',data);
// navigate('/ClientRegistered') 
})
.catch((error) => console.log('erro ao postar emissao',error)) }    
else {alert('Insira os dados')  } }

const changeEnergy = (e) => {if (e.target.value) {setEnergy(e.target.value) }
else if (e.target.value === '') { setEnergy('')} }
const changeWater = (e) => {if (e.target.value) {setWater(e.target.value) }
else if (e.target.value === '') { setWater('')} }
const changeResidue = (e) => {if (e.target.value) {setResidue(e.target.value) }
else if (e.target.value === '') { setResidue('')} }

const changeMonth = (e) => {if (e.target.value !== "") {setMonth(e.target.value) } }
const changeYear = (e) => {if (e.target.value !== "") {setYear(e.target.value) } }

return <div className={style.container}>
    <h2>Inserção de dados</h2>
<div className={style.squareInsert}>

<div className={style.gridInsert}>
<div>
<p><b>Projeto:</b>{thisClient.projeto}</p>
<p><b>Nome:</b>{thisClient.nome}</p>
<p><b>Cpf:</b>{thisClient.cpf}</p>
<p><b>Endereço:</b>{thisClient.endereco}</p>
<p><b>Email:</b>{thisClient.email}</p>
<p><b>Telefone:</b>{thisClient.telefone}</p>
<p><b>Codigo do cliente/energia:</b>{thisClient.matriculaDeEnergia}</p>
</div>
<div>
<p><b>Titular de energia do cpf:</b>{thisClient.titularEnergiaCpf}</p>
<p><b>Código do cliente/água:</b>{thisClient.matriculaDeagua}</p>
<p><b>Titular de água do cpf:</b>{thisClient.titularAguaCpf}</p>
<p><b>Código do cliente/gás:</b>{thisClient.matriculaDeGas}</p>
<p><b>Titular de gás cpf:</b>{thisClient.titularGasCpf}</p>
<p ><b>Nº de habitantes na residência:</b>{thisClient.habitantes}</p>
</div>
</div>
<h3>Insira emissões menssais</h3>

<div className={style.gridInput}>
<input autoFocus className={style.input} type="number" placeholder='Consumo de energia kwh' onChange={changeEnergy} value={Energy}/>
<input className={style.input} autoFocus type="number" placeholder='Consumo de água m³' onChange={changeWater} value={Water}/>
<input className={style.input} autoFocus type="number" placeholder='Geração de resíduos kg' onChange={changeResidue} value={Residue}/>
</div>

<div className={style.gridSelect}>

<div className={style.divSelect}>
<label >Selecione o mês</label>
<select onChange={changeMonth} name="month" placeholder='selecione'>
<option value="" className={style.firstOption}></option>
  <option value="janeiro">janeiro</option><option value="fevereiro">fevereiro</option>
  <option value="março">março</option><option value="abril">abril</option>
  <option value="maio">maio</option><option value="junho">junho</option>
  <option value="julho">julho</option><option value="agosto">agosto</option>
  <option value="setembro">setembro</option><option value="outubro">outubro</option>
  <option value="novembro">novembro</option><option value="dezembro">dezembro</option>
</select>
</div>

  <div className={style.divSelect}>
<label >Selecione o ano</label>
<select onChange={changeYear} name="year" placeholder='selecione o ano'>
<option value="" className={style.firstOption}></option>
  <option value="2023">2023</option><option value="2024">2024</option>
  <option value="2025">2025</option><option value="2026">2026</option>
  <option value="2027">2027</option><option value="2028">2028</option>
  <option value="2029">2029</option><option value="2030">2030</option>
  <option value="2031">2031</option><option value="2032">2032</option>
  <option value="2033">2033</option><option value="2034">2034</option>
  <option value="2035">2035</option><option value="2036">2036</option>
  <option value="2037">2037</option><option value="2038">2038</option>
  <option value="2039">2039</option><option value="2040">2040</option>
  <option value="2041">2041</option><option value="2042">2042</option>
  <option value="2043">2043</option>
</select>
</div>

</div>
<button className={style.btnRegister} type='button' onClick={clickInsert}>Inserir</button>

</div>
</div>
}

export default InsertData 