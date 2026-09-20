export const TARGET_SCREENING_DATE = '2026-09-19';
export const TARGET_SCREENING_DATE_LABEL = '19/09/2026';

export interface DateOption {
  dateString: string; // ISO: YYYY-MM-DD e.g. "2026-09-19"
  formattedDDMMYYYY: string; // "19/09/2026"
  dayName: string;   // "TODAY", "TOMORROW", "SUN"
  dayNumber: string; // "19"
  monthName: string; // "SEP"
  year: number;      // 2026
  fullLabel: string; // "Saturday, Sep 19, 2026"
  isTargetDate?: boolean;
}

export function getUpcomingDates(daysCount = 7, baseDateString = TARGET_SCREENING_DATE): DateOption[] {
  const dates: DateOption[] = [];
  
  // Anchor to 19/09/2026 (September 19, 2026)
  const parts = baseDateString.split('-');
  const baseYear = parseInt(parts[0], 10);
  const baseMonth = parseInt(parts[1], 10) - 1;
  const baseDay = parseInt(parts[2], 10);
  const base = new Date(baseYear, baseMonth, baseDay, 12, 0, 0);

  for (let i = 0; i < daysCount; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    const formattedDDMMYYYY = `${day}/${month}/${year}`;

    let dayName = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    if (i === 0) dayName = 'TODAY';
    else if (i === 1) dayName = 'TOMORROW';

    const dayNumber = String(d.getDate());
    const monthName = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const fullLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

    dates.push({
      dateString,
      formattedDDMMYYYY,
      dayName,
      dayNumber,
      monthName,
      year,
      fullLabel,
      isTargetDate: dateString === TARGET_SCREENING_DATE,
    });
  }

  return dates;
}

