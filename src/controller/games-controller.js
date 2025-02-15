// biblioteca de jogos
const games = [
    { id: 1, name: 'Legend of Mana', genres: ['action-rpg'], year: 1999 },
    { id: 2, name: 'World of Warcraft', genres: ['mmorpg'], year: 2004 },
    { id: 3, name: 'Metal Gear Solid', genres: ['stealth', 'action-adventure'], year: 1998 },
    { id: 4, name: 'Sonic Adventure 2', genres: ['platformer'], year: 2001 },
    { id: 5, name: 'Age of Empires 2', genres: ['real-time-strategy'], year: 1999 }
]

module.exports = {
    // Devolver todos games
    // GET /games -> criando o index
    index: (req, res) => {
        // trás todos os games
        res.json(games)
    },

    // Devolver um unico game
    // GET /games/:id
    show: (req, res) => {
        // extrair o id
        const {id} = req.params
        // localizando o game
        const game = games.find(game => game.id === +id)

        // verificações do back
        if(!game){
            res.status(404)
            res.json({message: 'Game not found!'})
        } else {
            res.json(game)
        }
        
    },

    // Criar um game -> save ou create
    // POST /games
    save: (req, res) => {
        // Pegando as propriedades
        const {name, genres, year} = req.body

        // criando o objt
        const newGame = {
            id: Math.floor(Math.random() * 99999),
            name,
            genres,
            year
        }

        games.push(newGame)

        res.status(201).json(newGame)
    },

    // PUT /games/:id
    update: (req, res) => {
        const {id} = req.params
        const {name, year} = req.body

        const gameIndex = games.findIndex( games => games.id === +id)

        if(gameIndex === -1){
            return res.status(404).json({ message: 'Game not found!'})
        }

        if(typeof name === 'string'){
            games[gameIndex].name = name
        }

        if(typeof year === 'number'){
            games[gameIndex].year = year
        }

        res.json(games[gameIndex])
    },
    // DELETE /games/:id
    delete: (req, res) => {
        const {id} = req.params

        const gameIndex = games.findIndex( games => games.id === +id)

        // Verificação do backend
        if(gameIndex === -1){
            return res.status(404).json({ message: 'Game not found!'})
        }

        games.splice(gameIndex, 1)

        res.status(204).end()

    },
    // POST /games/:id/genres
    addGenre: (req, res) => {
        // pegando os dados do body
        const {id} = req.params
        const {genre} = req.body

        const gameIndex = games.findIndex(game => game.id === +id)

        // Verificação do backend
        if(gameIndex === -1){
            return res.status(404).json({ message: 'Game not found!'})
        }

        if(typeof genre !== 'string' || games[gameIndex].genres.includes(genre)){
            return res.status(400).json({ message: 'Invalid genre!'})
        }

        games[gameIndex].genres.push(genre)

        res.json(games[gameIndex])
    }
}
