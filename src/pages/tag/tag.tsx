import {IonContent, IonHeader, IonPage} from '@ionic/react';
import styles from './tag.module.scss';
import React from "react";
import TagPageScroller from "../../components/tag-page-scroller/tag-page-scroller";
import HeaderWithLeftTitle from "../../components/headers/header-with-left-title/header-with-left-title";

const Tag: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <HeaderWithLeftTitle title="French variety"/>
            </IonHeader>
            <IonContent>
                <div className={styles.content}>
                    <p className={styles.content__title}>French Variety</p>
                    <div className={styles.content__sliders}>
                        <TagPageScroller/>
                        <TagPageScroller/>
                        <TagPageScroller/>
                        <TagPageScroller/>
                        <TagPageScroller/>
                        <TagPageScroller/>
                        <TagPageScroller/>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Tag;
