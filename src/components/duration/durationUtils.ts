export type DurationValues = {
  years: string;
  months: string;
  hours: string;
  minutes: string;
};

export type Formats = "PTnHnM" | "PnYnM";

export const parseISO8601Duration = (duration: string | null | undefined): DurationValues => {
  if (!duration) {
    return createEmptyDuration();
  }

  const regexHourMinute = /PT(\d+H)?(\d+M)?/i;
  const matchHourMinute = duration.match(regexHourMinute);

  if (matchHourMinute) {
    const [, hours, minutes] = matchHourMinute;
    return {
      ...createEmptyDuration(),
      hours: getValueFromMatch(hours, 'H'),
      minutes: getValueFromMatch(minutes, 'M'),
    };
  }

  const regexYearMonth = /P(\d+Y)?(\d+M)?/i;
  const matchYearMonth = duration.match(regexYearMonth);

  if (matchYearMonth) {
    const [, years, months] = matchYearMonth;
    return {
      ...createEmptyDuration(),
      years: getValueFromMatch(years, 'Y'),
      months: getValueFromMatch(months, 'M'),
    };
  }
  return createEmptyDuration();
};

export const formatISO8601Duration = (format: Formats, duration: DurationValues): string | null => {
  if (isDurationEmpty(duration)) {
    return null;
  }

  if (format === 'PTnHnM') {
    return `PT${getFormattedValue(duration.hours, 'H')}${getFormattedValue(duration.minutes, 'M')}`;
  }

  if (format === 'PnYnM') {
    return `P${getFormattedValue(duration.years, 'Y')}${getFormattedValue(duration.months, 'M')}`;
  }
  return null;
};

const createEmptyDuration = (): DurationValues => ({
  hours: '',
  minutes: '',
  years: '',
  months: '',
});

const getValueFromMatch = (match: string | undefined, unit: string): string => {
  return match ? match.replace(unit, '') : '';
};

const isDurationEmpty = (duration: DurationValues): boolean => {
  return !duration.hours && !duration.minutes && !duration.years && !duration.months;
};

const getFormattedValue = (value: string, unit: string): string => {
  return value ? `${value}${unit}` : `0${unit}`;
};
