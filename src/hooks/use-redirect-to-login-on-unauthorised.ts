import {useIonRouter} from "@ionic/react";

export const useRedirectToLoginOnUnauthorised = () => {
    const router = useIonRouter();
    return <T>(promise: T) => {
        console.log(promise);
        (promise as any).unwrap().catch((e: any) => {
            console.log(e);
            router.push('/', 'root', "replace");
            console.log(promise);
        });
        console.log(promise);
        return promise;
    }
}
