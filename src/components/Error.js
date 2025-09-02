import { useRouteError } from "react-router"

const Error = () => {
    const error = useRouteError()
    return (
        <div className="error-page">
            <h1>Oops!!</h1>
            <h2>Something Went Wrong...</h2>
            <p>{error.status} : {error.statusText}</p>
            <p>{error.data}</p>
        </div>
    )
}

export default Error