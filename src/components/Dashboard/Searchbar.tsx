import React, { KeyboardEvent, useState } from 'react';
import styles from '@/components/Dashboard/Dashboard.module.scss';
import { splitNSearch } from '@/utils/splitNSearch';

function Searchbar({ label }: searchProps) {
    const [query, setQuery] = useState('');

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            splitNSearch(query);
        }
    };

    return (
        <section className={styles.container}>
            <label htmlFor="search" className={styles.searchLabel}>
                {label}
            </label>
            <input
                type="text"
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e)}
                className={styles.searchBar}
            />
            <button
                type="submit"
                onClick={() => {
                    splitNSearch(query);
                }}
                className={styles.searchBtn}
            >
                Search
            </button>
        </section>
    );
}

export default Searchbar;
