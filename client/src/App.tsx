import PlayerCompare from "./pages/Players";

function App() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#f8fafc",
      }}
    >
      <PlayerCompare />
    </div>
  );
}

export default App;