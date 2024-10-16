import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header></Header>
      </div>

      <MoviesGrid></MoviesGrid>

      <Footer></Footer>
    </div>
  );
}

export default App;
