import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import './index.css';

render(
    <div>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </div>,
    document.getElementById('root'));
registerServiceWorker();
