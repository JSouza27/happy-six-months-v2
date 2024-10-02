import { differenceInMonths, differenceInDays, addMonths } from 'date-fns';

export function formatDifference(date: Date) {
  const now = new Date();

  const months = differenceInMonths(now, date);
  const datePlusMonths = addMonths(date, months);
  const days = differenceInDays(now, datePlusMonths);

  return `${months + 1} meses, ${days} dias`;
}
