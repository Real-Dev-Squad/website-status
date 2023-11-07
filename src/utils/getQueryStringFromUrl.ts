import { NextRouter } from 'next/router';

export const getQueryStringFromUrl = (router: NextRouter) => {
    const qQueryParamValue = router?.query?.q as string;
    if (qQueryParamValue) {
        const searchStringArr = qQueryParamValue.split(':');
        return searchStringArr[1];
    }
};
