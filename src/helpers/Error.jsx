function Error({ msg = 'Resource not found', stat = 404 }) {
    // Error message display
    return (
        <div className="content">

            <h1>{`Error ${stat}`}</h1>
            <h2 className="error">{msg}</h2>

        </div>
    )
}

export default Error