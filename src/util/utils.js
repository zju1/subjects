import RNFS from "react-native-fs";
import {setDownloadedItems} from "../app/appSlice";
import store from "../app/store";

export const getCachedItems = async () => {
    const items = await RNFS.readDir(RNFS.CachesDirectoryPath);
    if (items && items.length > 0) {
        const parsedArray = [];
        items.filter(item => !["WebView", "http-cache", "image_cache"].includes(item.name)).forEach(item => {
            const [name, id] = item.name.split("[");
            parsedArray.push({
                id,
                title: name,
                url: item.path,
                size: item.size,
                tag: item.name
            })
        })

        return parsedArray
    } else {
        return []
    }
}

export const setCachedItems = async () => {
    const items = await getCachedItems();
    store.dispatch(setDownloadedItems(items))
}

export const deleteCachedItem = async (filePath) => {
    try {
        await RNFS.unlink(filePath);
        setCachedItems()
    } catch (error) { }
}