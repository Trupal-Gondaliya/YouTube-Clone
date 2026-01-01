import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/appStore.js';
import ChannelPage from './components/ChannelPage.jsx'
import UploadVideo from './components/UploadVideo.jsx'
import VideoPlayer from './components/VideoPlayer.jsx'
import ManageVideo from './components/ManageVideo.jsx'

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/channel/:id", element: <ChannelPage />},
      {path: "/upload", element: <UploadVideo />},
      {path: "/video/:id", element: <VideoPlayer />},
      {path: "/channel/:id/manage", element: <ManageVideo />}
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={Router} />
    </PersistGate>
  </Provider>
)
