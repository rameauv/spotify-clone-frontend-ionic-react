import {defineConfig} from "cypress";
import {Client} from "pg";
import axios from "axios";
import {AccountsApi} from "./src/api";
import {config} from "dotenv";

config();

const throwIfEnvVariableMissing = (envVariableName: string) => {
    const value = process.env[envVariableName];
    if (value == null || value.trim() === '') {
        throw new Error(`please set the env variable ${envVariableName}`)
    }
    return value;
};

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            on("task", {
                async initializeDb() {
                    const connectionString = throwIfEnvVariableMissing('E2E_DB_CONNECTION-STRING');
                    const userName = throwIfEnvVariableMissing('E2E_API_USER_USERNAME');
                    const password = throwIfEnvVariableMissing('E2E_API_USER_PASSWORD');
                    const basePath = throwIfEnvVariableMissing('E2E_API_BASE-PATH');

                    const client = new Client({
                        connectionString: connectionString,
                        ssl: false
                    });
                    await client.connect();
                    await client.query('TRUNCATE "Likes", "RefreshTokens", "Users";');
                    const axiosInstance = axios.create();
                    const accountsApi = new AccountsApi(
                        undefined,
                        basePath,
                        axiosInstance
                    );
                    const res = await accountsApi.accountsRegisterPost({
                        username: userName,
                        password: password,
                        data: ''
                    });
                    await client.end();
                    return {userName, password};
                }
            });
        },
    },
});
