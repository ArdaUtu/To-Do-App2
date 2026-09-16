import type { Listprops } from './types';

function Lijst({ taken, onVerwijderTaak }: Listprops) {
  if (taken.length === 0) {
    return <p className="text-center text-slate-500">Nog geen taken.</p>;
  }

  return (
    <ul className="w-full space-y-2">
      {taken.map((taak, index) => (
        <li
          className="flex w-full items-center bg-white border-slate-200 p-3"
          key={`${taak}-${index}`}
        >
          <span>{taak}</span>
          <button
            aria-label={`Verwijder ${taak}`}
            className=" text-white bg-blue-400 hover:bg-blue-700 p-3 ml-auto transform transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 "
            onClick={() => onVerwijderTaak(index)}
            type="button"
          >
            Verwijderen
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Lijst;
