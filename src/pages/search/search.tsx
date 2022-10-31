import {IonContent, IonHeader, IonPage, IonToolbar, useIonModal, useIonViewWillLeave} from '@ionic/react';
import './search.module.scss';
import styles from "./search.module.scss";
import SearchButton from "../../components/search-button/search-button";
import SearchCategorie from "../../components/search-categorie/search-categorie";
import AdvancedSearch from "../advanced-search/advanced-search";
import {Link, useHistory} from "react-router-dom";
import {useContext} from "react";
import {SongPathContext} from "../../App";

const Search: React.FC<any> = () => {
    const songPath = useContext(SongPathContext);
    const history = useHistory();
    const [present, dismiss] = useIonModal(AdvancedSearch, {
        onDismiss: (data: string, role: string) => dismiss(data, role),
        songPath: songPath,
        history: history
    });

    const presentModal = () => present({
        showBackdrop: false,
        cssClass: 'search-modal',
        animated: false
    });

    useIonViewWillLeave(() => {
        console.log('useIonViewWillLeave');
        dismiss();
    });

    return (
        <IonPage>
            <IonHeader><IonToolbar className="no-height"/></IonHeader>
            <IonContent fullscreen>
                <div className={styles.header}>
                    <p className="app-mr-auto app-font-h2 app-font-bold">Search</p>
                </div>
                <div className={styles.searchButton}>
                    <Link to="/tab2/test">
                        <SearchButton></SearchButton>
                    </Link>
                </div>
                <p className={styles.browseAll}>Browse all</p>
                <div className={styles.categories}>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                    <div className={styles.item}>
                        <SearchCategorie></SearchCategorie>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Search;
