import {useAuth} from './use-auth';

export const useRedirectToLoginOnUnauthorised = () => {
    const authHook = useAuth();

    return <T>(promise: Promise<T>) => {
        return promise.catch((e: any) => {
            if (e.message === 'unauthorized') {
                authHook.logout();
                return;
            }
            throw e;
        });
    }
}
