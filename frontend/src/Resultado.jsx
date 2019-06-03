import React from 'react';
import MaoCartas from './MaoCartas/MaoCartas';

export default ({
  cartasVencedoras,
  empate
}) => {

  return empate 
    ? <h3>Foi empate</h3>
    :( cartasVencedoras.length > 0 && 
      (<div>
        <h3>A mão vencedora</h3>
        <MaoCartas cartas={cartasVencedoras} />
      </div>)
  );
}
