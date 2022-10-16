import styles from "./filter.module.scss";
import FilteringTag from "../filtering-tag/filtering-tag";

export interface Tag {
    id: string;
    value: string;
}

export interface ContainerProps {
    tags: Tag[];
    selectedTagId?: string
    onTagSelected: (tagId: string | undefined) => void;
}

const Filter: React.FC<ContainerProps> = ({tags = [], selectedTagId, onTagSelected = () => undefined}) => {
    console.log(selectedTagId);
    const handleTagSelection = (value: string) => {
        onTagSelected(selectedTagId ? undefined : value);
    };
    const handleCloseEvent = () => {
        onTagSelected(undefined);
    }
    const tagProvider = (tag: Tag, selectedTag: string | undefined, handleTagSelection: (tagId: string) => void) => {
        return (
            <FilteringTag
                onClick={() => handleTagSelection(tag.id)}
                activated={selectedTag === tag.id}
            >
                {tag.value}
            </FilteringTag>
        )
    }

    const tagsProvider = (selectedTag: string | undefined, handleTagSelection: (tagId: string) => void) => {
        return tags.reduce<JSX.Element[]>((previousValue, currentValue) => {
            if (selectedTag !== undefined && currentValue.id !== selectedTag) {
                return previousValue
            }
            return [
                ...previousValue,
                tagProvider(currentValue, selectedTag, handleTagSelection)
            ]
        }, [])
    }
    const closeButtonProvider = () => selectedTagId !== undefined ? tagProvider({
        id: 'close',
        value: 'close'
    }, selectedTagId, handleCloseEvent) : undefined;

    return (
        <div className={styles.tags}>
            {closeButtonProvider()}
            {tagsProvider(selectedTagId, handleTagSelection)}
        </div>
    );
};

export default Filter;
