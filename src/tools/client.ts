import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {AccountsApi, AlbumApi, ArtistApi, LikeApi, SearchApi, TrackApi, UserApi, WeatherForecastApi} from '../api';

const client = axios.create();
const publicClient = axios.create();

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

publicClient.interceptors.request.use(
    async (config) => {
        config.withCredentials = true;
        const token = localStorage.getItem('jwt');
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`
            };
        }
        return config;
    },
    error => Promise.reject(error)
)

const accountsApi = new AccountsApi(
    undefined,
    'http://localhost:5103',
    client
);
const publicAccountsApi = new AccountsApi(
    undefined,
    'http://localhost:5103',
    publicClient
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

const userApi = new UserApi(
    undefined,
    'http://localhost:5103',
    client
);

const trackApi = new TrackApi(
    undefined,
    'http://localhost:5103',
    client
);

const albumkApi = new AlbumApi(
    undefined,
    'http://localhost:5103',
    client
);

const artistApi = new ArtistApi(
    undefined,
    'http://localhost:5103',
    client
);

const likeApi = new LikeApi(
    undefined,
    'http://localhost:5103',
    client
);

export {
    accountsApi,
    weatherForecastApi,
    searchApi,
    publicAccountsApi,
    userApi,
    trackApi,
    albumkApi,
    artistApi,
    likeApi
};

function refreshToken() {
    const jwt = localStorage.getItem('jwt');

    return publicClient.post('http://localhost:5103/Accounts/RefreshAccessToken', {
        accessToken: jwt,
        refreshToken: 'fffdfd'
    }, {
        withCredentials: true
    })
        .then(response => {
            const token = response.data.accessToken;
            localStorage.setItem('jwt', token);
            return token;
        })
}

export async function getAccessToken() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return await refreshToken();

    //check if the JWT is close to expiring (e.g. within 5 minutes)
    const jwtExp = jwtDecode<any>(jwt).exp;
    const fiveMinutesInSeconds = 60 * 1;
    if (jwtExp - (Date.now() / 1000) < fiveMinutesInSeconds) {
        // if it is, try to refresh the token
        return await refreshToken();
    } else {
        // otherwise, return the existing JWT
        return jwt;
    }
}

