import { useState } from 'react';

interface inputProps {
    name: string;
    question: string;
}

const InputWithQuestions = ({name, question}:inputProps) => {
    const [answer, setAnswer] = useState('');
    return (
        <>
            <label htmlFor={name} aria-label={name}>{question}</label>
            <textarea value={answer} onChange={(e)=>setAnswer(e.target.value)} id={name}/>
        </>
    );
};

export default InputWithQuestions;