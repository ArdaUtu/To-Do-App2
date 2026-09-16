import React, { useState } from 'react';
import Invoerveld from './components/Invoerveld';
import VoegTaakToe from './components/Voegtaaktoe';
import Lijst from './components/Lijst';


const App = () => {
  const [taken, setTaken] = useState<string[]>([]);
  const [inputTekst, setInputTekst] = useState<string>('');

  const voegTaakToe = () => {
    if (inputTekst.trim() === '') return;
    setTaken([...taken, inputTekst]);
    setInputTekst('');
  };

  const verwijderTaak = (indexVanTaak: number) => {
    setTaken(taken.filter((_, index) => index !== indexVanTaak));
  };

  return (
    <div className="text-black bg-white p-30 py-16 rounded shadow-md">
      <h1 className='text-center'>To-Do App</h1>
      
      <div className="flex-1 p-2 mb-5">
        <Invoerveld
          onEnter={voegTaakToe}
          setWaarde={setInputTekst}
          waarde={inputTekst}
        />
        <VoegTaakToe onToevoegen={voegTaakToe} />
      </div>

      <Lijst taken={taken} onVerwijderTaak={verwijderTaak} />
    </div>
  );
};

export default App;

