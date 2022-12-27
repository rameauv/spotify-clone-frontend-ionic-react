import {IonContent, IonHeader, IonPage, IonRouterLink, IonToolbar} from '@ionic/react';
import './search.module.scss';
import styles from "./search.module.scss";
import SearchButton from "../../components/search-button/search-button";
import SearchCategorie from "../../components/search-categorie/search-categorie";
import {Link, useRouteMatch} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {useContext} from "react";
import {PathsContext, TabRouteParams} from "../private/private-pages-router";

interface SearchProps extends RouteComponentProps {
}

const Search: React.FC<SearchProps> = ({match}) => {
    const paths = useContext(PathsContext);
    const tab = useRouteMatch<TabRouteParams>().params.tab;
    const advancedSearchPath = paths["serach-advanceSearch"](tab);
    return (
        <IonPage>
            <IonHeader><IonToolbar className="no-height"/></IonHeader>
            <IonContent fullscreen>
                <div className={styles.header}>
                    <p className="app-mr-auto app-font-h2 app-font-bold">Search</p>
                </div>
                <div className={styles.searchButton}>
                    <IonRouterLink routerLink={advancedSearchPath}>
                        <SearchButton></SearchButton>
                    </IonRouterLink>
                </div>
                <p className={styles.browseAll}>Browse all</p>
                <div className={styles.categories}>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link to={`${match.url}/tag`}>
                            <SearchCategorie/>
                        </Link>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Search;
