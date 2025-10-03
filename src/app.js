import ReactDOM from "react-dom/client"
import HeaderComponent from "./components/Header"
import FooterComponent from "./components/Footer"
import BodyComponent from "./components/Body"
import About from "./components/About"
import Error from "./components/Error"
import Contact from "./components/Contact"
import RestaurantMenu from "./components/RestaurantMenu"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import {lazy, Suspense} from 'react'
import Shimmers from "./components/Shimmers"
// import Quicketo from "./components/Quicketo"

const Quicketo = lazy(()=> import ('./components/Quicketo'))



const Appetito = () => {
    return (
        <>
            <HeaderComponent />
            <Outlet />
            <FooterComponent />
        </>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Appetito />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <BodyComponent />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/quicketo",
                element: <Suspense fallback={Shimmers()}>
                  <Quicketo />
                </Suspense>
            },
            {
                path : "/restaurant/:id/:name",
                element: <RestaurantMenu />
            }
        ]
    },

])


const root = ReactDOM.createRoot(
    document.getElementById('root')
)

root.render(<RouterProvider router={appRouter} />)

