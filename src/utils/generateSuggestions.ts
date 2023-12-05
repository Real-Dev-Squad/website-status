import { STATUSES, SEARCH_OPTIONS } from '@/constants/constants';
import { TaskSearchOption } from '@/interfaces/searchOptions.type';

function matchStatus(text: string) {
    const formattedText = text.replace(/[\s-]/g, '').toLowerCase();

    return STATUSES.filter((status) =>
        status.replace(/-/g, '').includes(formattedText)
    ).map((status) => ({ status }));
}
/**
 * Generates suggestions based on the user input, chosen options, and typed key.
 *
 * @param userInput - The user input that contains a search field and a value separated by a colon.
 * @param choosenOptions - An object representing the options that have already been chosen.
 * @param typedKey - The search field that the user has typed (optional).
 * @returns An array of objects representing the generated suggestions.
 */
export default function generateSuggestions(
    userInput: string,
    choosenOptions: Array<TaskSearchOption> = [],
    typedKey?: string
) {
    const typedValue = userInput.includes(':')
        ? userInput.split(':')[1]
        : userInput;
    let suggestions: Array<TaskSearchOption> = [];

    for (const field of SEARCH_OPTIONS) {
        // If user has also typed key, then show suggestions based on that only
        const additionalCheck = typedKey ? typedKey === field : true;
        const matchedOptions = choosenOptions.find((option) => option[field]);

        // As we can have multiple assignees
        if (
            matchedOptions &&
            (field !== 'assignee' || matchedOptions['assignee'] === userInput)
        ) {
            continue;
        } else {
            if (
                additionalCheck &&
                (field === 'title' || field === 'assignee')
            ) {
                const value = {
                    [field]: typedValue.trim(),
                };

                if (additionalCheck && field === 'assignee') {
                    /* When PR https://github.com/Real-Dev-Squad/website-status/pull/1026
                       gets merged replace the below code with this
                    value[field] = value[field].replaceAll(' ', '-');
                    */
                    value[field] = value[field]
                        .replace(/ /g, '-')
                        .toLowerCase();
                }
                suggestions.push(value);
            }
            if (additionalCheck && field === 'status') {
                const result = matchStatus(typedValue);
                if (result) suggestions = [...suggestions, ...result];
            }
        }
    }
    return suggestions;
}
