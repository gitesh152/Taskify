
import './App.css';
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import TaskPage from './Pages/TaskPage';

function App() {
  return (
    <div className="App" style={{ overflow: 'hidden', }}>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/task' element={<TaskPage />} />
      </Routes>
    </div>
  );
}

export default App;
