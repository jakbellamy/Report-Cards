import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './src/src/polys'
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-quill/dist/quill.snow.css';
import 'nprogress/nprogress.css';
import 'src/src/utilities/mixins/chartjs';
import { enableES5 } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from 'src/src/serviceWorker';
import App from 'src/App';

enableES5();


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorker.unregister();
