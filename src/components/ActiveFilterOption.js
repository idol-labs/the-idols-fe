import React from 'react';
import { ReactComponent as Close } from '../assets/close.svg';

const ActiveFilterOption = ({
    traitFilter,
    setTraitFilter
}) => {
    return (
        <>
            {
                Object.keys(traitFilter).filter(key => {return traitFilter[key]}).map(trait => (
                    <article
                        key={trait}
                    >
                        <p>{trait}</p>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setTraitFilter( prevState => ({
                                    ...prevState,
                                    [`${trait}`]: !traitFilter[trait]
                                }))
                            }}
                        >
                            <Close />
                        </button>
                    </article>
                    
                ))
            }
        </>
    )
}

export default ActiveFilterOption;