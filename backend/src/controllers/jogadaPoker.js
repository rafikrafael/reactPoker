const MaoPoker = require('./maoPoker');
const { omit } = require('lodash');

const trataRetorno = (mao) => omit(mao, ['nipes', 'valores', 'valoresAgrupados']);

const validaVencedor = (maoA, maoB) => {
  const pontosA = maoA.checkJogo();
  const pontosB = maoB.checkJogo();
  if (pontosA > pontosB) return trataRetorno(maoA);
  else if (pontosA < pontosB) return trataRetorno(maoB);
  else {
    const valoresAOrdenados = maoA.valores.sort((a, b) => b - a);
    const valoresBOrdenados = maoB.valores.sort((a, b) => b - a);
    let x = 0;
    let retorno;
    while (x < valoresAOrdenados.length && !retorno) {
      if (valoresAOrdenados[x] > valoresBOrdenados[x]) retorno = maoA;
      else if (valoresAOrdenados[x] < valoresBOrdenados[x]) retorno = maoB;
      x++; 
    }
    if (retorno) return trataRetorno(retorno);
    return 'Empate'
  }
}

const checkVencedor = (jogos) => {
  if (!jogos) return;
  const maos = jogos.split(' ');
  const maoA = new MaoPoker(maos[0]);
  const maoB = new MaoPoker(maos[1]);
  return validaVencedor(maoA, maoB);
}

exports.checkVencedor = checkVencedor;