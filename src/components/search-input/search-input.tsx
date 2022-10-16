import styles from "./search-input.module.scss";
import {MouseEventHandler, useState} from "react";

interface ContainerProps {
    onBack?: MouseEventHandler<Element> | undefined;
}

const SearchInput: React.FC<ContainerProps> = ({onBack}) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const handleChange = (event: any) => {
        setSearchQuery(event.target.value);
    }
    const handleClearEvent = () => {
        setSearchQuery('');
    }

    return (
        <div className={styles.container}>

            <p onClick={onBack} className={styles.backButton}>back</p>
            <input className={styles.input}
                   placeholder="Search query"
                   value={searchQuery}
                   onChange={(event) => handleChange(event)}
            />
            {searchQuery !== '' ?
                <p onClick={() => handleClearEvent()} className={styles.closeButton}>clear</p> : undefined}
        </div>
    );
};

export default SearchInput;
