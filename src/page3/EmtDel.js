import { useState,useEffect} from "react"

function EmtDel({DelEmtOfClient,setDelEmtOfClient}) {
    
useEffect(() => {
if (DelEmtOfClient) {
// console.log(DelEmtOfClient); 
DelEmtOfClient.emissoes.agua.map(agua => {
fetch(`http://191.252.38.35:8080/api/emissoes/${agua.id}`,{
  method:"DELETE", })
  .then((response) => {
  if (!response.ok) {
  throw new Error(`Erro ao excluir emissao: ${response.status}`); }
  return response.json(); })
  .then((data) => {
  console.log(data);  })
  .catch((error) => console.log(error)); 
  })

  DelEmtOfClient.emissoes.energiaeletrica.map(energiaeletrica => {
    fetch(`http://191.252.38.35:8080/api/emissoes/${energiaeletrica.id}`,{
      method:"DELETE", })
      .then((response) => {
      if (!response.ok) {
      throw new Error(`Erro ao excluir emissao: ${response.status}`); }
      return response.json(); })
      .then((data) => {
      console.log(data);  })
      .catch((error) => console.log(error)); 
      })

      DelEmtOfClient.emissoes.residuos.map(residuos => {
        fetch(`http://191.252.38.35:8080/api/emissoes/${residuos.id}`,{
          method:"DELETE", })
          .then((response) => {
          if (!response.ok) {
          throw new Error(`Erro ao excluir emissao: ${response.status}`); }
          return response.json(); })
          .then((data) => {setDelEmtOfClient('')
          console.log(data);  })
          .catch((error) => console.log(error)); 
          })

}//fim do if
    },[DelEmtOfClient])

}

export default EmtDel
