import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { getQueryStringFromInput } from '@/utils/getQueryStringFromInput';
import { getQueryStringFromUrl } from '@/utils/getQueryStringFromUrl';
import styles from '@/styles/issues.module.scss';
import { handleFeatureFlag } from '@/utils/handleFeatureFlag';
import { updateQueryStringToUrl } from '@/utils/updateQueryStringToUrl';

type SearchFieldProps = {
    onSearchTextSubmitted: (querySearchString: string) => void;
    loading: boolean;
};

const SearchField = ({ onSearchTextSubmitted, loading }: SearchFieldProps) => {
    const router = useRouter();
    const dev = router?.query?.dev;
    const qQueryParam = router?.query?.q;
    const [searchText, setSearchText] = useState<string>('');
    const onSearchTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const queryParamValue = getQueryStringFromInput(searchText);

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearchTextSubmitted(searchText);
        handleFeatureFlag(dev?.toString(), () =>
            updateQueryStringToUrl(router, queryParamValue)
        );
    };

    useEffect(() => {
        const querySearchString = getQueryStringFromUrl(router) as string;
        handleFeatureFlag(dev?.toString(), () => {
            setSearchText(querySearchString);
        });
    }, [dev, qQueryParam]);
    return (
        <form
            className={styles.searchFieldContainer}
            onSubmit={(e) => {
                handleOnSubmit(e);
            }}
            data-testid="issue-form"
        >
            <input
                placeholder="Enter query string to search issues"
                value={searchText}
                onChange={onSearchTextChanged}
                className={styles.issueSearchInput}
            />
            <button
                className={styles.issuesSearchSubmitButton}
                disabled={loading || !(searchText ?? '').trim()}
            >
                Submit
            </button>
        </form>
    );
};
export { SearchField };
