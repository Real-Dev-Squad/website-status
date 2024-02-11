import { useEffect, useState, useRef } from 'react';
import styles from './tasksearch.module.scss';
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
    maxWidth: number | null;
    top: number | null;
}
const initialSuggestionCoordinates: SuggestionCoordinates = {
    left: null,
    maxWidth: null,
    top: null,
};

type TaskSearchProps = {
    onSelect: (tab: Tab) => void;
    inputValue: string;
    activeTab?: Tab;
    onInputChange: (value: string) => void;
    onClickSearchButton: (param?: string) => void;
};

const TaskSearchDev = ({
    onSelect,
    inputValue,
    activeTab,
    onInputChange,
    onClickSearchButton,
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
    const defferedUserInput: string = useDebounce(typedInput, 300);
    const [selectedPill, setSelectedPill] = useState<false | number>(false);
    const [newPillValue, setNewPillValue] = useState<string>('');
    const defferedPillValue = useDebounce(newPillValue, 300);
    const [pillToBeRemoved, setPillToBeRemoved] = useState(-1);
    const [suggestionCoordinates, setSuggestionCoordinates] =
        useState<SuggestionCoordinates>(initialSuggestionCoordinates);

    const searchButtonHandler = () => {
        if (selectedPill === false) {
            setSuggestions([]);
            onClickSearchButton(convertSearchOptionsToQuery(selectedOptions));
        }
    };

    const handleModal = () => {
        !modalOpen && setSuggestionModal(false);
        setModalOpen(!modalOpen);
    };
    useEffect(() => {
        setSelectedOptions(convertStringToOptions(inputValue));
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
                    event.preventDefault();
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
                    typedInput.length === 0
                ) {
                    setActiveSuggestionIndex(-1);
                    setSuggestionModal(false);
                    setSuggestions([]);
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
        setSuggestionCoordinates(findCoordinates());
    };
    useEffect(onResizeHandler, [
        defferedPillValue,
        defferedUserInput,
        suggestionModal,
    ]);
    const removePill = (idx: number) => {
        setSuggestionModal(false);
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
            if (optionDetails) {
                setSelectedOptions([...selectedOptions, optionDetails]);
                setTypedInput('');
            }
        } else {
            const newOptions = selectedOptions;
            newOptions[selectedPill] = suggestions[idx];
            setSelectedOptions(newOptions);
            setSelectedPill(false);
        }
        setActiveSuggestionIndex(-1);
        setSuggestionModal(false);
        toggleInputFocus(true);
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
                selectedOptions,
                key,
                selectedPill
            );
            updatedOptions = true;
            result.length > 0 && setActiveSuggestionIndex(0);
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
        <div className={styles['task-search-container']}>
            <div id="filter-container" className={styles['filter-container']}>
                <div className={styles['filter-button']} onClick={handleModal}>
                    Filter
                    {modalOpen && (
                        <FilterModal
                            tabs={TABS as Tab[]}
                            onSelect={onSelect}
                            activeTab={activeTab}
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
                                className={styles['search-input-parent']}
                            >
                                <input
                                    ref={userInputRef}
                                    onClick={() => setActiveSuggestionIndex(-1)}
                                    onBlur={() => setSuggestionModal(false)}
                                    className={`task-search-input ${
                                        styles['search-input-dev']
                                    } ${
                                        pillToBeRemoved !== -1
                                            ? styles['remove-caret']
                                            : ''
                                    }`}
                                    data-testid="search-input"
                                    type="text"
                                    value={typedInput}
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

                    {suggestionModal &&
                        (typedInput ||
                            (selectedPill !== false && newPillValue)) && (
                            <Options
                                style={suggestionCoordinates}
                                suggestions={suggestions}
                                activeSuggestionIndex={activeSuggestionIndex}
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
