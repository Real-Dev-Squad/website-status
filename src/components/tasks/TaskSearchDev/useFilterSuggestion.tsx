import { useGetUsersByUsernameQuery } from '@/app/services/usersApi';
import { TaskSearchOption } from '@/interfaces/searchOptions.type';
import generateSuggestions from '@/utils/generateSuggestions';

type Props = {
    typedInput: string;
    defferedUserInput: string;
    onEditSelectedFilterIndex: false | number;
    onEditSelectedFilterValue: string;
    defferedPillValue: string;
    selectedFilters: Array<TaskSearchOption>;
    activeFilterSuggestionDropdownIndex: number;
    setActiveFilterSuggestionDropdownIndex: (index: number) => void;
};
export const useFilterSuggestion = ({
    typedInput,
    defferedUserInput,
    onEditSelectedFilterIndex,
    onEditSelectedFilterValue,
    defferedPillValue,
    selectedFilters,
    activeFilterSuggestionDropdownIndex,
    setActiveFilterSuggestionDropdownIndex,
}: Props) => {
    const { key: typedKey, value: typedValue } = getUserInput();
    const { data: userSearchResponse } = useGetUsersByUsernameQuery(
        {
            searchString: typedValue,
        },
        {
            // skip if typed key is not ['', 'assignee'] or if typed value is less than 3
            skip: typedValue.length < 3 || !['', 'assignee'].includes(typedKey),
        }
    );

    const filterSuggestions = [
        ...getLocalSuggestions(),
        ...getAssigneeSuggestions(),
    ];

    function getUserInput() {
        let userInput;
        if (
            onEditSelectedFilterIndex === false &&
            typedInput === defferedUserInput
        ) {
            userInput = defferedUserInput;
        } else if (
            onEditSelectedFilterIndex !== false &&
            onEditSelectedFilterValue === defferedPillValue
        ) {
            userInput = defferedPillValue;
        } else {
            return {
                key: '',
                value: '',
            };
        }

        userInput = userInput.trimStart();
        let key = '';

        if (userInput.includes(':')) {
            const [potentialKey, ...values] = userInput.split(':');
            if (potentialKey.length > 0) {
                key = potentialKey.trim();
                userInput = values.join(':').trimStart();
            }

            return {
                key,
                value: userInput,
            };
        }

        return {
            key: '',
            value: userInput,
        };
    }

    function getAssigneeSuggestions() {
        const serializedUserSuggestion =
            userSearchResponse?.users?.map((user) => ({
                assignee: user.username || user.github_display_name,
            })) || [];

        function removeSelectedUsersFromSuggestions(
            suggestions: { assignee: string }[]
        ) {
            return suggestions.filter((suggestion) => {
                // Return false if the suggestion is in selectedFilters
                return !selectedFilters.some(
                    (filter) => filter.assignee === suggestion.assignee
                );
            });
        }

        const result = removeSelectedUsersFromSuggestions(
            serializedUserSuggestion
        );
        return result;
    }

    function getLocalSuggestions() {
        if (typedValue.length > 2) {
            const result = generateSuggestions(
                typedValue,
                selectedFilters,
                typedKey,
                onEditSelectedFilterIndex
            );

            if (
                result.length > 0 &&
                activeFilterSuggestionDropdownIndex === -1
            ) {
                setActiveFilterSuggestionDropdownIndex(0);
            }

            return result;
        }

        return [];
    }

    return {
        filterSuggestions,
    };
};
