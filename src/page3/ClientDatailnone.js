
function ClientDetail(props) {

const Convert = (any) => { const [year, month, day] = any.split('-');
const DateConverted = `${day}/${month}/${year}`; return DateConverted; }

return <div>
<p>Cpf: {client.cpf}</p><p> Nome: {client.nome}</p><p>Projeto: {client.projeto}</p>
<p>Data de cadastro: {Convert(client.data)}</p>
<p>Email: {client.email}</p>
<p>Endereço: {client.endereco}</p>
<p>Habitantes: {client.habitantes}</p>
<p>Código do cliente/energia: {client.matriculaDeEnergia}</p>
<p>Código do cliente/gás: {client.matriculaDeGas}</p>
<p>Telefone: {client.telefone}</p>
<p>Titular de água cpf: {client.titularAguaCpf}</p>
<p>Titular de energia cpf: {client.titularEnergiaCpf}</p>
<p>Titular de gás cpf: {client.titularGasCpf}</p>
</div>

}

export default ClientDetail
