import { useEffect, useState, useRef } from 'react';
import className from './tasksearch.module.scss';
import { TABS, Tab } from '@/interfaces/task.type';
import FilterModal from './FilterModal';
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
    width: number | null;
}
const initialSuggestionCoordinates: SuggestionCoordinates = {
    left: null,
    width: null,
};

type TaskSearchProps = {
    onSelect: (tab: Tab) => void;
    inputValue: string;
    activeTab?: Tab;
    onInputChange: (value: string) => void;
    onClickSearchButton: (param?: string) => void;
    dev?: boolean;
};

const TaskSearch = ({
    onSelect,
    inputValue,
    activeTab,
    onInputChange,
    onClickSearchButton,
    dev,
}: TaskSearchProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const userInputRef = useRef<HTMLInputElement>(null);
    const [typedInput, setTypedInput] = useState('');
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const [selectedOptions, setSelectedOptions] = useState<
        Array<TaskSearchOption>
    >(convertStringToOptions(inputValue));
    const [suggestions, setSuggestions] = useState<Array<TaskSearchOption>>([]);
    const [suggestionModal, setSuggestionModal] = useState(false);
    const defferedUserInput: string = useDebounce(typedInput, 200);
    const [selectedPill, setSelectedPill] = useState<false | number>(false);
    const [newPillValue, setNewPillValue] = useState<string>('');
    const defferedPillValue = useDebounce(newPillValue, 200);
    const [pillToBeRemoved, setPillToBeRemoved] = useState(-1);
    const [suggestionCoordinates, setSuggestionCoordinates] =
        useState<SuggestionCoordinates>(initialSuggestionCoordinates);

    const searchButtonHandler = () => {
        if (dev && selectedPill === false) {
            setSuggestions([]);
            onClickSearchButton(convertSearchOptionsToQuery(selectedOptions));
        } else {
            onClickSearchButton();
        }
    };

    const handleModal = () => {
        !modalOpen && setSuggestionModal(false);
        setModalOpen(!modalOpen);
    };
    useEffect(() => {
        dev && setSelectedOptions(convertStringToOptions(inputValue));
    }, [inputValue]);

    const toggleInputFocus = (inFocus = true) => {
        inFocus && userInputRef.current?.focus();
        !inFocus && userInputRef.current?.blur();
    };
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case 'Backspace':
                if (selectedPill !== false && newPillValue.length === 1) {
                    const newOptions = selectedOptions.filter(
                        (_, idx) => idx !== selectedPill
                    );
                    setSelectedOptions(newOptions);
                    setSelectedPill(false);
                } else if (typedInput.length === 0 && selectedPill === false) {
                    if (pillToBeRemoved === -1) {
                        setPillToBeRemoved(selectedOptions.length - 1);
                    } else {
                        const newOptions = selectedOptions.filter(
                            (_, idx) => idx !== pillToBeRemoved
                        );
                        setSelectedOptions(newOptions);
                        setSelectedPill(false);
                        setPillToBeRemoved(-1);
                    }
                }

                break;

            case 'ArrowUp':
                if (activeSuggestionIndex > -1) {
                    setActiveSuggestionIndex(activeSuggestionIndex - 1);
                }
                break;
            case 'ArrowDown':
                if (suggestions.length - 1 > activeSuggestionIndex) {
                    setActiveSuggestionIndex(activeSuggestionIndex + 1);
                    event.preventDefault();
                }
                break;
            case 'Enter': {
                if (activeSuggestionIndex > -1) {
                    onSuggestionSelected();
                } else if (
                    selectedPill !== false &&
                    newPillValue.length > 0 &&
                    activeSuggestionIndex !== -1
                ) {
                    onSuggestionSelected();
                } else if (
                    newPillValue.length === 0 &&
                    typedInput.length === 0 &&
                    dev
                ) {
                    setActiveSuggestionIndex(-1);
                    setSuggestionModal(false);
                    setSuggestions([]);
                    searchButtonHandler();
                } else if (inputValue.length > 0 && !dev) {
                    searchButtonHandler();
                }
                break;
            }
            case 'Escape':
                setSuggestionModal(false);
                selectedPill !== false && setSelectedPill(false);
                break;
            default:
                break;
        }
    };

    const onResizeHandler = () => {
        if (suggestionModal) {
            setSuggestionCoordinates(findCoordinates());
        } else {
            setSuggestionCoordinates(initialSuggestionCoordinates);
        }
    };
    useEffect(onResizeHandler, [
        defferedPillValue,
        defferedUserInput,
        suggestionModal,
    ]);
    const removePill = (idx: number) => {
        const updatedOptions = selectedOptions.filter(
            (_, index) => index !== idx
        );
        setSelectedOptions(updatedOptions);
        setNewPillValue('');
        toggleInputFocus();
    };

    const onSuggestionSelected = (idx = activeSuggestionIndex) => {
        if (selectedPill === false) {
            const optionDetails = suggestions[idx];
            setSelectedOptions([...selectedOptions, optionDetails]);
            setTypedInput('');
        } else {
            const newOptions = selectedOptions;
            newOptions[selectedPill] = suggestions[idx];
            setSelectedOptions(newOptions);
            setSelectedPill(false);
        }
        toggleInputFocus();
        setActiveSuggestionIndex(-1);
    };

    const handleClickOutside = (event: React.MouseEvent<HTMLInputElement>) => {
        const target = event.target as HTMLElement;
        if (
            target &&
            target.className.includes('pill-input-wrapper') &&
            selectedPill !== false
        ) {
            setSelectedPill(false);
        } else if (target && target.className.includes('pill-input-wrapper')) {
            setNewPillValue('');
            setPillToBeRemoved(-1);
            toggleInputFocus();
        }
    };
    useEffect(() => {
        if (selectedPill === false) {
            toggleInputFocus();
            setSuggestionModal(true);
            setPillToBeRemoved(-1);
            setNewPillValue('');
        } else setSuggestionModal(false);
    }, [selectedPill]);

    useEffect(() => {
        !suggestionModal &&
            setSuggestionCoordinates(initialSuggestionCoordinates);
    }, [suggestionModal]);

    useEffect(() => {
        let updatedOptions = suggestionModal;
        let userInput;
        if (selectedPill === false && typedInput === defferedUserInput) {
            userInput = defferedUserInput;
        } else if (
            selectedPill !== false &&
            newPillValue === defferedPillValue
        ) {
            userInput = defferedPillValue;
        } else {
            return;
        }
        userInput = userInput.trim();
        let key = '';
        if (userInput.includes(':')) {
            const [potentialKey, ...values] = userInput.split(':');
            if (potentialKey.length > 0) {
                key = potentialKey.trim();
                userInput = values.join(':').trim();
            }
        }
        if (userInput.length > 2) {
            const result = generateSuggestions(
                userInput,
                selectedOptions,
                key,
                selectedPill
            );
            updatedOptions = true;
            setSuggestions(result);
        } else {
            updatedOptions = false;
            setSuggestions([]);
        }

        setSuggestionModal(updatedOptions);
    }, [defferedUserInput, defferedPillValue]);

    useEffect(() => {
        window.addEventListener('resize', onResizeHandler);
    }, []);
    return (
        <div className={className['task-search-container']}>
            <div className={className['filter-container']}>
                <div
                    className={className['filter-button']}
                    onClick={handleModal}
                >
                    Filter
                    {modalOpen && (
                        <FilterModal
                            dev={dev}
                            tabs={TABS as Tab[]}
                            onSelect={onSelect}
                            activeTab={activeTab}
                            onClose={handleModal}
                        />
                    )}
                </div>

                {dev ? (
                    <div
                        id="search-bar-div"
                        className={className['search-bar-div']}
                    >
                        <div
                            data-testid="pill-input-wrapper"
                            style={{ position: 'relative' }}
                            className={className['pill-input-wrapper']}
                            onClick={handleClickOutside}
                        >
                            {selectedOptions.map((value, key) => (
                                <RenderPills
                                    idx={key}
                                    key={key}
                                    newPillValue={newPillValue}
                                    option={value}
                                    removePill={removePill}
                                    selectedPill={selectedPill}
                                    pillToBeRemoved={pillToBeRemoved}
                                    handleKeyPress={handleKeyPress}
                                    setSelectedPill={setSelectedPill}
                                    setNewPillValue={setNewPillValue}
                                />
                            ))}

                            {selectedPill === false && (
                                <div
                                    style={{
                                        width: `${typedInput.length * 1.3}%`,
                                    }}
                                    className={className['search-input-parent']}
                                >
                                    <input
                                        ref={userInputRef}
                                        onClick={() =>
                                            setActiveSuggestionIndex(-1)
                                        }
                                        className={`${
                                            className['search-input-dev']
                                        } ${
                                            pillToBeRemoved !== -1
                                                ? className['remove-caret']
                                                : ''
                                        }`}
                                        data-testid="search-input"
                                        type="text"
                                        value={typedInput}
                                        readOnly={activeSuggestionIndex !== -1}
                                        placeholder="Eg: status:done assignee:joy title:New Feature"
                                        onChange={(e) => {
                                            pillToBeRemoved !== -1 &&
                                                setPillToBeRemoved(-1);
                                            setTypedInput(e.target.value);
                                        }}
                                        onKeyDown={handleKeyPress}
                                        spellCheck="false"
                                    />
                                </div>
                            )}
                        </div>

                        {dev &&
                            suggestionModal &&
                            (typedInput ||
                                (selectedPill !== false && newPillValue)) && (
                                <Options
                                    style={{
                                        maxWidth: suggestionCoordinates.width,
                                        left: suggestionCoordinates.left,
                                    }}
                                    suggestions={suggestions}
                                    activeSuggestionIndex={
                                        activeSuggestionIndex
                                    }
                                    onSuggestionSelected={onSuggestionSelected}
                                />
                            )}
                    </div>
                ) : (
                    <input
                        className={className['search-input']}
                        data-testid="search-input"
                        type="text"
                        placeholder="Eg: status:in-progress assignee:sunny-s Build a feature"
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyDown={handleKeyPress}
                        spellCheck="false"
                    />
                )}
            </div>
            <div className={className['search-button-container']}>
                <button
                    className={className['search-button']}
                    data-testid="search-button"
                    onClick={searchButtonHandler}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default TaskSearch;
