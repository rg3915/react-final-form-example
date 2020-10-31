import './App.css';
import Home from './containers/Home'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://final-form.org/docs/react-final-form/getting-started"
          target="_blank"
          rel="noopener noreferrer"
        >
          Final Form example
        </a>
        <br/>
        <br/>
        <Home />
      </header>
    </div>
  );
}

export default App;
