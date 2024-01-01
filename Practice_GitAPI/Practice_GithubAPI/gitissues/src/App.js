import './App.css';

import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import route from 'routes/route.js';
import { store } from 'store/store';

function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={route} />
        </Provider>
    );
}

export default App;
