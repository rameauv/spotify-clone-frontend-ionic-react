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
            const response = await publicAccountsApi.accountsLoginPost({
                username: credentials.username,
                password: credentials.password
            })
            const token = response.data;
            if (!token?.accessToken) {
                return;
            }
            localStorage.setItem('jwt', token.accessToken);
            await dispatch(fetechCurrentUser());
        },
        logout: async () => {
            try {
                await accountsApi.accountsLogoutPost();
            } catch (e) {
                console.error(e);
            }
            localStorage.clear();
            await dispatch({name: '', type: 'USER_LOGOUT'});
        }
    };
}
