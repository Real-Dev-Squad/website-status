import React, { KeyboardEvent, useState } from 'react';
import styles from '@/components/Dashboard/Dashboard.module.scss';
import { splitNSearch } from '@/utils/splitNSearch';

function Searchbar({ label }: searchProps) {
    const [query, setQuery] = useState('');
    let btnStyle = styles.btnActive;

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            splitNSearch(query);
        }
    };

    if (query === '') {
        btnStyle = styles.btnDisabled;
    }

    return (
        <section className={styles.container}>
            <input
                data-testid="searchbar_input"
                type="text"
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e)}
                className={styles.searchBar}
                placeholder={label + ':'}
            />
            <button
                data-testid="search_btn"
                type="submit"
                onClick={() => {
                    splitNSearch(query);
                }}
                className={btnStyle}
            >
                Search
            </button>
        </section>
    );
}

export default Searchbar;
