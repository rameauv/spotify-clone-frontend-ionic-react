import {useContext} from "react";
import {PathsContext} from "../pages/private/private-pages-router";

export const usePaths = () => {
    return useContext(PathsContext);
}
