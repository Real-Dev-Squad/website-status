import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { useSaveProgressMutation } from '@/app/services/progressesApi';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import styles from '@/components/standup/standupContainer.module.scss';
import SectionComponent from './SectionComponent';

const intialSection = [
    { title: 'Yesterday', inputs: [''] },
    { title: 'Today', inputs: [''] },
    { title: 'Blocker', inputs: [''] },
];

interface setIsFormVisibleProps {
    setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormInputComponent: FC<setIsFormVisibleProps> = ({
    setIsFormVisible,
}) => {
    const router = useRouter();
    const [sections, setSections] = useState(intialSection);
    const [addStandup] = useSaveProgressMutation();
    const { SUCCESS, ERROR } = ToastTypes;

    const handleAddField = (sectionIndex: number) => {
        const newSections = [...sections];
        newSections[sectionIndex].inputs.push('');
        setSections(newSections);
    };

    const handleRemoveField = (sectionIndex: number) => {
        const newSections = [...sections];
        newSections[sectionIndex].inputs.pop();
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
        const newData = {
            type: 'user',
            completed: sections[0].inputs.join('.'),
            planned: sections[1].inputs.join('. '),
            blockers: sections[2].inputs.join('. '),
        };
        setIsFormVisible(false);
        await addStandup(newData)
            .unwrap()
            .then((data) => {
                toast(SUCCESS, data.message);
            })
            .catch((error) => {
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
        <form
            className={styles.standupForm}
            onSubmit={handleSubmit}
            aria-label="form"
        >
            {sections.map((section, sectionIndex) => (
                <SectionComponent
                    key={sectionIndex}
                    section={section}
                    sectionIndex={sectionIndex}
                    onInputChange={handleInputChange}
                    onAddField={handleAddField}
                    onRemoveField={handleRemoveField}
                />
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
