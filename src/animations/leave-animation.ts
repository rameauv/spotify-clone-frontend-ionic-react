import {Animation, createAnimation} from '@ionic/react';

const leaveAnimation = (baseEl: HTMLElement): Animation => {
    const baseAnimation = createAnimation();
    const backdropAnimation = createAnimation();
    const wrapperAnimation = createAnimation();
    const ionBackdrop = baseEl.shadowRoot?.querySelector('ion-backdrop');
    const modalWrapper = baseEl.shadowRoot?.querySelector('.modal-wrapper');

    if (!ionBackdrop || !modalWrapper) {
        throw new ReferenceError('could not obtain the ionBackdrop or the modalWrapper');
    }

    backdropAnimation.addElement(ionBackdrop).fromTo('opacity', 'var(--backdrop-opacity)', 0);

    wrapperAnimation.addElement(modalWrapper).fromTo('opacity', 0.99, 0);

    return baseAnimation
        .addElement(baseEl)
        .easing('ease-in-out')
        .duration(150)
        .addAnimation([backdropAnimation, wrapperAnimation]);
};

export default leaveAnimation;
