import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { useSaveProgressMutation } from '@/app/services/progressesApi';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import styles from '@/components/standup/standupContainer.module.scss';
const intialSection = [
    { title: 'Yesterday', inputs: [''] },
    { title: 'Today', inputs: [''] },
    { title: 'Blocker', inputs: [''] },
];
const FormInputComponent: FC = () => {
    const router = useRouter();
    const [sections, setSections] = useState(intialSection);
    const [addStandup] = useSaveProgressMutation();
    const { SUCCESS, ERROR } = ToastTypes;
    const handleAddField = (sectionIndex: number) => {
        const newSections = [...sections];
        newSections[sectionIndex].inputs.push('');
        setSections(newSections);
    };
    const handleInputChange = (
        sectionIndex: number,
        inputIndex: number,
        value: string
    ) => {
        const newSections = [...sections];
        newSections[sectionIndex].inputs[inputIndex] = value;
        setSections(newSections);
    };
    const isFormValid = () => {
        for (const section of sections) {
            for (const input of section.inputs) {
                if (input.trim() === '') {
                    return false;
                }
            }
        }
        return true;
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid()) {
            alert('Please fill in all input fields.');
            return;
        }
        const newData = {
            type: 'user',
            completed: sections[0].inputs.join('. '),
            planned: sections[1].inputs.join('. '),
            blockers: sections[2].inputs.join('. '),
        };
        await addStandup(newData)
            .unwrap()
            .then((data) => {
                console.log(data);
                console.log('success', data.message);
                toast(SUCCESS, data.message);
            })
            .catch((error) => {
                console.log('failure', error.data.message);
                toast(ERROR, error.data.message);
            });
        setSections([
            { title: 'Yesterday', inputs: [''] },
            { title: 'Today', inputs: [''] },
            { title: 'Blocker', inputs: [''] },
        ]);
        router.replace(router.asPath);
    };
    return (
        <form className={styles.standupForm} onSubmit={handleSubmit}>
            {sections.map((section, sectionIndex) => (
                <div className={styles.formFields} key={sectionIndex}>
                    <label
                        className={styles.updateHeading}
                        htmlFor={section.title}
                    >
                        {section.title}
                    </label>
                    <div className={styles.inputContainers}>
                        <div className={styles.inputBoxContainer}>
                            {section.inputs.map((inputValue, inputIndex) => (
                                <div
                                    key={inputIndex}
                                    className={styles.inputBox}
                                >
                                    <input
                                        className={styles.inputField}
                                        name={section.title}
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) =>
                                            handleInputChange(
                                                sectionIndex,
                                                inputIndex,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                        <div className={styles.addButtonContainer}>
                            <button
                                className={styles.addButton}
                                type="button"
                                onClick={() => handleAddField(sectionIndex)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <button
                type="submit"
                disabled={!isFormValid()}
                className={`${styles.submitButton}`}
            >
                Submit
            </button>
        </form>
    );
};
export default FormInputComponent;
