import React from 'react';
import { Card } from 'react-casino';

const NIPES = {
  C: 'H',
  P: 'C',
  E: 'S',
  O: 'D',
}

export default ({
  cartas,
}) => {
  const cartasOrganizadas =  cartas.map(carta => {
    let valor = carta.replace(/[O,C,P,E]+/g, '');
    if (valor === '10') valor = 'T';
    const nipe = NIPES[carta.charAt(carta.length - 1)];
    return {
      nipe,
      valor
    }
  });

  return (
    <div>
      {cartasOrganizadas.map((carta, index) => (
        <Card face={carta.valor} suit="S" key={`carta_${index}`}/>
      ))}
    </div>);
}
