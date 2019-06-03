const jogadaPoker = require('../controllers/jogadaPoker');

module.exports = (server) => {
  
  server.post('/api/checkVencedor', (req, res) => {
    const resultado = jogadaPoker.checkVencedor(req.body.jogos, res);
    return res.json(resultado);
  });

}