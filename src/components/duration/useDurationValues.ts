export const useDurationValues = (
  value: string | null,
  format: Formats,
  handleChange: (v: string | null) => void
) => {
  const duration = parseISO8601Duration(value);
  // Gestionnaire de changement pour les champs individuels (heures, minutes, mois, années)
  const onChangeHandler = (key: keyof DurationValues) => (e: {target: {value: string}}) => {
    // Mise à jour de la valeur de la durée avec la clé dynamique
    handleChange(formatISO8601Duration(format, {...duration, [key]: e.target.value}));
  };
  const propsHours = {value: duration.hours, onChange: onChangeHandler("hours"), min: "0", max:"23"};
  const propsMinutes = {value: duration.minutes, onChange: onChangeHandler("minutes"), min: "0", max:"59"};
  const propsMonths = {value: duration.months, onChange: onChangeHandler("months"), min: "0", max:"11"};
  const propsYears = {value: duration.years, onChange: onChangeHandler("years"),min: "0"};
  // Retourne les propriétés pour chaque champ de durée
  return {propsHours, propsMonths, propsYears, propsMinutes};
};
type DurationValues = {
  years: string;
  months: string;
  hours: string;
  minutes: string;
};
type Formats = "PTnHnM" | "PnYnM";
// Fonction pour parser une durée au format ISO8601 en objets individuels
const parseISO8601Duration = (duration: string | null | undefined): DurationValues => {
  // Si la durée est vide, retourne des valeurs vides pour chaque champ
  if (!duration) {
    return {
      hours: '',
      minutes: '',
      years: '',
      months: '',
    };
  }
  // Expression régulière pour le format heures:minutes (PTnHnM)
  const regexHourMinute = /PT(\d+H)?(\d+M)?/i;
  const matchHourMinute = duration.match(regexHourMinute);
  // Si la durée correspond au format heures:minutes (PTnHnM)
  if (matchHourMinute) {
    const [, hours, minutes] = matchHourMinute;
    return {
      hours: hours ? hours.replace('H', '') : '',
      minutes: minutes ? minutes.replace('M', '') : '',
      years: '',
      months: '',
    };
  }
  // Expression régulière pour le format années:mois (PnYnM)
  const regexYearMonth = /P(\d+Y)?(\d+M)?/i;
  const matchYearMonth = duration.match(regexYearMonth);
  // Si la durée correspond au format années:mois (PnYnM)
  if (matchYearMonth) {
    const [, years, months] = matchYearMonth;
    return {
      years: years ? years.replace('Y', '') : '',
      months: months ? months.replace('M', '') : '',
      hours: '',
      minutes: '',
    };
  }
  // Si la durée ne correspond à aucun des formats connus, retourne des valeurs vides pour chaque champ
  return {
    hours: '',
    minutes: '',
    years: '',
    months: '',
  };
};
// Fonction pour formatter les objets individuels en durée au format souhaité
const formatISO8601Duration = (format: Formats, duration: DurationValues): string | null => {
  // Si tous les champs de durée sont vides, retourne null
  if (!duration.hours && !duration.minutes && !duration.years && !duration.months) {
    return null;
  }
  // Formatage de la durée en fonction du format spécifié
  if (format === 'PTnHnM') {
    return `PT${duration.hours ? `${duration.hours}H` : '0H'}${duration.minutes ? `${duration.minutes}M` : '0M'}`;
  }
  if (format === 'PnYnM') {
    return `P${duration.years ? `${duration.years}Y` : '0Y'}${duration.months ? `${duration.months}M` : '0M'}`;
  }
  // Si le format spécifié n'est pas valide, retourne null
  return null;
};
