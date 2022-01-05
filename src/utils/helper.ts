export const getStatusLabel = (label: string): string => {
  switch (label) {
    case 'STARTED':
      return 'Started';
    case 'FAILED':
      return 'Failed';
    default:
      return 'Finished';
  }
};
