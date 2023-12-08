export default function findCoordinates() {
    const searchBar = document.querySelector('#search-bar-div');
    const input = document.querySelector('input');
    if (searchBar && input) {
        const searchBarRect = searchBar.getBoundingClientRect();
        const inputRect = input.getBoundingClientRect();
        return {
            left: inputRect.left - searchBarRect.left,
            width: inputRect.width,
        };
    }
    return {
        left: null,
        width: null,
    };
}
