function submit(){
    const informacao = document.getElementById('inputText').value;
    fetch('/caminho_para_o_script_do_servidor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ informacao: informacao })
      })
        .then(response => {
          if (response.ok) {
            console.log('Informação enviada com sucesso para o banco de dados.');
          } else {
            throw new Error('Erro ao enviar informação para o banco de dados.');
          }
        })
        .catch(error => {
          console.log('Erro:', error.message);
        });      
}

// mostrar lista

function listar() {  
    document.getElementById('mostrarDados').addEventListener('click', function() {
      fetch('/dados', {
        method: 'GET'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao obter dados do servidor.');
           
          }
          return response.json();        
        })
        .then((data) => {
          const listaDados = document.getElementById('listaDados');
          listaDados.innerHTML = ''; // Limpa a lista antes de adicionar os novos dados
          data.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = item.Mensagens;
            listaDados.appendChild(listItem); // Adiciona um item da lista para cada registro
          });
          console.log('Dados recebidos com sucesso do servidor.');
        })
        .catch(error => {
          console.log('Erro ao obter dados do servidor:', error.message);
        });
    });
  }
  
