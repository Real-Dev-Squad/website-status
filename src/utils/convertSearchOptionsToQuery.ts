import { TaskSearchOption } from '@/interfaces/searchOptions.type';
/**
 * Converts an array of `TaskSearchOption` objects into a query string.
 * If an option is not found, it adds a default "status:all" to the query string.
 * @param options - An array of `TaskSearchOption` objects representing the search options.
 * @returns The converted query string representing the search options.
 */
export default function convertSearchOptionsToQuery(
    options: TaskSearchOption[]
) {
    let searchString = '';
    let isStatusFound = false;
    options.forEach((option) => {
        const [entries] = Object.entries(option);
        if (entries[0] === 'title') {
            searchString += `${entries[1]} `;
        } else {
            searchString += `${entries[0]}:${entries[1]} `;
        }
        if ('status' === entries[0]) isStatusFound = true;
    });
    if (!isStatusFound) {
        searchString += 'status:all';
    }
    return searchString.trim();
}
