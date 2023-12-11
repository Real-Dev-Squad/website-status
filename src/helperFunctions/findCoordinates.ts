export default function findCoordinates() {
    const searchBar = document.querySelector('#search-bar-div');
    const filterContainer = document.querySelector('#filter-container');
    const input = document.querySelector('.task-search-input');
    if (searchBar && input && filterContainer) {
        const searchBarRect = searchBar.getBoundingClientRect();
        const inputRect = input.getBoundingClientRect();
        const taskSearchRect = filterContainer.getBoundingClientRect();
        return {
            left: inputRect.left - searchBarRect.left + 75,
            maxWidth: inputRect.width,
            top: taskSearchRect.height - 2.25,
        };
    }
    return {
        left: null,
        maxWidth: null,
        top: null,
    };
}
