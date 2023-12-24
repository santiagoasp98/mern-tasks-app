import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import TasksPage from './pages/TasksPage.jsx';
import AddTaskPage from './pages/AddTaskPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

import Navbar from './components/Navbar/index.jsx';

import { AuthProvider } from './context/AuthContext.jsx';
import { TaskProvider } from './context/TasksContext.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

import './App.css'

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Navbar />
          <main className='container'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/tasks' element={<TasksPage />} />
                <Route path='/tasks/new' element={<AddTaskPage />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
