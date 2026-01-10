import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/appStore.js';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./components/Home.jsx'));
const Signup = lazy(() => import('./components/Signup.jsx'));
const Login = lazy(() => import('./components/Login.jsx'));
const ChannelPage = lazy(() => import('./components/ChannelPage.jsx'));
const UploadVideo = lazy(() => import('./components/UploadVideo.jsx'));
const VideoPlayer = lazy(() => import('./components/VideoPlayer.jsx'));
const ManageVideo = lazy(() => import('./components/ManageVideo.jsx'));
const SearchPage = lazy(() => import('./components/SearchPage.jsx'));
const YouTab = lazy(() => import('./components/YouTab.jsx'));
const WatchLaterAll = lazy(() => import('./components/WatchLaterAll.jsx'));
const LikesVideoAll = lazy(() => import('./components/LikesVideoAll.jsx'));
const AllChannel = lazy(() => import('./components/AllChannel.jsx'))

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", 
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
          )
      },
      { path: "/login", 
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login /> 
          </Suspense>
        )
      },
      { path: "/signup",
         element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Signup />
          </Suspense> 
        )
      },
      { path: "/channel/:id", 
        element: (
        <Suspense fallback={<div>Loading...</div>}>
              <ChannelPage />
        </Suspense>
      )
      },
      {path: "/upload", 
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UploadVideo />  
          </Suspense>
        )
      },
      {path: "/video/:id", 
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <VideoPlayer />
          </Suspense>
        )
      },
      {path: "/channel/:id/manage", 
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ManageVideo />
          </Suspense>
        )
      },
      {path: "/search", 
        element:(
          <Suspense fallback={<div>Loading...</div>}>
            <SearchPage />
          </Suspense>
        )
      },
      {path: "/you", 
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <YouTab />
          </Suspense>
        )
      },
      {path: "/playlist/watchlater", 
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <WatchLaterAll />
          </Suspense>
        )
      },
      {path: "/playlist/liked", 
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LikesVideoAll />
          </Suspense>
        )
      },
      {path: "/allChannel",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AllChannel />
          </Suspense>
        )
      }
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
