import React, { useContext } from 'react';

import { MarketplaceContext } from '../contexts/MarketplaceContext';

const FilterOption = ({
    layer,
    traitFilter,
    setTraitFilter,
    search
}) => {
    const { 
        TRAITS_ALL
    } = useContext(MarketplaceContext);

    let renderHTML = null;

    if (search) {
        const filteredArray = TRAITS_ALL[layer].filter(trait => {
           return trait.toString().toLowerCase().includes(search.toLowerCase())
        })

        if (filteredArray.length) {
            renderHTML = (
                <>
                    <li className='trait-type'>{layer}</li>
                    {
                        filteredArray.map(trait => (
                            <li
                                key={trait}
                            >
                                <button
                                    className={traitFilter[trait] ? 'active':''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setTraitFilter( prevState => ({
                                            ...prevState,
                                            [`${trait}`]: !traitFilter[trait]
                                        }))
                                    }}
                                >
                                    {trait}
                                </button>
                            </li>
                        ))
                    }
                </>
            )
        } else {
            renderHTML = <></>
        }
    } else {
        renderHTML =  (
            <>
                <li className='trait-type'>{layer}</li>
                {
                    TRAITS_ALL[layer].map(trait => (
                        <li
                            key={trait}
                        >
                            <button
                                className={traitFilter[trait] ? 'active':''}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setTraitFilter( prevState => ({
                                        ...prevState,
                                        [`${trait}`]: !traitFilter[trait]
                                    }))
                                }}
                            >
                                {trait}
                            </button>
                        </li>
                    ))
                }
            </>
        )
    }

    return renderHTML;
}

export default FilterOption;