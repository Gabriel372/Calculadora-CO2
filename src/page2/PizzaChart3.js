import React,{useState,useEffect,useRef} from 'react';
import { Doughnut } from 'react-chartjs-2';
import style from './PizzaChart.module.css'

import Chart from 'chart.js/auto';
//<PizzaChart3/>

function PizzaChart3()  {
const [ProjctStart,setProjctStart] = useState('projeto 1')
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))
    const [BoxClientBenefit, setBoxClientBenefit] = useState([]);

useEffect(() => {   
RecvListOfBenefitStart();
},[ProjctStart]) 

function RecvListOfBenefitStart() {  
fetch(`http://191.252.38.35:8080/api/consumoMensal/relatorio?email=${admStorage.email}&senha=${admStorage.senha}`,{
method:"POST",
headers:{"Content-Type":"application/json"},
 body:JSON.stringify(ProjctStart) })
.then((response) => response.json())
.then((data) => {  
    let ReceiveData =  data
if (ReceiveData) { 

    setBoxClientBenefit({
        labels: ReceiveData.map((item) => item.beneficio ),
        datasets: [
          {label:'Count',
            data: ReceiveData.map((item) => item.quantidade ),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      });
    
     ;console.log('PROJETO 1' , ReceiveData);}
 else {setBoxClientBenefit([])  } })  }




//   const data = {
//     labels: ['categoria 1', 'Categoria 2', 'Categoria 3'],
//     datasets: [
//       {
//         data: [30, 50, 20],
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//       },
//     ],
//   };



  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return <div className={style.container}>
  <Doughnut data={BoxClientBenefit} options={options} />;

  </div>
};

export default PizzaChart3;
