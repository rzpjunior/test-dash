import axios from 'axios';
const url = process.env.VUE_APP_API_URL;
export default {
    login(credentials) {
        return axios
            .post(url + '/auth', credentials)
            .then(response => response.data);
    },
};