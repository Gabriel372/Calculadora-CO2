import { Chart } from 'react-google-charts';
import { useState,useEffect } from 'react'

function ChartSelect ({ProjtcSelect}) {
const [BoxClient,setBoxClient] = useState([])
const admStorage = JSON.parse(sessionStorage.getItem('admStorage'))


useEffect(() => {   
 if (ProjtcSelect) { RecveListOfBenefitForPorjctSel();}
},[ProjtcSelect]) 

function RecveListOfBenefitForPorjctSel() {  
      fetch(`http://191.252.38.35:8080/api/consumoMensal/relatorio?email=${admStorage.email}&senha=${admStorage.senha}`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(ProjtcSelect) })
      .then((response) => response.json())
      .then((data) => {  
       if (data.length > 0) {  setBoxClient(data); }
        else {setBoxClient([])  } })  
        .catch((error) => console.log(error))
      }

      const totalClient = BoxClient.reduce((total, client) => total + client.quantidade, 0);

      const data = [
          ['Benefit', 'Client'],
          ...BoxClient.map((client) => 
          [`Beneficio R$:${client.beneficio} / Clientes: ${client.quantidade}`, client.quantidade / totalClient * 100]),
      ];
//   [`Beneficio R$:${client.beneficio} / Clientes: ${client.quantidade}`,index+1]),


  const options = {
    title: '',
    is3D: true,
    // pieHole: 0.3,
};

  return ( <div>
      <Chart
        chartType="PieChart"
        
        data={data}
        options={options}
        width="100%"
        height="400px"
        legendToggle
      />
    </div>
  );
};

export default ChartSelect;