import React from 'react';
import { Chart } from 'react-google-charts';
import { useState,useEffect } from 'react'
import style from './PizzaChart.module.css'
import ChartSelect  from "./ChartSelect";

function PizzaChart () {
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))
const [BoxProject,setBoxProject] = useState([])
const [ProjctStart,setProjctStart] = useState('')
const [ProjtcSelect,setProjtcSelect] = useState('')
const [BoxClientBenefit,setBoxClientBenefit] = useState([])

useEffect(() => {   
  RecvListOfProjctActiv();
},[ProjctStart,ProjtcSelect]) 

function RecvListOfProjctActiv() {
  fetch(`http://191.252.38.35:8080/api/clientes/listarProjetosAtivos?email=${admStorage.email}&senha=${admStorage.senha}`, {
    method: "POST",
      headers: { "Content-Type": "application/json" },  })
      .then((response) => response.json())
      .then((data) =>  {  
      if (data.length > 0) { setProjctStart(data[0].projeto); setBoxProject(data);RecvListOfBenefitStart(); }
     else {setBoxClientBenefit([])  } } )
      .catch((error) => console.log(error)); }

function RecvListOfBenefitStart() {  
  fetch(`http://191.252.38.35:8080/api/consumoMensal/relatorio?email=${admStorage.email}&senha=${admStorage.senha}`,{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify(ProjctStart) })
  .then((response) => response.json())
  .then((data) => {  
   if (data.length > 0) { setBoxClientBenefit(data);}
    else {setBoxClientBenefit([])  } })  }

    const totalClient = BoxClientBenefit.reduce((total, client) => total + client.quantidade, 0);
  
    const data = [
    ['Group of Person', 'Reduction rate'],
   ...BoxClientBenefit.map((client) => 
   [`Beneficio R$:${client.beneficio} / Clientes: ${client.quantidade}`,client.quantidade / totalClient * 100]),
   ];

function ChangeSelectProject(e) {
  setProjtcSelect(e.target.value) ;console.log('VALORES:',e.target.value);
}

  // const data = [
  //   ['Task', 'Hours per Day'],
  //   ['Work', 11],
  //   ['Eat', 2],
  //   ['Commute', 2],
  //   ['Watch TV', 2],
  //   ['Sleep', 7],
  // ];



  const options = {
    title: '',
    is3D: true,
    // pieHole: 0.3,
  };

  return ( <div>
      <h2 className={style.H2Chart}>Gráfico por projeto com a quantidade clientes beneficiados</h2>

      <p>Selecione o projeto:
<select  onChange={ChangeSelectProject}  value={BoxProject.length > 0 ? ProjtcSelect : ProjctStart} >
  {BoxProject.map((comp,index)=> (
    <option key={index} value={comp.projeto}>{comp.projeto}</option>
  ) )}
</select>
</p>

{ProjtcSelect ? <ChartSelect ProjtcSelect={ProjtcSelect} /> :
<Chart chartType="PieChart" data={data} options={options}width="100%" height="400px" legendToggle/> }

    </div>
  );
};

export default PizzaChart;