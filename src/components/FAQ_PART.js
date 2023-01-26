import React, { useState } from 'react';
import { ReactComponent as ChevronDown } from '../assets/chevron_down.svg';

const FAQ_Part = ({
    question,
    answer,
    show
}) => {
    const [dropdownShow, setDropdownShow] = useState(show)

    return (
        <article>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setDropdownShow(!dropdownShow);
                }}
            >
                <p>{question}</p>

                <ChevronDown 
                    className={`${dropdownShow ? 'active':''}`}
                />
            </button>
            
            <section className={`answer ${dropdownShow ? 'active':''}`}>{answer}</section>
        </article>
    )
}

export default FAQ_Part;