import { STATUSES, SEARCH_OPTIONS } from '@/constants/constants';
import { IOption } from '@/interfaces/searchOptions.type';

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
    choosenOptions: IOption = {},
    typedKey?: string
) {
    const typedValue = userInput.includes(':')
        ? userInput.split(':')[1]
        : userInput;
    let suggestions: Array<IOption> = [];

    for (const field of SEARCH_OPTIONS) {
        // If user has also typed key, then show suggestions based on that only
        const additionalCheck = typedKey ? typedKey === field : true;

        // As we can have multiple assignees
        if (field !== 'assignee' && choosenOptions[field]) {
            continue;
        } else {
            if (
                additionalCheck &&
                (field === 'title' || field === 'assignee')
            ) {
                const value = {
                    [field]: typedValue.trim().toLowerCase(),
                };
                if (additionalCheck && field === 'title') {
                    value[field] = value[field].replaceAll('-', '');
                } else if (additionalCheck) {
                    value[field] = value[field].replaceAll(' ', '-');
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
