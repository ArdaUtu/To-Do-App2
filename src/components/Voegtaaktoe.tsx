type VoegTaakToeProps = {
  onToevoegen: () => void;
};

function VoegTaakToe({ onToevoegen }: VoegTaakToeProps) {
  return (
    <button
      className="mt-2 w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      onClick={onToevoegen}
      type="button"
    >
      Taak toevoegen
    </button>
  );
}

export default VoegTaakToe;
