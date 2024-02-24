import { TaskSearchOption } from '@/interfaces/searchOptions.type';
import generateSuggestions from '@/utils/generateSuggestions';

type Props = {
    typedInput: string;
    defferedUserInput: string;
    onEditSelectedFilterIndex: false | number;
    onEditSelectedFilterValue: string;
    defferedPillValue: string;
    selectedFilters: Array<TaskSearchOption>;
};
export const useFilterSuggestion = ({
    typedInput,
    defferedUserInput,
    onEditSelectedFilterIndex,
    onEditSelectedFilterValue,
    defferedPillValue,
    selectedFilters,
}: Props) => {
    const filterSuggestions = getFilterSuggestions();

    function getFilterSuggestions() {
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

            return result;
        }

        return [];
    }

    return {
        filterSuggestions,
    };
};
