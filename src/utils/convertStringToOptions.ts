import { TaskSearchOption } from '@/interfaces/searchOptions.type';
import { extractQueryParams } from './taskQueryParams';
/**
 * Converts a string of query parameters into an array of TaskSearchOption objects.
 * Each TaskSearchOption object represents a query parameter extracted from the input string.
 * @param userString - The input string containing query parameters.
 * @returns An array of TaskSearchOption objects representing the extracted query parameters.
 */
export default function convertStringToOptions(
    userString: string
): Array<TaskSearchOption> {
    const convertedObject = extractQueryParams(userString);
    let convertedArray = [];
    if (convertedObject?.title) {
        convertedArray.push({
            title: convertedObject.title,
        });
    }
    if (
        convertedObject?.status &&
        convertedObject.status.toLocaleLowerCase() !== 'all'
    ) {
        convertedArray.push({
            status: convertedObject.status,
        });
    }
    if (convertedObject.assignees.length > 0) {
        convertedArray = [
            ...convertedArray,
            ...convertedObject.assignees.map((name) => ({ assignee: name })),
        ];
    }
    return convertedArray;
}
