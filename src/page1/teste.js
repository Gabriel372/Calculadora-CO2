import style from './ClientManager.module.css';
import { useState, useEffect } from 'react';
import Modal from './Modal';

function ClientManager() {
  const [Boxclient, setBoxclient] = useState([]); //cx de clientes
  const [Found, setFound] = useState(''); //armazena filtrados
  const [Notfound, SetNotfound] = useState(''); //armazena filtrados
  const [Changeinp, setChangeinp] = useState(''); //valor digitado no input
  const [Interruptmod, setInterruptmod] = useState({
    ModalActive: '',
    Delete: '',
  }); //valor digitado no input
  const [Clientdel, setClientdel] = useState('');

  useEffect(() => {
    const AdmTeste = { email: 'marcos@gmail.com', senha: '1234567', nome: 'Marcos Philippe' };
    fetch('http://191.252.38.35:8080/api/clientes/lista', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(AdmTeste),
    })
      .then((response) => response.json())
      .then((data) => setBoxclient(data)) //armazenar clientes em box
      .catch((error) => console.log(error));
  }, [Boxclient, Found]);

  const clickSearch = () => {
    console.log(Boxclient);
    if (Changeinp) {
      const cpfFiltred = Boxclient.filter((client) => client.cpf === Changeinp);
      const nameFiltred = Boxclient.filter((client) => client.nome === Changeinp);
      const projectFiltred = Boxclient.filter((client) => client.projeto === Changeinp);

      console.log(Changeinp);
      if (cpfFiltred.length > 0) {
        setFound([...cpfFiltred]);
      } else if (nameFiltred.length > 0) {
        setFound([...nameFiltred]);
      } else if (projectFiltred.length > 0) {
        setFound([...projectFiltred]);
      } else if (Found.length === 0) {
        SetNotfound('Nenhum cliente encontrado');
      }

      console.log(cpfFiltred);
      console.log(Found);
      setChangeinp('');
    }
  };

  const Digiting = (e) => {
    setChangeinp(e.target.value);
    setFound('');
    SetNotfound('');
  };

  const Convert = (any) => {
    const [year, month, day] = any.split('-');
    const DateConverted = `${day}/${month}/${year}`;
    return DateConverted;
  };

  const clickDelete = (client) => {
    setClientdel(client);
    setInterruptmod({ ModalActive: true, Delete: false }); //ativa modal
  };

  const ReceiveModal = (boolean, yn) => {
    setInterruptmod({ ModalActive: boolean, Delete: yn });

    if (yn && Clientdel) {
      deleteClient(Clientdel);
    }
  };

  const deleteClient = (client) => {
    fetch(`http://191.252.38.35:8080/api/clientes/${client.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao excluir cliente: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setFound((prevState) => prevState.filter((c) => c.id !== client.id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div onMouseEnter={() => console.log(Interruptmod)}>
      <div className={style.container}>
        <h2>Clientes cadastrados</h2>
        <h3>Busca por cpf ou nome ou projeto</h3>
        <input className={style.cpfInput} type="text" onChange={Digiting} autoFocus />
        <button onClick={clickSearch}>Buscar</button>

        {Found.length > 0 ? (
          <ul className={style.ul}>
            {Found.map((client) => (
              <li key={client.id} className={style.li}>
                <p>Cpf: {client.cpf}</p>
                <p> Nome: {client.nome}</p>
                <p>Projeto: {client.projeto}</p>
                <p>Data de cadastro: {Convert(client.data)}</p>
                {/* ... (restante do seu código) */}
                <div className={style.divBtn}>
                  <button className={style.btnRemove} onClick={() => clickDelete(client)}>
                    Deletar
                  </button>
                  <button className={style.btnInsert} onClick={clickSearch}>
                    Editar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>{Notfound}</p>
        )}
      </div>
      <Modal Interruptmod={Interruptmod} ReceiveModal={ReceiveModal} />
    </div>
  );
}

export default ClientManager;
 a requisição
}

  