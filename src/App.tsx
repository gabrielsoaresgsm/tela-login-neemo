import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import PaginaLogin from './pages/login.page';

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path='/' element={<PaginaLogin />} />
      </Routes>
    </>
  );
}

export default App;
