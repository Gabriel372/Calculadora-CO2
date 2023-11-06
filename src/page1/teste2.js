const registerClick = () => {
  if (Email && Password && Name) {
    const admin = { nome: Name, email: Email, senha: Password };

    fetch("http://191.252.38.35:8080/api/administradores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na solicitação: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Admin registrado com sucesso:", data);
        // Provavelmente você gostaria de fazer algo com os dados do administrador aqui
        // Se quiser, pode passar o ID do novo admin para a próxima página
        navigate('/ClientRegisterPage', { state: { adminId: data.id } });
      })
      .catch((error) => console.error("Erro ao registrar admin:", error));

    setName('');
    setEmail('');
    setPassword('');
  } else {
    alert('Preencha os formulários');
  }
};



