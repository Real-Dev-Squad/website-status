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
    const { data: searchedUsers } = useGetUsersByUsernameQuery(
        {
            searchString: defferedUserInput,
        },
        {
            skip: defferedUserInput.length < 3,
        }
    );

    const filterSuggestions = [
        ...getLocalSuggestions(),
        ...getAssigneeSuggestions(),
    ];

    function getAssigneeSuggestions() {
        const result =
            searchedUsers?.users
                ?.filter(
                    (user) =>
                        !selectedFilters.some(
                            (selected) => selected.assignee === user.username
                        )
                )
                .map((user) => ({
                    assignee: user.username || user.github_display_name,
                })) || [];

        return result;
    }

    function getLocalSuggestions() {
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
            return [];
        }

        userInput = userInput.trimStart();
        let key = '';

        if (userInput.includes(':')) {
            const [potentialKey, ...values] = userInput.split(':');
            if (potentialKey.length > 0) {
                key = potentialKey.trim();
                userInput = values.join(':').trimStart();
            }
        }
        if (userInput.length > 2) {
            const result = generateSuggestions(
                userInput,
                selectedFilters,
                key,
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
