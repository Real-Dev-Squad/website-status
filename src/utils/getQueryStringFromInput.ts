export const getQueryStringFromInput = (searchQuery: string) => {
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
};
