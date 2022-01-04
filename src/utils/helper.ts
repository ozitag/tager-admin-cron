export const getStatusLabel = (label: string): string => {
    switch (label) {
        case 'STARTED':
            return 'started';
        case 'FAILED':
            return 'failed';
        default:
            return 'finished';
    }
};
