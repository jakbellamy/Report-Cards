import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-quill/dist/quill.snow.css';
import 'nprogress/nprogress.css';
import 'src/utilities/assets/css/prism.css';
import 'src/utilities/mixins/chartjs';
import 'src/utilities/mixins/prismjs';
import 'src/utilities/mock';
import { enableES5 } from 'immer';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from 'src/serviceWorker';
import { SettingsProvider } from 'src/utilities/context/SettingsContext';
import { configureStore } from 'src/utilities/store';
import { restoreSettings } from 'src/utilities/utils/settings';
import HttpsRedirect from 'react-https-redirect';
import App from 'src/App';

enableES5();

const store = configureStore();
const settings = restoreSettings();

ReactDOM.render(
  <HttpsRedirect>
    <Provider store={store}>
      <SettingsProvider settings={settings}>
        <App />
      </SettingsProvider>
    </Provider>
  </HttpsRedirect>,
  document.getElementById('root')
);

serviceWorker.unregister();
