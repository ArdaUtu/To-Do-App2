import type { VoegTaakToeProps } from './types';

function VoegTaakToe({ onToevoegen }: VoegTaakToeProps) {
  return (
    <button
      className="mt- w-full rounded bg-blue-400 px-4 py-2 font-semibold text-white hover:bg-blue-700 m-5 mx-auto transform transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
      onClick={onToevoegen}
      type="button"
    >
      Taak toevoegen
    </button>
  );
}

export default VoegTaakToe;
