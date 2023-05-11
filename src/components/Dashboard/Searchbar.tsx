import React, { KeyboardEvent, useState } from 'react';
import styles from '@/components/Dashboard/Dashboard.module.scss';

interface searchProps {
    label: string;
}

const search = (query: string) => {
    const searchValues = query.split(',');
    console.log('Searching', searchValues);
};

function Searchbar({ label }: searchProps) {
    const [query, setQuery] = useState('');

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key == 'Enter') {
            search(query);
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
                    search(query);
                }}
                className={styles.searchBtn}
            >
                Search
            </button>
        </section>
    );
}

export default Searchbar;
