// import React from 'react';
// import { Chart } from 'react-google-charts';
// import { useState,useEffect } from 'react'
// import style from './PizzaChart.module.css'

// function PizzaChart () {
// const [BoxClientBenefit,setBoxClientBenefit] = useState([])
// const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))
// const [BoxProject,setBoxProject] = useState([])
// const [ProjctStart,setProjctStart] = useState([])
// const [ProjtcSelect,setProjtcSelect] = useState([])
// const [AllProjctBenfit,setAllProjctBenfit] = useState([])


// useEffect(() => {   
//   RecvListOfProjctActiv() ;RecvListOfBenefitStart();
// },[ProjctStart]) 

// function RecvListOfProjctActiv() {
//   fetch(`http://191.252.38.35:8080/api/clientes/listarProjetosAtivos?email=${admStorage.email}&senha=${admStorage.senha}`, {
//     method: "POST",
//       headers: { "Content-Type": "application/json" },  })
//       .then((response) => response.json())
//       .then((data) =>  {  
//       if (data.length > 0) { setProjctStart(data[0].projeto); setBoxProject(data)}
//      else {setBoxClientBenefit([])  } } )
//       .catch((error) => console.log(error)); }

// function RecvListOfBenefitStart() {  
//   fetch(`http://191.252.38.35:8080/api/consumoMensal/relatorio?email=${admStorage.email}&senha=${admStorage.senha}`,{
//   method:"POST",
//   headers:{"Content-Type":"application/json"},
//   body:JSON.stringify(ProjctStart) })
//   .then((response) => response.json())
//   .then((data) => {  
//    if (data.length > 0) { setBoxClientBenefit(data) ;console.log('PROJETO 1' , data);}
//     else {setBoxClientBenefit([])  } })  }

// function RecveListOfBenefitForPorjctSel() {  

// BoxProject.forEach(() => {   

//   fetch(`http://191.252.38.35:8080/api/consumoMensal/relatorio?email=${admStorage.email}&senha=${admStorage.senha}`,{
//   method:"POST",
//   headers:{"Content-Type":"application/json"},
//   body:JSON.stringify(ProjtcSelect) })
//   .then((response) => response.json())
//   .then((data) => {  
//    if (data.length > 0) {  setBoxClientBenefit(data) ;console.log('RESPOSTA DO SELECT' , data); }
//     else {setBoxClientBenefit([])  } })  
  
//   })
  
//   }

//   // function RecveListOfBenefitForPorjctSel2() {  

//   //   BoxProject.forEach(() => {   
    
//   //     fetch(`http://191.252.38.35:8080/api/consumoMensal/relatorio?email=${admStorage.email}&senha=${admStorage.senha}`,{
//   //     method:"POST",
//   //     headers:{"Content-Type":"application/json"},
//   //     body:JSON.stringify(ProjtcSelect) })
//   //     .then((response) => response.json())
//   //     .then((data) => {  
//   //      if (data.length > 0) {  setAllProjctBenfit(data) ;console.log('RELATORIO RECEBIDO:' , data); }
//   //       else {setBoxClientBenefit([])  } })  
      
//   //     })
      
//   //     }



// // function agruparPorBeneficio(objetos) {
// //   const agrupamento = objetos.reduce((acumulado, objeto) => {
// //     const beneficio = objeto.beneficio;
// //     if (!acumulado[beneficio]) {
// //       acumulado[beneficio] = [];
// //     }
// //     acumulado[beneficio].push(objeto);
// //     return acumulado;
// //   }, {});
// //   return Object.keys(agrupamento).map(beneficio => ({
// //     beneficio: beneficio,
// //     clientes: agrupamento[beneficio]
// //   }));
// // }

// function ChangeSelectProject(e) {
//   setProjtcSelect(e.target.value) ; setProjctStart(e.target.value) ;console.log('PROJETO SELECIONADO', e.target.value);
//   RecveListOfBenefitForPorjctSel();
//   // RecveListOfBenefitForPorjctSel2()
// }

//   // const data = [
//   //   ['Task', 'Hours per Day'],
//   //   ['Work', 11],
//   //   ['Eat', 2],
//   //   ['Commute', 2],
//   //   ['Watch TV', 2],
//   //   ['Sleep', 7],
//   // ];

//   const data = [
//     ['Person', 'Reduction rate'],
//    ...BoxClientBenefit.map((client,index) => 
//    [`Grupo: ${index} / Beneficio R$:${client.beneficio} / Clientes: ${client.quantidade}`,index + 1 ]),
//    ];

//   const options = {
//     title: '',
//     pieHole: 0.3,
//   };

//   return (
//     <div>
//       <h2 className={style.H2Chart}>Gráfico por projeto com taxa de redução de cada cliente</h2>
//       {/* <h3>{ProjtcSelect ? ProjtcSelect : ProjctStart }</h3>  */}

//       <p>Selecione o projeto:
// <select  onChange={ChangeSelectProject}  value={ProjtcSelect.length > 0 ? ProjtcSelect : ProjctStart} >
//   {BoxProject.map((comp,index)=> (
//     <option key={index} value={comp.projeto}>{comp.projeto}</option>
//   ) )}
// </select>
// </p>



// {/* <ul>
// {BoxProject.map((comp,index) => (
//     <li key={index} >{comp.projeto}</li>
//   ) )}
// </ul> */}
//       <Chart
//         chartType="PieChart"
//         data={data}
//         options={options}
//         width="100%"
//         height="400px"
//         legendToggle
//       />
//     </div>
//   );
// };

// export default PizzaChart;
