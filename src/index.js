import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// bọc app trong PersistsGate, nó giúp con React daylay việc render UI cho tới khi store được update
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import reduxStore from './redux';
import { UserProvider } from './context/UserContext';
const { store, persistor } = reduxStore()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        {/* loading sẽ nhận một components để load Ui nếu ko cần thì để null nếu không sẽ lỗi */}
        <PersistGate loading={null} persistor={persistor}>
            <UserProvider>
            <BrowserRouter>
                    <App />
            </BrowserRouter>
            </UserProvider>
        </PersistGate>
    </Provider>
);