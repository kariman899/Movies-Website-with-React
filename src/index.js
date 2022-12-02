import React from 'react';
import ReactDOM from 'react-dom/client';
import 'jquery/dist/jquery.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import './index.css';
import App from './App';
import { HashRouter} from 'react-router-dom' ;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
    <App />
    </HashRouter>
  </React.StrictMode>
);


