export const handleFeatureFlag = (dev = '', cb: () => void) => {
    if (dev === 'true') {
        cb();
    }
};
