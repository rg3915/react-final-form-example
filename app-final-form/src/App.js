import './App.css';
import MyForm from './containers/MyForm'

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
        <MyForm />
      </header>
    </div>
  );
}

export default App;
