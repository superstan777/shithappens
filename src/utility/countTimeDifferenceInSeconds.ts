export const countTimeDifferenceInSeconds = (
  previousDateObject: Date
): number => {
  const now = new Date();
  const timeDifference = now.getTime() - previousDateObject.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  return secondsDifference;
};
