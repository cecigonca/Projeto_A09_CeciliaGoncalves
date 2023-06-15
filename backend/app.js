const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();;
const port = 3000;
const path = require('path');
const db = new sqlite3.Database('data/banco.db');

app.use(express.static("frontend"))

app.get('/', (req, res) => {
    const filePath = path.resolve('./frontend/insere.html');
    res.sendFile(filePath);
});


app.use(express.json());

app.post('/caminho_para_o_script_do_servidor', (req, res) => {
  const { informacao } = req.body;

  db.run("INSERT INTO Mensagem (Mensagens) VALUES (?)", informacao, function(err) {
    if (err) {
      console.error('Erro ao inserir a informação no banco de dados:', err);
      res.status(500).json({ error: 'Erro ao inserir a informação no banco de dados' });
    } else {
      console.log('Informação inserida com sucesso no banco de dados.');
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


// mostrar lista

app.get('/dados', (req, res) => {
    db.all("SELECT * FROM Mensagem", function(err, rows) {
      if (err) {
        console.error('Erro ao obter os dados do banco de dados:', err);
        res.status(500).json({ error: 'Erro ao obter os dados do banco de dados' });
      } else {
        console.log('Dados obtidos com sucesso do banco de dados.');
        res.json(rows);
      }
    });
  });
  