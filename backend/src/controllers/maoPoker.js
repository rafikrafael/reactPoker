const { orderBy, keys, sum } = require('lodash');

const cartasValores = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  '10': 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
}

const jogosPontos = {
  ROYAL_FLUSH: 9,
  STRAIGHT_FLUSH: 8,
  QUADRA: 7,
  FULL_HOUSE: 6,
  FLUSH: 5,
  SEQUENCIA: 4,
  TRINCA: 3,
  DOIS_PARES: 2,
  PARES: 1,
}

module.exports = class MaoPoker {
  constructor(mao) {
    this.mao = mao;
    this.cartas = [];
    this.nipes = {}
    this.valores = [];
    this.valoresAgrupados = {};
    let carta = '';
    for (let i = 0; i < mao.length; i++) {
      if (['C', 'E', 'O', 'P'].includes(mao.charAt(i))) {
        const nipe = mao.charAt(i);
        this.cartas.push(`${carta}${nipe}`);
        if (!this.nipes[nipe]) this.nipes[nipe] = [];
        this.nipes[nipe].push(carta);
        this.valores.push(cartasValores[carta]);
        this.valoresAgrupados[carta] = 1 + this.valoresAgrupados[carta] || 1;
        carta = '';
      } else {
        carta += mao.charAt(i);
      }
     
    }
  }

  //Composta por 10, valete, Dama, Rei e As do mesmo naipe; Não há critério de desempate.
  checkIsRoyalFlush() {
    return (this.valores.some(v => v === 14) && this.checkIsStraightFlush());
  }

  checkIsStraightFlush() {
    return keys(this.nipes).length === 1 && this.checkEstaSequencia()
  }

  checkIsQuadra() {
    const valoresAgrupadosKeys = keys(this.valoresAgrupados);
    return valoresAgrupadosKeys.length === 2 && valoresAgrupadosKeys.some(k => this.valoresAgrupados[k] === 4);
  }

  checkIsFullHouse() {
    const valoresAgrupadosKeys = keys(this.valoresAgrupados);
    return valoresAgrupadosKeys.length === 2 && sum(valoresAgrupadosKeys.map(k => {
      return this.valoresAgrupados[k] === 3 ? 3 : (this.valoresAgrupados[k] === 2 ? 2 : 0)
    })) === 5;
  }

  checkIsFlush() {
    return keys(this.nipes).length === 1 && !this.checkEstaSequencia();
  }

  checkIsSequencia() {
    return this.checkEstaSequencia();
  }

  checkIsTrinca() {
    return keys(this.valoresAgrupados).some(k => this.valoresAgrupados[k] === 3);
  }

  checkIsDoisPares() {
    return keys(this.valoresAgrupados).length === 3;
  }

  checkIsPares() {
    return keys(this.valoresAgrupados).length === 4;
  }

  checkEstaSequencia() {
    const valoresOrdenados = orderBy(this.valores, ['asc']);
    let isStraight = true;
    const inicializaComAs = (valoresOrdenados.includes(2) && valoresOrdenados.includes(14));
    let x = 0;
    while (x < (valoresOrdenados.length - 1) && isStraight) {
      const valorToCheck = inicializaComAs && (x === valoresOrdenados.length - 1) 
        ? 14
        : (valoresOrdenados[x] + 1);
      isStraight = (valorToCheck === valoresOrdenados[x+1]);
      x++;
    }
    return isStraight;
  }

  checkJogo() {
    if (this.checkIsRoyalFlush()) return jogosPontos.ROYAL_FLUSH;
    if (this.checkIsStraightFlush()) return jogosPontos.STRAIGHT_FLUSH;
    if (this.checkIsQuadra()) return jogosPontos.QUADRA;
    if (this.checkIsFullHouse()) return jogosPontos.FULL_HOUSE;
    if (this.checkIsFlush()) return jogosPontos.FLUSH;
    if (this.checkIsSequencia()) return jogosPontos.SEQUENCIA;
    if (this.checkIsTrinca()) return jogosPontos.TRINCA;
    if (this.checkIsDoisPares()) return jogosPontos.DOIS_PARES;
    if (this.checkIsPares()) return jogosPontos.PARES;
    return 0;
  }

}