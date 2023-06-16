import axios from "axios";

const BASE_URL = "http://localhost:3000/get_trending_from_redis";
// const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

// const headers = {
//     Authorization: "bearer " + TMDB_TOKEN,
// };

export const fetchDataFromApi = async () => {
    try {
        const { data } = await axios.get(BASE_URL, {
         
        });
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};
