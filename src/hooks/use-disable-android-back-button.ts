import {useEffect} from 'react';

export function useDisableAndroidBackButton() {
    useEffect(() => {
        const eventListner = (ev: any) => {
            ev.detail.register(10, () => {
                console.log('Handler was called!');
            });
        };
        document.addEventListener('ionBackButton', eventListner);
        return () => {
            document.removeEventListener('ionBackButton', eventListner);
        };
    }, []);
}
