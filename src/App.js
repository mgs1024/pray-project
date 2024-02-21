import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          pray-project
        </p>
        <a
          className="App-link"
          href="http://localhost:3000/main"
          target="_blank"
          rel="noopener noreferrer"
        >
          main
        </a>
      </header>
    </div>
  );
}

export default App;
