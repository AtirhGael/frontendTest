// import './App.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import {
  BrowserRouter
} from "react-router-dom";
import MainPage from './pages/MainPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Provider store={store}>
      <BrowserRouter>
        <MainPage />
        <ToastContainer/>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
