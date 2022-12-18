import UserDataPage from './components/UserDataPage';
import { UserDataContextProvider } from './utils/UserContextProvider';
import "./App.css";

function App() {
  return (
    <div className="App">
      <UserDataContextProvider>
        <UserDataPage />
      </UserDataContextProvider>
    </div>

  );
}

export default App;
