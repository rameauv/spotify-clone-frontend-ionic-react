import {createAnimation} from '@ionic/react';

const animationBuilder = (baseEl: any, opts: any) => {
    const enteringAnimation = createAnimation()
        .addElement(opts.enteringEl)
        .fromTo('opacity', 0, 1)
        .duration(200);

    const leavingAnimation = createAnimation()
        .addElement(opts.leavingEl)
        .fromTo('opacity', 1, 0)
        .duration(200);

    const animation = createAnimation()
        .addAnimation(enteringAnimation)
        .addAnimation(leavingAnimation);

    return animation;
};

export default animationBuilder;
