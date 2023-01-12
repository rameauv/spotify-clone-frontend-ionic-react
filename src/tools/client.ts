import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {AccountsApi, AlbumApi, ArtistApi, LikeApi, SearchApi, TrackApi, UserApi} from '../api';

const throwIfEnvVariableMissing = (envVariableName: string) => {
    const value = process.env[envVariableName];
    if (value == null || value.trim() === '') {
        throw new Error(`please set the env variable ${envVariableName}`)
    }
    return value;
};

const client = axios.create();
const publicClient = axios.create();
const basePath = throwIfEnvVariableMissing('REACT_APP_API_BASE-PATH');

publicClient.interceptors.request.use(
    (config) => {
        config.withCredentials = true;
        return config;
    }
);

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
    basePath,
    client
);
const publicAccountsApi = new AccountsApi(
    undefined,
    basePath,
    publicClient
);

const searchApi = new SearchApi(
    undefined,
    basePath,
    client
);

const userApi = new UserApi(
    undefined,
    basePath,
    client
);

const trackApi = new TrackApi(
    undefined,
    basePath,
    client
);

const albumkApi = new AlbumApi(
    undefined,
    basePath,
    client
);

const artistApi = new ArtistApi(
    undefined,
    basePath,
    client
);

const likeApi = new LikeApi(
    undefined,
    basePath,
    client
);

export {
    accountsApi,
    searchApi,
    publicAccountsApi,
    userApi,
    trackApi,
    albumkApi,
    artistApi,
    likeApi
};

async function refreshToken() {
    const jwt = localStorage.getItem('jwt');

    const response = await publicAccountsApi.accountsRefreshAccessTokenPost({
        withCredentials: true
    });

    const token = response.data.accessToken;
    localStorage.setItem('jwt', token);
    return token;
}

export async function getAccessToken() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return await refreshToken();

    //check if the JWT is close to expiring (e.g. within 5 minutes)
    const jwtExp = jwtDecode<any>(jwt).exp;
    const oneMinute = 60 * 1;
    if (jwtExp - (Date.now() / 1000) < oneMinute) {
        // if it is, try to refresh the token
        return await refreshToken();
    } else {
        // otherwise, return the existing JWT
        return jwt;
    }
}

