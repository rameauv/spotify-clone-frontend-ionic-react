import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'myApp',
    webDir: 'build',
    bundledWebRuntime: false,
    server: {
        url: 'http://localhost:3000',
        cleartext: true
    }
};

export default config;
