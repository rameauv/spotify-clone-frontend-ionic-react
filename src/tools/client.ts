import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {AccountsApi, SearchApi, WeatherForecastApi} from '../api';

const client = axios.create();
const clientBase = axios.create();

client.interceptors.request.use(
    async (config) => {
        config.withCredentials = true;
        const token = await getAccessToken();
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`
            };
        }
        return config;
    },
    error => Promise.reject(error)
);

const accountsApi = new AccountsApi(
    undefined,
    'http://localhost:5103',
    client
);
const weatherForecastApi = new WeatherForecastApi(
    undefined,
    'http://localhost:5103',
    client
);

const searchApi = new SearchApi(
    undefined,
    'http://localhost:5103',
    client
);

export {accountsApi, weatherForecastApi, searchApi};

function refreshToken() {
    const jwt = localStorage.getItem('jwt');

    return clientBase.post('http://localhost:5103/Accounts/RefreshAccessToken', {
        accessToken: jwt,
        refreshToken: 'fffdfd'
    }, {
        withCredentials: true
    })
        .then(response => {
            const token = response.data;
            console.log(token);
            localStorage.setItem('jwt', token.accessToken);
            return token;
        })
        .catch(reason => {
            console.log(reason);
            return undefined;
        });
}

export async function getAccessToken() {
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    if (!jwt) return null;

    //check if the JWT is close to expiring (e.g. within 5 minutes)
    const jwtExp = jwtDecode<any>(jwt).exp;
    console.log(jwtDecode<any>(jwt));
    const fiveMinutesInSeconds = 60 * 1;
    if (jwtExp - (Date.now() / 1000) < fiveMinutesInSeconds) {
        // if it is, try to refresh the token
        return await refreshToken();
    } else {
        // otherwise, return the existing JWT
        return jwt;
    }
}
