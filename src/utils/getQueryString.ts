export function getQueryString(searchQuery: string) {
    let searchText = '';

    if (!searchQuery) {
        return {
            text: searchText,
        };
    }

    searchText = searchQuery.trim();

    return {
        text: searchText,
    };
}
