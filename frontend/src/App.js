import React, { useState } from 'react';
import MaoCartas from './MaoCartas/MaoCartas';
import Resultado from './Resultado';

function App() {
  const [primeiraMao, setPrimeiraMao] = useState([]);
  const [segundaMao, setSegundaMao] = useState([]);
  const [resultado, setResultado] = useState([]);
  const [empate, setEmpate] = useState(false)

  const handleValidaResultado = async() => {
    setEmpate(false);
    setResultado([])
    const resultado = await checaResultado(`${primeiraMao.join('')} ${segundaMao.join('')}`);
    if (typeof resultado ==='string' && resultado === 'Empate') return setEmpate(true);
    setResultado(resultado.cartas);
  }

  const checaResultado = async (maos) => {
    const resposta = await fetch('http://localhost:5000/api/checkVencedor', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ jogos: maos })
    });

    const data = await resposta.json();
    return data;
  }

  const getMao = (mao = '') => {
    let carta = '';
    let retorno = [];
    for (let i = 0; i < mao.length; i++) {
      if (['C', 'E', 'O', 'P'].includes(mao.charAt(i))) {
        const nipe = mao.charAt(i);
        retorno.push(`${carta}${nipe}`);
        carta = '';
      } else {
        carta += mao.charAt(i);
      }
    }
    return retorno;
  }

  const setMao = (valor, tipo) => {
    let mao = getMao(valor);
    if (tipo === 1) setPrimeiraMao(mao)
    else setSegundaMao(mao);
  }

  return (
    <div>
      <label>Informe a primeira mão</label>
      <br/>
      <input onChange={(e) => setMao(e.target.value, 1)}/>
      <MaoCartas cartas={primeiraMao} />
      <br/>
      <label>Informe a segunda mão</label>
      <br/>
      <input onChange={(e) => setMao(e.target.value, 2)}/>
      <MaoCartas cartas={segundaMao} />
      <br/>
      <button onClick={handleValidaResultado}>Validar Resultado</button>
      <br/>
      <br/>
      <Resultado cartasVencedoras={resultado} empate={empate}/>
    </div>
  );
}

export default App;
