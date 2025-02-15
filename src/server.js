const express = require('express');
const gamesController = require('./controller/games-controller');
const app = express();

// config JSON()
app.use(express.json())

// Retornando um JSON
app.get('/', (req, res) => {
    res.json({ message: 'Hello, world!' });
});

// ROTA GET:
// Retornando a biblioteca de jogos em objeto
// Index da aplicação
app.get('/games', gamesController.index);
// mostro um jogo especifico
app.get('/games/:id', gamesController.show)

// ROTA POST:
// criar um game
app.post('/games', gamesController.save)
// adicionar um genero
app.post('/games/:id/genres', gamesController.addGenre)

// ROTA PUT:
app.put('/games/:id', gamesController.update)

// ROTA DELETE:
app.delete('/games/:id', gamesController.delete)

// Definindo a porta
const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor iniciado!\n http://localhost:${PORT}`));
