const chai = require('chai');

const expect = chai.expect;

const jogadaPoker = require('../../src/controllers/jogadaPoker');

describe('Teste JogadaPojer', function() {
  
  describe('Teste Royal Flush', function() {
    
    it('Deve retornar um empate', function() {
      const maos = '10CJCQCKCAC 10EJEQEKEAE';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('string');
      expect(resultado).to.be.equal('Empate');
    });

    it('Deve retornar o ganhador 10CJCQCKCAC, que ganhou de um Straight Flush 4E5E6E7E8E', function() {
      const maos = '10CJCQCKCAC 4E5E6E7E8E';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).to.be.equal('10CJCQCKCAC');
    });

  });

  describe('Teste Straight Flush', function() {
    
    it('Deve retornar um empate, mas vencendo o 7C8C9C10CJC', function() {
      const maos = '4E5E6E7E8E 7C8C9C10CJC';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('7C8C9C10CJC');
    });

    it('Deve retornar o ganhador 4E5E6E7E8E que ganhou de uma quadra AE4E4C4O4P', function() {
      const maos = '4E5E6E7E8E AE4E4C4O4P';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).to.be.equal('4E5E6E7E8E');
    });

  });

  describe('Teste Quadra', function() {
    
    it('Deve retornar um empate, mas vencendo o AE4E4C4O4P', function() {
      const maos = 'AE4E4C4O4P 8C7E7C7O7P';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('AE4E4C4O4P');
    });

    it('Deve retornar o ganhador 8C7E7C7O7P que ganhou de um Full House 7C7PKOKEKP', function() {
      const maos = '8C7E7C7O7P 7C7PKOKEKP';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('8C7E7C7O7P');
    });

  });

  describe('Teste Full House', function() {
    
    it('Deve retornar um empate entre as maos 3E3OACAEAP e 7C7PKOKEKP, mas vencendo o 3E3OACAEAP', function() {
      const maos = '3E3OACAEAP 7C7PKOKEKP';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('3E3OACAEAP');
    });

    it('Deve retornar o ganhador 7C7PKOKEKP que ganhou de um Flush AC7C2C9C10C', function() {
      const maos = 'AC7C2C9C10C 7C7PKOKEKP';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('7C7PKOKEKP');
    });

  });

  describe('Teste Flush', function() {
    
    it('Deve retornar um empate entre as maos AC7C2C9C10C e 8P7PQP3PKP, mas vencendo o AC7C2C9C10C', function() {
      const maos = 'AC7C2C9C10C 8P7PQP3PKP';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('AC7C2C9C10C');
    });

    it('Deve retornar um empate entre as maos AC7C2C9C10C e AE5E2E3EKE, mas vencendo o AE5E2E3EKE', function() {
      const maos = 'AC7C2C9C10C AE5E2E3EKE';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('AE5E2E3EKE');
    });

    it('Deve retornar o ganhador AC7C2C9C10C que ganhou de uma Sequência 2C3E4P5C6C', function() {
      const maos = 'AC7C2C9C10C 2C3E4P5C6C';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('AC7C2C9C10C');
    });

  });

  describe('Teste Sequência', function() {
    
    it('Deve retornar um empate entre as maos 2C3E4P5C6C e 8E9E10EJEQE, mas vencendo o 8E9E10EJEQE', function() {
      const maos = '2C3E4P5C6C 8E9E10EJEQE';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('8E9E10EJEQE');
    });

    it('Deve retornar o ganhador 2C3E4P5C6C que ganhou de uma Trinca JEJOJC5E8P', function() {
      const maos = '2C3E4P5C6C JEJOJC5E8P';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('2C3E4P5C6C');
    });

  });

  describe('Teste Trinca', function() {
    
    it('Deve retornar um empate entre as maos JEJOJC5E8P e 9O9E9P3CKE, mas vencendo o 9O9E9P3CKE', function() {
      const maos = 'JEJOJC5E8P 9O9E9P3CKE';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('9O9E9P3CKE');
    });

    it('Deve retornar um empate entre as maos 7E7O7PKOQP e 9O9E9P3CKE, mas vencendo o 7E7O7PKOQP', function() {
      const maos = '7E7O7PKOQP 9O9E9P3CKE';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('7E7O7PKOQP');
    });

    it('Deve retornar o ganhador 7E7O7PKOQP que ganhou de Dois pares 6E6P10P10OKC', function() {
      const maos = '7E7O7PKOQP 6E6P10P10OKC';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('7E7O7PKOQP');
    });

  });

  describe('Teste Dois Pares', function() {
    
    it('Deve retornar um empate entre as maos 6E6P10P10OKC e 8E8O9E9P2P, mas vencendo o 6E6P10P10OKC', function() {
      const maos = '6E6P10P10OKC 8E8O9E9P2P';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('6E6P10P10OKC');
    });

    it('Deve retornar o ganhador 8E8O9E9P2P que ganhou de um Par ACAPKO6E8C', function() {
      const maos = '8E8O9E9P2P ACAPKO6E8C';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('8E8O9E9P2P');
    });

  });

  describe('Teste Par', function() {
    
    it('Deve retornar um empate entre as maos 7C7PACKP4O e 10P10EKEQC2C, mas vencendo o 7C7PACKP4O', function() {
      const maos = '7C7PACKP4O 10P10EKEQC2C';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('7C7PACKP4O');
    });

    it('Deve retornar o ganhador 10P10EKEQC2C que ganhou de uma mão com carta mais alta KOJP10C6C3O', function() {
      const maos = '10P10EKEQC2C KOJP10C6C3O';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('10P10EKEQC2C');
    });

  });

  describe('Teste Carta mais alta', function() {
    
    it('Deve retornar um empate entre as maos KOJP10C6C3O e 9P8PAO10PQE, mas vencendo o 9P8PAO10PQE', function() {
      const maos = 'KOJP10C6C3O 9P8PAO10PQE';
      const resultado = jogadaPoker.checkVencedor(maos);
      expect(resultado).to.be.an('object');
      expect(resultado.mao).to.be.an('string');
      expect(resultado.mao).equal('9P8PAO10PQE');
    });

  });

})