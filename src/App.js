// import Header from './components/Header';
// import Footer from './components/Footer';
import Main from './components/Main';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    // element: <Layout />, // 공통 레이아웃
    children: [
      { path: "/", element: <Main/> },
    ],
  },
]);

function App() {

  return (<>
    <div>
      <RouterProvider router={router} /> {/* 라우터 제공 */}
    </div>
  </>);
}

export default App;
