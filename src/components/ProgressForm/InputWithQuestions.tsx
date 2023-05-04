import { useState } from 'react';

interface inputProps {
    name: string;
    question: string;
}

const InputWithQuestions = (props:inputProps) => {
    const [answer, setAnswer] = useState('');
    return (
        <>
            <label aria-label={props.name}>{props.question}</label>
            <textarea value={answer} onChange={(e)=>setAnswer(e.target.value)} name={props.name}/>
        </>
    );
};

export default InputWithQuestions;