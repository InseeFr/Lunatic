
export const useDurationValues = (value: string | null,format: Formats, handleChange: (v: string | null) => void) => {
  const duration = parseISO8601Duration(value)
  const onChangeHandler = (key: keyof DurationValues) => (e: {target: {value: string}}) => {
          handleChange(formatISO8601Duration(format,{...duration, [key]: e.target.value}))
        }    
  const propsHours = {value: duration.hours, onChange: onChangeHandler("hours"), min: "0", max:"23"}
  const propsMinutes = {value: duration.minutes, onChange: onChangeHandler("minutes"), min: "0", max:"59"}
  const propsMonths = {value: duration.months, onChange: onChangeHandler("months"), min: "0", max:"11"}
  const propsYears = {value: duration.years, onChange: onChangeHandler("years"),min: "0"}
  return {propsHours,propsMonths,propsYears,propsMinutes}
}

type DurationValues = {
	years: string;
	months: string;
	hours: string;
	minutes: string;
}
type Formats = "PTnHnM" | "PnYnM"
const parseISO8601Duration = (duration: string | null | undefined): DurationValues => {
  if(!duration)  return {
    hours: '',
    minutes: '',
    years: '',
    months: '',
  };
  const regexHourMinute = /PT(\d+H)?(\d+M)?/i;
  const matchHourMinute = duration.match(regexHourMinute);
  if (matchHourMinute) {
    const [, hours, minutes] = matchHourMinute;
    return {
      hours: hours ? hours.replace('H', '') : '',
      minutes: minutes ? minutes.replace('M', '') : '',
      years: '',
      months: '',
    };
  }
  const regexYearMonth = /P(\d+Y)?(\d+M)?/i;
  const matchYearMonth = duration.match(regexYearMonth);
  if (matchYearMonth) {
    const [, years, months] = matchYearMonth;
    return {
      years: years ? years.replace('Y', '') : '',
      months: months ? months.replace('M', '') : '',
      hours: '',
      minutes: '',
    };
  }
  return {
    hours: '',
    minutes: '',
    years: '',
    months: '',
  };
};

const formatISO8601Duration = (format: Formats,duration: DurationValues): string | null => {
  if(!duration.hours && !duration.minutes && !duration.years && !duration.months) return null
  if (format === 'PTnHnM') {
    return `PT${duration.hours ? `${duration.hours}H` : '0H'}${duration.minutes ? `${duration.minutes}M` : '0M'}`;
  }
  if (format === 'PnYnM') {
    return `P${duration.years ? `${duration.years}Y` : '0Y'}${duration.months ? `${duration.months}M` : '0M'}`;
  }
  return null;
};