import NodeFunctions from "./components/Nodefunctions";

// Fase 2: alleen App mag useState<Note[]> hebben. Verplaats de state van Nodefunctions naar App (of naar een useNotes()-hook, bonus 4) en verwijder Nodefunctions.
const App = () => {
  return <NodeFunctions />;
};

export default App;
