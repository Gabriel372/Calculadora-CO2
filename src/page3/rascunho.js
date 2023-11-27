const consumMonth={nome:Name,cpf:Cpf,projeto:Project,mes:Month,ano:Year,
  consumo:parseFloat(ConCo2Water)+parseFloat(ConCo2EnEltrc)+parseFloat(ConCo2Resd),taxaDeReducao:0} 
  
  //JSON de consumoMensal: {"nome":"", "cpf":"", "projeto":"", "mes":"", "ano":"", "consumo":""}
  
  
  const registerClick = () => {
      if (Population && T_gascpf && M_gas && T_watercpf && M_water && T_cpf && 
      M_energy && Phone && Email && Adress && Cpf && Name && Project && Data && Cons_eletric && Cons_water && Gen_waste) {
    
        const clientRegister = {data:Data,projeto:Project,nome:Name,cpf:Cpf,endereco:Adress,email:Email,
        telefone:Phone,matriculaDeEnergia:M_energy,titularEnergiaCpf:T_cpf,matriculaDeAgua:M_water,
        titularAguaCpf:T_watercpf,matriculaDeGas:M_gas,titularGasCpf:T_gascpf,habitantes:Population} 
    
          fetch(`http://191.252.38.35:8080/api/clientes/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(clientRegister) } )
          .then((response) => { 
          if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.statusText}`); }
          return response.json(); })
          .then((data) =>  { console.log('sucesso no post',data);SaveApiWater() })
          .catch((error) => console.log('erro ao postar emissao',error))
        }
        else {alert('Preencha os formularios'); 
      }} //CLICK REGISTER
  
        const SaveApiWater = () => { 
          const emWater = {tipoEmissao:"agua",nome:Name,cpf:Cpf,mes:Month,ano:Year,gasto:Cons_water,consumo:0}  ;
        
         fetch(`http://191.252.38.35:8080/api/emissoes/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(emWater) } )
            .then((response) => { 
            if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`); }
            return response.json(); })
            .then((data) =>  { console.log('sucesso no post',data);setConCo2Water(data.consumo);SaveApiEnElctr() })
    .catch((error) => console.log('erro ao postar emissao',error))
        }
  
        const SaveApiEnElctr = () => { 
          const emEnergy = {tipoEmissao:"energiaeletrica",nome:Name,cpf:Cpf,mes:Month,ano:Year,gasto:Cons_eletric,consumo:0 }
        
        fetch(`http://191.252.38.35:8080/api/emissoes/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(emEnergy) } )
            .then((response) => { 
            if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`); }
            return response.json(); })
            .then((data) =>  { console.log('sucesso no post',data); setConsCo2EnEltrc(data.consumo);
            setConsmApi({consumMonth});SaveApiResd()})
            .catch((error) => console.log('erro ao postar emissao',error))
        }
        
        const SaveApiResd = () => { 
          const emResidue = {tipoEmissao:"residuos",nome:Name,cpf:Cpf,mes:Month,ano:Year,gasto:Gen_waste,consumo:0};
        
        fetch(`http://191.252.38.35:8080/api/emissoes/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(emResidue) } )
            .then((response) => { 
            if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`); }
            return response.json(); })
            .then((data) =>  { console.log('sucesso no post',data);setConCo2Resd(data.consumo);
            setTimeout(()=> {  SaveApiConsMonth()  },2000)
          } )
            .catch((error) => console.log('erro ao postar emissao',error))
        }
        // consumoMensal/salvar como os parêmetros de email "marcos@gmail.com" e senha "1234567"
  
  
        const SaveApiConsMonth = () => {  
     console.log(ConsmApi);
  
  // setTimeout(()=> {
       fetch(`http://191.252.38.35:8080/api/consumoMensal/salvar?email=marcos@gmail.com&senha=1234567`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(ConsmApi) } )
            .then((response) => { 
            if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.statusText}`); }
            return response.json(); })
            .then((data) =>  { console.log('sucesso no post conumo mensal',data);
          })
            .catch((error) => {console.log('erro ao postar cons. mensal',error);console.log(ConsmApi);  }) 
    //   console.log(consumMonth);
    // },5000)
  
  
        }
  
  
  
  // const consumMonth = {nome:Name,cpf:Cpf,projeto:Project,mes:Month,ano:Year,consumo:consCo2Water + consCo2EnEletc + consCo2Residue};  
        // const response4 = await fetch(`http://191.252.38.35:8080/api/consumoMensal/salvar?email=${admStorage.email}&senha=${admStorage.senha}`,{
  //   method:"POST",
  //   headers:{"Content-Type":"application/json"},
  //   body:JSON.stringify(consumMonth)
  // });
  //  const data4 = await response4.json();
  // console.log('sucesso no post', data4);
  // //   consCo2Residue = Number(data3.consumo);
  // } catch (error) {
  //   console.log('erro ao postar emissao', error);
  // }