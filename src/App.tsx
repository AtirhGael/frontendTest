import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import Authentication from './pages/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Unprotected route for login/signup */}
          <Route path="/" element={<Authentication />} />
          
          {/* Protected routes: only accessible when authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<MainPage />} /> {/* Catch-all for MainPage routes */}
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
