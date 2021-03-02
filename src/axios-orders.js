import axios from 'axios';

const axInstance = axios.create({
    baseURL: 'https://react-my-burger-51c91-default-rtdb.firebaseio.com/'
});

export default axInstance;