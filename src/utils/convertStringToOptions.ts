import { TaskSearchOption } from '@/interfaces/searchOptions.type';
import { extractQueryParams } from './taskQueryParams';
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
