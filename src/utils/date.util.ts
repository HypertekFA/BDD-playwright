export class DateUtil {
  /**
   * Default date format
   */
  private static readonly DEFAULT_FORMAT = 'dd/MM/yyyy';

  /**
   * Get today's date in specified format (default: dd/MM/yyyy)
   */
  static getTodayDate(format: string = this.DEFAULT_FORMAT): string {
    return this.formatDate(new Date(), format);
  }

  /**
   * Get tomorrow's date
   */
  static getTomorrowDate(format: string = this.DEFAULT_FORMAT): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return this.formatDate(tomorrow, format);
  }

  /**
   * Get yesterday's date
   */
  static getYesterdayDate(format: string = this.DEFAULT_FORMAT): string {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this.formatDate(yesterday, format);
  }

  /**
   * Get a date N days in the future
   */
  static getFutureDate(daysFromNow: number, format: string = this.DEFAULT_FORMAT): string {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysFromNow);
    return this.formatDate(futureDate, format);
  }

  /**
   * Get a date N days in the past
   */
  static getPastDate(daysAgo: number, format: string = this.DEFAULT_FORMAT): string {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - daysAgo);
    return this.formatDate(pastDate, format);
  }

  /**
   * Get a date N months in the future
   */
  static getFutureDateByMonths(monthsFromNow: number, format: string = this.DEFAULT_FORMAT): string {
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + monthsFromNow);
    return this.formatDate(futureDate, format);
  }

  /**
   * Get a date N months in the past
   */
  static getPastDateByMonths(monthsAgo: number, format: string = this.DEFAULT_FORMAT): string {
    const pastDate = new Date();
    pastDate.setMonth(pastDate.getMonth() - monthsAgo);
    return this.formatDate(pastDate, format);
  }

  /**
   * Get a date N years in the future
   */
  static getFutureDateByYears(yearsFromNow: number, format: string = this.DEFAULT_FORMAT): string {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + yearsFromNow);
    return this.formatDate(futureDate, format);
  }

  /**
   * Get a date N years in the past
   */
  static getPastDateByYears(yearsAgo: number, format: string = this.DEFAULT_FORMAT): string {
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - yearsAgo);
    return this.formatDate(pastDate, format);
  }

  /**
   * Get a specific date with custom day, month, year
   */
  static getSpecificDate(
    day: number,
    month: number,
    year: number,
    format: string = this.DEFAULT_FORMAT
  ): string {
    const date = new Date(year, month - 1, day);
    return this.formatDate(date, format);
  }

  /**
   * Get the first day of the current month
   */
  static getFirstDayOfMonth(format: string = this.DEFAULT_FORMAT): string {
    const firstDay = new Date();
    firstDay.setDate(1);
    return this.formatDate(firstDay, format);
  }

  /**
   * Get the last day of the current month
   */
  static getLastDayOfMonth(format: string = this.DEFAULT_FORMAT): string {
    const lastDay = new Date();
    lastDay.setMonth(lastDay.getMonth() + 1);
    lastDay.setDate(0);
    return this.formatDate(lastDay, format);
  }

  /**
   * Get the first day of a specific month
   */
  static getFirstDayOfSpecificMonth(
    month: number,
    year: number,
    format: string = this.DEFAULT_FORMAT
  ): string {
    const firstDay = new Date(year, month - 1, 1);
    return this.formatDate(firstDay, format);
  }

  /**
   * Get the last day of a specific month
   */
  static getLastDayOfSpecificMonth(
    month: number,
    year: number,
    format: string = this.DEFAULT_FORMAT
  ): string {
    const lastDay = new Date(year, month, 0);
    return this.formatDate(lastDay, format);
  }

  /**
   * Get the first day of the next month
   */
  static getFirstDayOfNextMonth(format: string = this.DEFAULT_FORMAT): string {
    const firstDay = new Date();
    firstDay.setMonth(firstDay.getMonth() + 1);
    firstDay.setDate(1);
    return this.formatDate(firstDay, format);
  }

  /**
   * Get the last day of the previous month
   */
  static getLastDayOfPreviousMonth(format: string = this.DEFAULT_FORMAT): string {
    const lastDay = new Date();
    lastDay.setDate(0);
    return this.formatDate(lastDay, format);
  }

  /**
   * Get current day of week (0 = Sunday, 1 = Monday, etc.)
   */
  static getDayOfWeek(): number {
    return new Date().getDay();
  }

  /**
   * Get current day of week name
   */
  static getDayOfWeekName(): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  }

  /**
   * Get the next occurrence of a specific day of the week (0 = Sunday, 6 = Saturday)
   */
  static getNextDayOfWeek(dayOfWeek: number, format: string = this.DEFAULT_FORMAT): string {
    const nextDate = new Date();
    const currentDay = nextDate.getDay();
    const difference = (dayOfWeek - currentDay + 7) % 7 || 7;
    nextDate.setDate(nextDate.getDate() + difference);
    return this.formatDate(nextDate, format);
  }

  /**
   * Get the previous occurrence of a specific day of the week
   */
  static getPreviousDayOfWeek(dayOfWeek: number, format: string = this.DEFAULT_FORMAT): string {
    const prevDate = new Date();
    const currentDay = prevDate.getDay();
    const difference = (currentDay - dayOfWeek + 7) % 7 || 7;
    prevDate.setDate(prevDate.getDate() - difference);
    return this.formatDate(prevDate, format);
  }

  /**
   * Add hours to current time
   */
  static addHours(hours: number, format: string = 'dd/MM/yyyy HH:mm:ss'): string {
    const date = new Date();
    date.setHours(date.getHours() + hours);
    return this.formatDate(date, format);
  }

  /**
   * Add minutes to current time
   */
  static addMinutes(minutes: number, format: string = 'dd/MM/yyyy HH:mm:ss'): string {
    const date = new Date();
    date.setMinutes(date.getMinutes() + minutes);
    return this.formatDate(date, format);
  }

  /**
   * Add seconds to current time
   */
  static addSeconds(seconds: number, format: string = 'dd/MM/yyyy HH:mm:ss'): string {
    const date = new Date();
    date.setSeconds(date.getSeconds() + seconds);
    return this.formatDate(date, format);
  }

  /**
   * Get current time in HH:mm:ss format
   */
  static getCurrentTime(): string {
    return this.formatDate(new Date(), 'HH:mm:ss');
  }

  /**
   * Get current timestamp (milliseconds)
   */
  static getCurrentTimestamp(): number {
    return Date.now();
  }

  /**
   * Check if a date is in the past
   */
  static isDateInPast(date: Date | string): boolean {
    const checkDate = typeof date === 'string' ? new Date(date) : date;
    return checkDate < new Date();
  }

  /**
   * Check if a date is in the future
   */
  static isDateInFuture(date: Date | string): boolean {
    const checkDate = typeof date === 'string' ? new Date(date) : date;
    return checkDate > new Date();
  }

  /**
   * Check if a date is today
   */
  static isDateToday(date: Date | string): boolean {
    const checkDate = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    return (
      checkDate.getDate() === today.getDate() &&
      checkDate.getMonth() === today.getMonth() &&
      checkDate.getFullYear() === today.getFullYear()
    );
  }

  /**
   * Calculate days between two dates
   */
  static daysBetween(date1: Date | string, date2: Date | string): number {
    const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Compare two dates
   * Returns: -1 if date1 < date2, 0 if equal, 1 if date1 > date2
   */
  static compareDates(date1: Date | string, date2: Date | string): number {
    const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

    if (d1 < d2) return -1;
    if (d1 > d2) return 1;
    return 0;
  }

  /**
   * Parse date string in dd/MM/yyyy format
   */
  static parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  /**
   * Get age from birthdate
   */
  static getAgeFromBirthdate(birthdate: Date | string): number {
    const birth = typeof birthdate === 'string' ? this.parseDate(birthdate) : birthdate;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  }

  /**
   * Format date to specified format
   * Supported formats: dd, MM, yyyy, HH, mm, ss
   */
  private static formatDate(date: Date, format: string): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return format
      .replace('dd', day)
      .replace('MM', month)
      .replace('yyyy', String(year))
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }

  /**
   * Get week number of the year
   */
  static getWeekNumber(): number {
    const date = new Date();
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  /**
   * Get quarter of the year (1-4)
   */
  static getQuarter(): number {
    return Math.floor(new Date().getMonth() / 3) + 1;
  }

  /**
   * Get month name
   */
  static getMonthName(monthIndex: number = new Date().getMonth()): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[monthIndex];
  }

  /**
   * Check if it's a leap year
   */
  static isLeapYear(year: number = new Date().getFullYear()): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  /**
   * Get days in month
   */
  static getDaysInMonth(month: number = new Date().getMonth() + 1, year: number = new Date().getFullYear()): number {
    return new Date(year, month, 0).getDate();
  }
}
