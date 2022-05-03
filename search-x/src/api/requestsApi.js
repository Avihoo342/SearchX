import axios from "axios";

class requestsApi {

    constructor() {
        this.client = axios.create({baseURL: process.env.REACT_APP_API_BASE_URL});
        this.client.interceptors.response.use(
            this.handleSuccess,
            this.handleError
        );
        this.client.interceptors.request.use(
            async (config) => {
                config.headers = {
                    'Content-Type': 'application/json',
                }
                return config;
            },
            (error) => {
                Promise.reject(error)
            });
    }

    handleSuccess = (response) => {
        return response;
    };

    handleError = (error) => {
        return Promise.reject(error);
    };

    async Search(userInput) {
        return this.client.get(`/${userInput}`);
    }
}

export default new requestsApi()

