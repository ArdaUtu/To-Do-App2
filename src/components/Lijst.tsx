type LijstProps = {
  taken: string[];
  onVerwijderTaak: (index: number) => void;
};

function Lijst({ taken, onVerwijderTaak }: LijstProps) {
  if (taken.length === 0) {
    return <p className="text-center text-slate-500">Nog geen taken.</p>;
  }

  return (
    <ul className="space-y-2">
      {taken.map((taak, index) => (
        <li
          className="flex items-center justify-between rounded border border-slate-200 p-3"
          key={`${taak}-${index}`}
        >
          <span>{taak}</span>
          <button
            aria-label={`Verwijder ${taak}`}
            className="text-sm font-semibold text-red-600 hover:text-red-800"
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
