import {Animation, createAnimation} from '@ionic/react';

const enterAnimation = (baseEl: HTMLElement): Animation => {
    const baseAnimation = createAnimation();
    const backdropAnimation = createAnimation();
    const wrapperAnimation = createAnimation();
    const ionBackdrop = baseEl.shadowRoot?.querySelector('ion-backdrop');
    const modalWrapper = baseEl.shadowRoot?.querySelector('.modal-wrapper');

    if (!ionBackdrop || !modalWrapper) {
        throw new ReferenceError('could not obtain the ionBackdrop or the modalWrapper');
    }

    backdropAnimation
        .addElement(ionBackdrop)
        .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
        .beforeStyles({
            'pointer-events': 'none',
        })
        .afterClearStyles(['pointer-events']);
    wrapperAnimation.addElement(modalWrapper).keyframes([
        {offset: 0, opacity: '0.01', transform: 'scale(0.9)'},
        {offset: 1, opacity: '1', transform: 'scale(1)'},
    ]);

    return baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(150)
        .addAnimation([backdropAnimation, wrapperAnimation]);
};

export default enterAnimation;
