export default function findCoordinates() {
    const searchBar = document.querySelector('#search-bar-div');
    const filterContainer = document.querySelector('#filter-container');
    const input = document.querySelector('input');
    if (searchBar && input && filterContainer) {
        const searchBarRect = searchBar.getBoundingClientRect();
        const inputRect = input.getBoundingClientRect();
        const taskSearchRect = filterContainer.getBoundingClientRect();
        return {
            left: inputRect.left - searchBarRect.left + 75,
            maxWidth: inputRect.width,
            top: taskSearchRect.height - 1,
        };
    }
    return {
        left: null,
        maxWidth: null,
        top: null,
    };
}
