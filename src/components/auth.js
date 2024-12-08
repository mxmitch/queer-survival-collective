import axios from "axios";

const fetchData = async () => {
    try {
        const response = await axios.get("http://localhost:5000/");
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

useEffect(() => {
    fetchData();
}, []);
