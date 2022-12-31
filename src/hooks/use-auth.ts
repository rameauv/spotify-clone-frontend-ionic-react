import {accountsApi, publicAccountsApi} from "../tools/client";
import {createAnimation, useIonRouter} from "@ionic/react";
import {useDispatch} from "react-redux";
import {fetechCurrentUser} from "../store/slices/current-user/current-user-slice";

const animationBuilder = (baseEl: any, opts: any) => {
    const enteringAnimation = createAnimation()
        .addElement(opts.enteringEl)
        .fromTo('opacity', 0, 1)
        .duration(250);

    const leavingAnimation = createAnimation()
        .addElement(opts.leavingEl)
        .fromTo('opacity', 1, 0)
        .duration(250);

    const animation = createAnimation()
        .addAnimation(enteringAnimation)
        .addAnimation(leavingAnimation);

    return animation;
};

export const useAuth = () => {
    const router = useIonRouter();
    const dispatch = useDispatch();
    return {
        login: async (credentials: { username: string, password: string }) => {
            console.log('useAuth hook login');
            console.log('useAuth hook login -> login request');
            const response = await publicAccountsApi.accountsLoginPost({
                username: credentials.username,
                password: credentials.password
            })
            const token = response.data;
            console.log(token);
            if (!token?.accessToken) {
                return;
            }
            console.log('useAuth hook login -> set access token');
            localStorage.setItem('jwt', token.accessToken);
            console.log('useAuth hook login -> fetch current user');
            await dispatch(fetechCurrentUser());
            console.log('useAuth hook login -> redicrect to /home');
            router.push(`/home`, 'root', "replace", undefined, animationBuilder);
        },
        logout: async () => {
            try {
                await accountsApi.accountsLogoutPost();
            } catch (e) {
                console.error(e);
            }
            localStorage.clear();
            // console.log('wait before cleaning the state');
            // await new Promise(resolve => setTimeout(resolve, 3000))
            await dispatch({name: '', type: 'USER_LOGOUT'});
            router.push('/', 'root', 'replace', undefined, animationBuilder);
        }
    };
}
