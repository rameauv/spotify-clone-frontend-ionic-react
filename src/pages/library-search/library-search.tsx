import {IonContent, IonHeader, IonIcon, IonInput, IonPage, IonToolbar} from '@ionic/react';
import styles from './library-search.module.scss';
import React, {useState} from "react";
import {chevronBackOutline} from 'ionicons/icons';
import {useHistory} from "react-router-dom";
import SearchSong from "../../components/thumbnails/search-song/search-song";

enum Status {
    NO_INPUT,
    NO_RESULTS,
    RESULTS
}

interface Data {
    input: string;
    results: any[];
}

const result: Result = {
    title: 'Hope',
    description: 'Song - XXXTENTACION'
}

const resultsDb: Result[] = [
    result,
    result,
    result,
    result,
    result,
    result,
    result,
    result,
    result,
    result,
    result,
    result,
    result,
    result
];

const computeStatus = (data: Data) => {
    if (data.results.length) {
        return Status.RESULTS
    }
    if (!data.input.length) {
        return Status.NO_INPUT;
    }
    return Status.NO_RESULTS
}

interface Result {
    title: string;
    description: string;
}

const resultsProvider = (data: Result[]) => {
    return (
        <div className={styles.results}>
            {data.map(item => (
                <SearchSong id="fakeId" title={item.title} artistName={item.description}></SearchSong>))}
        </div>
    );
}

const noResultProvider = (input: string) => {
    return (
        <div className={styles.noResultContainer}>
            <p className={styles.noResultContainer__title}>Couldn't find</p>
            <p className={styles.noResultContainer__inputText}>{`"${input}"`}</p>
            <p className={styles.noResultContainer__tip}>Try searching again using a diffrent spelling or keyword</p>
        </div>
    )
};

const noInputProvider = () => {
    return (
        <div className={styles.noInputContainer}>
            <p className={styles.noInputContainer__title}>Find your favorites</p>
            <p className={styles.noInputContainer__tip}>Search everything you've liked, followed, or created</p>
        </div>
    )
};

const LibrarySearch: React.FC = (props) => {
    const [_input, _setInput] = useState('');
    const _history = useHistory();
    const handleBackButtonEvent = () => {
        _history.goBack();
    };

    const results = resultsDb.filter(item => {
        const lowerCaseInput = _input.toLowerCase();
        if (!lowerCaseInput.length) {
            return false;
        }
        return item.title.toLowerCase().includes(lowerCaseInput) || item.description.toLowerCase().includes(lowerCaseInput);
    });

    const data: Data = {
        input: _input,
        results: results
    };
    const handleInputEvent = (event: Event) => {
        const value = (event.target as HTMLInputElement).value;
        _setInput(value ?? '');
    };
    const status = computeStatus(data);
    const _pageContentProvider = () => {
        switch (status) {
            case Status.RESULTS:
                return resultsProvider(data.results);
            case Status.NO_INPUT:
                return noInputProvider();
            case Status.NO_RESULTS:
                return noResultProvider(data.input);
        }
    };
    const pageContent = _pageContentProvider();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div className={styles.header}>
                        <IonIcon
                            className={styles.header__backButton}
                            icon={chevronBackOutline}
                            onClick={() => handleBackButtonEvent()}
                        />
                        <IonInput
                            className={styles.searchInput} placeholder="Search Your Library"
                            onIonInput={(event => handleInputEvent(event))}
                            autofocus={true}
                        />
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen forceOverscroll={false}>
                {pageContent}
            </IonContent>
        </IonPage>
    );
};

export default LibrarySearch;
