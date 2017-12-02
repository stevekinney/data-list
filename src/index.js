import React from 'react';
import ReactDOM from 'react-dom';
import data from '../public/data.json';

import Application from './components/Application';

import './index.css';

ReactDOM.render(<Application data={data} />, document.getElementById('root'));
