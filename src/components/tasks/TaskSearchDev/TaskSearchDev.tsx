import { useEffect, useState, useRef } from 'react';
import styles from './tasksearch.module.scss';
import { TABS, Tab } from '@/interfaces/task.type';
import FilterDropdown from './FilterDropdown';
import useDebounce from '@/hooks/useDebounce';
import generateSuggestions from '@/utils/generateSuggestions';
import { TaskSearchOption } from '@/interfaces/searchOptions.type';
import Options from './Suggestion/Options';
import RenderPills from './Suggestion/Pill';
import convertStringToOptions from '@/utils/convertStringToOptions';
import convertSearchOptionsToQuery from '@/utils/convertSearchOptionsToQuery';
import findCoordinates from '@/helperFunctions/findCoordinates';

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
    const [newPillValue, setNewPillValue] = useState<string>('');
    const defferedPillValue = useDebounce(newPillValue, 300);

    const [selectedFilters, setSelectedFilters] = useState<
        Array<TaskSearchOption>
    >(convertStringToOptions(inputValue));
    const [onEditSelectedFilterIndex, setOnEditSelectedFilterIndex] =
        useState<false | number>(false);
    const [onRemoveSelectedFilterIndex, setOnRemoveSelectedFilterIndex] =
        useState(-1);

    const [filterSuggestionDropdownOpen, setFilterSuggestionDropdownOpen] =
        useState(false);
    const [filterSuggestions, setFilterSuggestions] = useState<
        Array<TaskSearchOption>
    >([]);
    const [
        activeFilterSuggestionDropdownIndex,
        setActiveFilterSuggestionDropdownIndex,
    ] = useState(-1);
    const [suggestionCoordinates, setSuggestionCoordinates] =
        useState<SuggestionCoordinates>(initialSuggestionCoordinates);

    const searchButtonHandler = () => {
        if (onEditSelectedFilterIndex === false) {
            setFilterSuggestions([]);
            onClickSearchButton(convertSearchOptionsToQuery(selectedFilters));
        }
    };

    const handleModal = () => {
        !filterDropdownModelOpen && setFilterSuggestionDropdownOpen(false);
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
                    newPillValue.length === 1
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
                    newPillValue.length > 0 &&
                    activeFilterSuggestionDropdownIndex !== -1
                ) {
                    onSuggestionSelected();
                } else if (
                    newPillValue.length === 0 &&
                    typedInput.length === 0
                ) {
                    setActiveFilterSuggestionDropdownIndex(-1);
                    setFilterSuggestionDropdownOpen(false);
                    setFilterSuggestions([]);
                    searchButtonHandler();
                }
                break;
            }
            case 'Escape':
                setFilterSuggestionDropdownOpen(false);
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
        filterSuggestionDropdownOpen,
    ]);
    const removePill = (idx: number) => {
        setFilterSuggestionDropdownOpen(false);
        const updatedOptions = selectedFilters.filter(
            (_, index) => index !== idx
        );
        setSelectedFilters(updatedOptions);
        setNewPillValue('');
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
            }
        } else {
            const newOptions = selectedFilters;
            newOptions[onEditSelectedFilterIndex] = filterSuggestions[idx];
            setSelectedFilters(newOptions);
            setOnEditSelectedFilterIndex(false);
        }
        setActiveFilterSuggestionDropdownIndex(-1);
        setFilterSuggestionDropdownOpen(false);
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
            setNewPillValue('');
            setOnRemoveSelectedFilterIndex(-1);
            toggleInputFocus();
        }
    };
    useEffect(() => {
        if (onEditSelectedFilterIndex === false) {
            toggleInputFocus();
            setFilterSuggestionDropdownOpen(true);
            setOnRemoveSelectedFilterIndex(-1);
            setNewPillValue('');
        } else setFilterSuggestionDropdownOpen(false);
    }, [onEditSelectedFilterIndex]);

    useEffect(() => {
        !filterSuggestionDropdownOpen &&
            setSuggestionCoordinates(initialSuggestionCoordinates);
    }, [filterSuggestionDropdownOpen]);

    useEffect(() => {
        let updatedOptions = filterSuggestionDropdownOpen;
        let userInput;
        if (
            onEditSelectedFilterIndex === false &&
            typedInput === defferedUserInput
        ) {
            userInput = defferedUserInput;
        } else if (
            onEditSelectedFilterIndex !== false &&
            newPillValue === defferedPillValue
        ) {
            userInput = defferedPillValue;
        } else {
            return;
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
            updatedOptions = true;
            result.length > 0 && setActiveFilterSuggestionDropdownIndex(0);
            setFilterSuggestions(result);
        } else {
            updatedOptions = false;
            setFilterSuggestions([]);
        }
        setFilterSuggestionDropdownOpen(updatedOptions);
    }, [defferedUserInput, defferedPillValue]);

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
                                newPillValue={newPillValue}
                                option={value}
                                removePill={removePill}
                                selectedPill={onEditSelectedFilterIndex}
                                pillToBeRemoved={onRemoveSelectedFilterIndex}
                                handleKeyPress={handleKeyPress}
                                setSelectedPill={setOnEditSelectedFilterIndex}
                                setNewPillValue={setNewPillValue}
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
                                    onBlur={() =>
                                        setFilterSuggestionDropdownOpen(false)
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

                    {filterSuggestionDropdownOpen &&
                        (typedInput ||
                            (onEditSelectedFilterIndex !== false &&
                                newPillValue)) && (
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
            <div className={styles['search-button-container']}>
                <button
                    className={styles['search-button']}
                    data-testid="search-button"
                    onClick={searchButtonHandler}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default TaskSearchDev;
