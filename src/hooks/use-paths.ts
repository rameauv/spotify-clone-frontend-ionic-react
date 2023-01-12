import {useContext} from "react";
import {PathsContext} from "../pages/private-pages-router/private-pages-router";

export const usePaths = () => {
    return useContext(PathsContext);
}
