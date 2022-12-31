import {useAuth} from "./use-auth";

export const useRedirectToLoginOnUnauthorised = () => {
    const authHook = useAuth();

    return <T>(promise: T) => {
        (promise as any).unwrap().catch((e: any) => {
            authHook.logout();
        });
        return promise;
    }
}
