import { parseISO8601Duration, formatISO8601Duration, DurationValues, Formats } from './durationUtils';

export const handlerDurationValues = (
  value: string | null,
  format: Formats,
  handleChange: (v: string | null) => void
) => {
  const duration = parseISO8601Duration(value);

  const onChangeHandler = (key: keyof DurationValues) => (e: { target: { value: string } }) => {
    handleChange(formatISO8601Duration(format, { ...duration, [key]: e.target.value }));
  };

  const propsHours = { value: duration.hours, onChange: onChangeHandler("hours"), min: "0", max: "23" };
  const propsMinutes = { value: duration.minutes, onChange: onChangeHandler("minutes"), min: "0", max: "59" };
  const propsMonths = { value: duration.months, onChange: onChangeHandler("months"), min: "0", max: "11" };
  const propsYears = { value: duration.years, onChange: onChangeHandler("years"), min: "0" };

  return { propsHours, propsMonths, propsYears, propsMinutes };
};
