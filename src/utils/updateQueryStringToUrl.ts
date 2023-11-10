import { NextRouter } from 'next/router';
// import { useRouter } from 'next/router';

export const updateQueryStringToUrl = (
    router: NextRouter,
    queryParamValue: { text: string }
) => {
    router.push({
        query: {
            ...router.query,
            q: `search:${queryParamValue.text.toLowerCase()}`,
        },
    });
};
