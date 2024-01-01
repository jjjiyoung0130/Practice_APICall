import RootLayout from 'layouts/layout';
import DetailPage from 'pages/detail/DetailPage';
import MainPage from 'pages/main/mainPage';
import { createBrowserRouter } from 'react-router-dom';

const route = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '',
                element: <MainPage />,
            },
            {
                path: '/issues/:issueNumber',
                element: <DetailPage />,
            },
        ],
    },
]);

export default route;
