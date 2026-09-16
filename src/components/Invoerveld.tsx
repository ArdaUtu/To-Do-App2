import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

type InvoerveldProps = {
  waarde: string;
  setWaarde: Dispatch<SetStateAction<string>>;
  onEnter: () => void;
};

function Invoerveld({ waarde, setWaarde, onEnter }: InvoerveldProps) {
  const veranderWaarde = (event: ChangeEvent<HTMLInputElement>) => {
    setWaarde(event.target.value);
  };

  return (
    <input
      aria-label="Nieuwe taak"
      className="w-full rounded border border-slate-300 px-3 py-2"
      onChange={veranderWaarde}
      onKeyDown={(event) => event.key === 'Enter' && onEnter()}
      placeholder="Voeg een taak toe"
      type="text"
      value={waarde}
    />
  );
}

export default Invoerveld;
