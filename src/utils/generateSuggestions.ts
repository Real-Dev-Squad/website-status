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
 * This function generates suggestions in 2 cases, if user is updating an existing selected option or newly typing.
 * 1. If user has typed key, then show suggestions based on that only
 * 2. If user is updating an existing selected option, then show suggestions based on that
 */
export default function generateSuggestions(
    userInput: string,
    choosenOptions: Array<TaskSearchOption> = [],
    typedKey?: string,
    selectedPill: false | number = false
) {
    const typedValue = userInput.includes(':')
        ? userInput.split(':')[1]
        : userInput;
    let suggestions: Array<TaskSearchOption> = [];
    let updatedOptions = choosenOptions;

    if (selectedPill !== false) {
        // Remove the selected pill from the choosenOptions to enable suggestions
        updatedOptions = choosenOptions.filter(
            (_, idx: number) => idx !== selectedPill
        );
    }

    for (const field of SEARCH_OPTIONS) {
        const includeFieldInSuggestion = typedKey ? typedKey === field : true; // True, if typedKey matches field, if present, else True all the time
        const matchedOptions = updatedOptions.find((option) => option[field]); // Otherwise check if the field is present
        if (matchedOptions || !includeFieldInSuggestion) continue;

        if (field === 'title') {
            const value = {
                [field]: typedValue.trim(),
            };
            suggestions.push(value);
        } else if (field === 'status') {
            const result = matchStatus(typedValue);
            if (result) suggestions = [...suggestions, ...result];
        }
    }
    return suggestions;
}
