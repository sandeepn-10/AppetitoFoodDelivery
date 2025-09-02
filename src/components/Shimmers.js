const Shimmers = () => {
    return (
        <div className="restaurant-cards">
            {Array.from({ length: 12 }, (_, index) => (
                <div className="shimmer-card" key={index}/>
            ))}
        </div>
    )
}

export default Shimmers