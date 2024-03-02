import { useEffect, useState, useRef } from 'react';
import styles from './tasksearch.module.scss';
import { TABS, Tab } from '@/interfaces/task.type';
import FilterDropdown from './FilterDropdown';
import useDebounce from '@/hooks/useDebounce';
import { TaskSearchOption } from '@/interfaces/searchOptions.type';
import Options from './Suggestion/Options';
import RenderPills from './Suggestion/Pill';
import convertStringToOptions from '@/utils/convertStringToOptions';
import convertSearchOptionsToQuery from '@/utils/convertSearchOptionsToQuery';
import findCoordinates from '@/helperFunctions/findCoordinates';
import { useFilterSuggestion } from './useFilterSuggestion';

interface SuggestionCoordinates {
    left: number | null;
    maxWidth: number | null;
    top: number | null;
}
const initialSuggestionCoordinates: SuggestionCoordinates = {
    left: null,
    maxWidth: null,
    top: null,
};

type TaskSearchProps = {
    onFilterDropdownSelect: (tab: Tab) => void;
    filterDropdownActiveTab?: Tab;
    inputValue: string;
    onClickSearchButton: (param?: string) => void;
};

const TaskSearchDev = ({
    onFilterDropdownSelect,
    filterDropdownActiveTab,
    inputValue,
    onClickSearchButton,
}: TaskSearchProps) => {
    const [filterDropdownModelOpen, setFilterDropdownModelOpen] =
        useState(false);

    const userInputRef = useRef<HTMLInputElement>(null);
    const [typedInput, setTypedInput] = useState('');
    const defferedUserInput: string = useDebounce(typedInput, 300);

    const [selectedFilters, setSelectedFilters] = useState<
        Array<TaskSearchOption>
    >(convertStringToOptions(inputValue));
    const [onEditSelectedFilterValue, setOnEditSelectedFilterValue] =
        useState<string>('');
    const [onEditSelectedFilterIndex, setOnEditSelectedFilterIndex] =
        useState<false | number>(false);
    const [onRemoveSelectedFilterIndex, setOnRemoveSelectedFilterIndex] =
        useState(-1);
    const defferedPillValue = useDebounce(onEditSelectedFilterValue, 300);

    const [
        activeFilterSuggestionDropdownIndex,
        setActiveFilterSuggestionDropdownIndex,
    ] = useState(-1);
    const [suggestionCoordinates, setSuggestionCoordinates] =
        useState<SuggestionCoordinates>(initialSuggestionCoordinates);

    const searchButtonHandler = () => {
        if (onEditSelectedFilterIndex === false) {
            onClickSearchButton(convertSearchOptionsToQuery(selectedFilters));
        }
    };

    const { filterSuggestions } = useFilterSuggestion({
        typedInput,
        defferedPillValue,
        defferedUserInput,
        onEditSelectedFilterIndex,
        onEditSelectedFilterValue,
        selectedFilters,
        activeFilterSuggestionDropdownIndex,
        setActiveFilterSuggestionDropdownIndex,
    });

    const handleModal = () => {
        setFilterDropdownModelOpen(!filterDropdownModelOpen);
    };
    useEffect(() => {
        setSelectedFilters(convertStringToOptions(inputValue));
    }, [inputValue]);

    const toggleInputFocus = (inFocus = true) => {
        inFocus && userInputRef.current?.focus();
        !inFocus && userInputRef.current?.blur();
    };
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case 'Backspace':
                if (
                    onEditSelectedFilterIndex !== false &&
                    onEditSelectedFilterValue.length === 1
                ) {
                    const newOptions = selectedFilters.filter(
                        (_, idx) => idx !== onEditSelectedFilterIndex
                    );
                    setSelectedFilters(newOptions);
                    setOnEditSelectedFilterIndex(false);
                } else if (
                    typedInput.length === 0 &&
                    onEditSelectedFilterIndex === false
                ) {
                    if (onRemoveSelectedFilterIndex === -1) {
                        setOnRemoveSelectedFilterIndex(
                            selectedFilters.length - 1
                        );
                    } else {
                        const newOptions = selectedFilters.filter(
                            (_, idx) => idx !== onRemoveSelectedFilterIndex
                        );
                        setSelectedFilters(newOptions);
                        setOnEditSelectedFilterIndex(false);
                        setOnRemoveSelectedFilterIndex(-1);
                    }
                }

                break;

            case 'ArrowUp':
                if (activeFilterSuggestionDropdownIndex > -1) {
                    setActiveFilterSuggestionDropdownIndex(
                        activeFilterSuggestionDropdownIndex - 1
                    );
                    event.preventDefault();
                }
                break;
            case 'ArrowDown':
                if (
                    filterSuggestions.length - 1 >
                    activeFilterSuggestionDropdownIndex
                ) {
                    setActiveFilterSuggestionDropdownIndex(
                        activeFilterSuggestionDropdownIndex + 1
                    );
                    event.preventDefault();
                }
                break;
            case 'Enter': {
                if (activeFilterSuggestionDropdownIndex > -1) {
                    onSuggestionSelected();
                } else if (
                    onEditSelectedFilterIndex !== false &&
                    onEditSelectedFilterValue.length > 0 &&
                    activeFilterSuggestionDropdownIndex !== -1
                ) {
                    onSuggestionSelected();
                } else if (
                    onEditSelectedFilterValue.length === 0 &&
                    typedInput.length === 0
                ) {
                    setActiveFilterSuggestionDropdownIndex(-1);
                    searchButtonHandler();
                }
                break;
            }
            case 'Escape':
                onEditSelectedFilterIndex !== false &&
                    setOnEditSelectedFilterIndex(false);
                break;
            default:
                break;
        }
    };

    const onResizeHandler = () => {
        setSuggestionCoordinates(findCoordinates());
    };
    useEffect(onResizeHandler, [
        defferedPillValue,
        defferedUserInput,
        filterSuggestions.length,
    ]);
    const removePill = (idx: number) => {
        const updatedOptions = selectedFilters.filter(
            (_, index) => index !== idx
        );
        setSelectedFilters(updatedOptions);
        setOnEditSelectedFilterValue('');
        toggleInputFocus();
    };

    const onSuggestionSelected = (
        idx = activeFilterSuggestionDropdownIndex
    ) => {
        if (onEditSelectedFilterIndex === false) {
            const optionDetails = filterSuggestions[idx];
            if (optionDetails) {
                setSelectedFilters([...selectedFilters, optionDetails]);
                setTypedInput('');
                onClickSearchButton(
                    convertSearchOptionsToQuery([
                        ...selectedFilters,
                        optionDetails,
                    ])
                );
            }
        } else {
            const newOptions = selectedFilters;
            newOptions[onEditSelectedFilterIndex] = filterSuggestions[idx];
            setSelectedFilters(newOptions);
            setOnEditSelectedFilterIndex(false);
            onClickSearchButton(convertSearchOptionsToQuery(newOptions));
        }
        setActiveFilterSuggestionDropdownIndex(-1);
        toggleInputFocus(true);
    };

    const handleClickOutside = (event: React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLElement;
        if (
            target &&
            target.className.includes('pill-input-wrapper') &&
            onEditSelectedFilterIndex !== false
        ) {
            setOnEditSelectedFilterIndex(false);
        } else if (target && target.className.includes('pill-input-wrapper')) {
            setOnEditSelectedFilterValue('');
            setOnRemoveSelectedFilterIndex(-1);
            toggleInputFocus();
        }
    };
    useEffect(() => {
        if (onEditSelectedFilterIndex === false) {
            toggleInputFocus();
            setOnRemoveSelectedFilterIndex(-1);
            setOnEditSelectedFilterValue('');
        }
    }, [onEditSelectedFilterIndex]);

    useEffect(() => {
        filterSuggestions.length === 0 &&
            setSuggestionCoordinates(initialSuggestionCoordinates);
    }, [filterSuggestions.length]);

    useEffect(() => {
        window.addEventListener('resize', onResizeHandler);
    }, []);
    return (
        <div className={styles['task-search-container']}>
            <div id="filter-container" className={styles['filter-container']}>
                <div className={styles['filter-button']} onClick={handleModal}>
                    Filter
                    {filterDropdownModelOpen && (
                        <FilterDropdown
                            tabs={TABS as Tab[]}
                            onSelect={onFilterDropdownSelect}
                            activeTab={filterDropdownActiveTab}
                            onClose={handleModal}
                        />
                    )}
                </div>

                <div id="search-bar-div" className={styles['search-bar-div']}>
                    <div
                        data-testid="pill-input-wrapper"
                        style={{ position: 'relative' }}
                        className={styles['pill-input-wrapper']}
                        onClick={handleClickOutside}
                    >
                        {selectedFilters.map((value, key) => (
                            <RenderPills
                                idx={key}
                                key={key}
                                newPillValue={onEditSelectedFilterValue}
                                option={value}
                                removePill={removePill}
                                selectedPill={onEditSelectedFilterIndex}
                                pillToBeRemoved={onRemoveSelectedFilterIndex}
                                handleKeyPress={handleKeyPress}
                                setSelectedPill={setOnEditSelectedFilterIndex}
                                setNewPillValue={setOnEditSelectedFilterValue}
                            />
                        ))}

                        {onEditSelectedFilterIndex === false && (
                            <div
                                style={{
                                    width: `${typedInput.length * 1.3}%`,
                                }}
                                className={styles['search-input-parent']}
                            >
                                <input
                                    ref={userInputRef}
                                    onClick={() =>
                                        setActiveFilterSuggestionDropdownIndex(
                                            -1
                                        )
                                    }
                                    className={`task-search-input ${
                                        styles['search-input-dev']
                                    } ${
                                        onRemoveSelectedFilterIndex !== -1
                                            ? styles['remove-caret']
                                            : ''
                                    }`}
                                    data-testid="search-input"
                                    type="text"
                                    value={typedInput}
                                    placeholder="Eg: status:done assignee:joy title:New Feature"
                                    onChange={(e) => {
                                        onRemoveSelectedFilterIndex !== -1 &&
                                            setOnRemoveSelectedFilterIndex(-1);
                                        setTypedInput(e.target.value);
                                    }}
                                    onKeyDown={handleKeyPress}
                                    spellCheck="false"
                                />
                            </div>
                        )}
                    </div>

                    {filterSuggestions.length > 0 &&
                        (typedInput ||
                            (onEditSelectedFilterIndex !== false &&
                                onEditSelectedFilterValue)) && (
                            <Options
                                style={suggestionCoordinates}
                                suggestions={filterSuggestions}
                                activeSuggestionIndex={
                                    activeFilterSuggestionDropdownIndex
                                }
                                onSuggestionSelected={onSuggestionSelected}
                            />
                        )}
                </div>
            </div>
        </div>
    );
};

export default TaskSearchDev;
