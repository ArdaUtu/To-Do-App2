import type { InputChangeEvent, InputfieldProps } from './types';

function Invoerveld({ waarde, setWaarde, onEnter }: InputfieldProps) {
  const veranderWaarde = (event: InputChangeEvent) => {
    setWaarde(event.target.value);
  };

  return (
    <input
      aria-label="New task"
      className="w-full rounded border border-slate-400 px-3 py-4 m-3 mx-auto"
      onChange={veranderWaarde}
      onKeyDown={(event) => event.key === 'Enter' && onEnter()}
      placeholder="Voeg een taak toe"
      type="text"
      value={waarde}
    />
  );
}

export default Invoerveld;
