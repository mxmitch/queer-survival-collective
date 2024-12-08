import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    // State to store data fetched from the backend
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch data from the backend
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/users");
            setData(response.data); // Assume backend sends an array of objects
            setLoading(false);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to fetch data from the server.");
            setLoading(false);
        }
    };

    // UseEffect to call fetchData when the component loads
    useEffect(() => {
        fetchData();
    }, []);

    // Render the content
    return (
        <div style={{ padding: "20px" }}>
            <h1>Welcome to the Home Page</h1>
            <p>This page fetches data from a PostgreSQL database via the backend.</p>
            
            {loading && <p>Loading data...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            {!loading && !error && (
                <div>
                    <h2>Data from the Database:</h2>
                    {data.length > 0 ? (
                        <ul>
                            {data.map((item, index) => (
                                <li key={index}>
                                    {JSON.stringify(item)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No data available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
