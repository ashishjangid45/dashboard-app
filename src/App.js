import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import Dashboard from './components/Dashboard';
import 'antd/dist/reset.css'; 

const App = () => (
  <Provider store={store}>
    <div style={{ padding: '20px' }}>
      <Dashboard />
    </div>
  </Provider>
);

export default App;
