// import { useLocation } from "react-router-dom"
import style from './EletricEmiss.module.css'
import { useState,useEffect } from "react";

function EletricEmiss() {
    
// const {state} = useLocation();
// const { Boxemition } = state || {};    
const [Box,setBox] = useState([])


//pessoa={nome:joao,cpf:cpf}  emssao{TipoEmissao:agua,nome:joao}
// if (pessoa.nome ==== emisssao.nome) {setBoxEmition([...Boxemition,pessosa])  }

// useEffect(() => {
//   if (Boxemition) {
//     const allEletric = Boxemition.filter((item) => item.tipoEmissao === 'energiaeletrica');
//     const Grouped = GroupOfName(allEletric);
//     setBox(Grouped);
//   }
// }, [Boxemition]);

// const GroupOfName = (array) => {
//   const group = {};
//   array.forEach((item) => {
//     const { nome } = item;
//     if (group[nome]) {
//       group[nome].push(item);
//     } else {
//       group[nome] = [item];
//     }
//   });
//   return group;
// };
// console.log(Box);

const pessoaJoao = {
  id:'456',
  nome: 'João',
  emissoes: {
    energiaeletrica: {
      doismilevintetres: {
        janeiro: 100,
        fevereiro: 120,
        marco: 90,
      },
      doismilevintequatro: {
        janeiro: 110,
        fevereiro: 130,
        marco: 95,
      },
    },
    agua: {
      doismilevintetres: {
        janeiro: 5,
        fevereiro: 6,
        marco: 4,
      },
      doismilevintequatro: {
        janeiro: 6,
        fevereiro: 7,
        marco: 5,
      },
    },
    residuos: {
      doismilevintetres: {
        janeiro: 2,
        fevereiro: 3,
        marco: 2,
      },
      doismilevintequatro: {
        janeiro: 2,
        fevereiro: 4,
        marco: 3,
      },
    },
  },
};



const pessoaPedro = {
  id:'123',
  nome: 'Pedro',
  emissoes: {
    energiaeletrica: {
      doismilevintetres: {
        janeiro: 1,
        fevereiro: 12,
        marco: 90,
        // ... adicione outros meses aqui
      },
      doismilevintequatro: {
        janeiro: 110,
        fevereiro: 130,
        marco: 95,
        // ... adicione outros meses aqui
      },
    },
    agua: {
      doismilevintetres: {
        janeiro: 5,
        fevereiro: 6,
        marco: 4,
        // ... adicione outros meses aqui
      },
      doismilevintequatro: {
        janeiro: 6,
        fevereiro: 7,
        marco: 5,
        // ... adicione outros meses aqui
      },
    },
    residuos: {
      doismilevintetres: {
        janeiro: 2,
        fevereiro: 3,
        marco: 2,
        // ... adicione outros meses aqui
      },
      doismilevintequatro: {
        janeiro: 2,
        fevereiro: 4,
        marco: 3,
        // ... adicione outros meses aqui
      },
    },
  },
};
// const addPerson = (person1,peson2) => {
//   setBox([person1,peson2]);
// };

useEffect(() => setBox([pessoaJoao,pessoaPedro]),[])


// addPerson([pessoaJoao,pessoaPedro])
console.log(Box);
return <div className={style}>
<h2>Relatorio de emissões</h2>
<h3>energia elétrica</h3>
{/* <h2>Emissões de energia elétrica</h2>
<div><br/></div>   
<ul className={style.ul}>
        {Object.values(Box).map((group) =>
          group.map((person) => (
            <li key={person.id} id={person.id}>
              {person.nome}
            </li>
          ))
        )}
      </ul>           */}

{   }

{/* <button onClick={() => addPerson(pessoaPedro,pessoaJoao)}></button> */}
<ul className={style.ul}>
{Box.map(pessoa => (<li key={pessoa.id}>
  <p><b>{pessoa.nome}</b></p>
  <table  >
 <thead>
  <tr >
    <th>Mês</th>
    <th>Kw</th>
     <th>Kg co2/mes</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>Janeiro</td>
    <td >{pessoa.emissoes.energiaeletrica.doismilevintetres.janeiro}</td>
  </tr>
  <tr>
    <td>Fevereiro</td>
    <td >{pessoa.emissoes.energiaeletrica.doismilevintetres.fevereiro}</td>
  </tr>
  <tr>
    <td>Março</td>
    <td >{pessoa.emissoes.energiaeletrica.doismilevintetres.marco}</td>
    </tr>
    <tr>
    <td>Abril</td>
    <td ></td>
  </tr>
  <tr>
    <td>Maio</td>
    <td ></td>
  </tr>
  <tr>
    <td>Junho</td>
    <td ></td>
  </tr>
  <tr>
    <td>Julho</td>
    <td ></td>
  </tr>
  <tr>
    <td>Agosto</td>
    <td ></td>
  </tr>
  <tr>
    <td>Setembro</td>
    <td ></td>
  </tr>
  <tr>
    <td>Outubro</td>
    <td ></td>
  </tr>
  <tr>
    <td>Novembro</td>
    <td ></td>
  </tr>
  <tr>
    <td>Maio</td>
    <td ></td>
  </tr>
  <tr>
    <td>Dezembro</td>
    <td ></td>
  </tr>
  </tbody>
</table>









</li>) )  }


</ul>



</div>
}
    
export default EletricEmiss