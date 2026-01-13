// DateUtil Usage Examples

import { DateUtil } from './date.util';

// ========== TODAY'S DATE ==========
// Get today's date in dd/MM/yyyy format
const today = DateUtil.getTodayDate();
// Output: 13/01/2026

// Get today's date in different format
const todayFull = DateUtil.getTodayDate('dd/MM/yyyy HH:mm:ss');
// Output: 13/01/2026 14:30:45

// ========== SIMPLE DATE OFFSETS ==========
// Get tomorrow's date
const tomorrow = DateUtil.getTomorrowDate();
// Output: 14/01/2026

// Get yesterday's date
const yesterday = DateUtil.getYesterdayDate();
// Output: 12/01/2026

// ========== FUTURE DATES ==========
// Get date 9 days from now
const nineaDaysLater = DateUtil.getFutureDate(9);
// Output: 22/01/2026

// Get date 30 days from now
const thirtyDaysLater = DateUtil.getFutureDate(30);
// Output: 12/02/2026

// Get date 365 days from now (1 year)
const oneYearLater = DateUtil.getFutureDate(365);
// Output: 13/01/2027

// ========== PAST DATES ==========
// Get date 10 days in the past
const tenDaysAgo = DateUtil.getPastDate(10);
// Output: 03/01/2026

// Get date 1 month in the past
const oneMonthAgo = DateUtil.getPastDate(30);
// Output: 14/12/2025

// ========== MONTH-BASED OFFSETS ==========
// Get date 3 months in the future
const threeMonthsLater = DateUtil.getFutureDateByMonths(3);
// Output: 13/04/2026

// Get date 6 months in the past
const sixMonthsAgo = DateUtil.getPastDateByMonths(6);
// Output: 13/07/2025

// ========== YEAR-BASED OFFSETS ==========
// Get date 2 years in the future
const twoYearsLater = DateUtil.getFutureDateByYears(2);
// Output: 13/01/2028

// Get date 1 year in the past
const oneYearAgo = DateUtil.getPastDateByYears(1);
// Output: 13/01/2025

// ========== SPECIFIC DATES ==========
// Get a specific date
const specificDate = DateUtil.getSpecificDate(25, 12, 2026);
// Output: 25/12/2026

// ========== MONTH BOUNDARIES ==========
// Get first day of current month
const firstDayOfMonth = DateUtil.getFirstDayOfMonth();
// Output: 01/01/2026

// Get last day of current month
const lastDayOfMonth = DateUtil.getLastDayOfMonth();
// Output: 31/01/2026

// Get first day of March 2026
const firstDayOfMarch = DateUtil.getFirstDayOfSpecificMonth(3, 2026);
// Output: 01/03/2026

// Get last day of February 2026
const lastDayOfFeb = DateUtil.getLastDayOfSpecificMonth(2, 2026);
// Output: 28/02/2026

// Get first day of next month
const firstOfNextMonth = DateUtil.getFirstDayOfNextMonth();
// Output: 01/02/2026

// Get last day of previous month
const lastOfPrevMonth = DateUtil.getLastDayOfPreviousMonth();
// Output: 31/12/2025

// ========== DAY OF WEEK ==========
// Get current day of week (0 = Sunday, 6 = Saturday)
const dayOfWeekNumber = DateUtil.getDayOfWeek();
// Output: 1 (Monday)

// Get current day name
const dayName = DateUtil.getDayOfWeekName();
// Output: Monday

// Get next Friday
const nextFriday = DateUtil.getNextDayOfWeek(5);
// Output: 17/01/2026

// Get previous Monday
const prevMonday = DateUtil.getPreviousDayOfWeek(1);
// Output: 12/01/2026

// ========== TIME OPERATIONS ==========
// Add hours to current time
const inTwoHours = DateUtil.addHours(2);
// Output: 13/01/2026 16:30:45

// Add minutes to current time
const inThirtyMinutes = DateUtil.addMinutes(30);
// Output: 13/01/2026 15:00:45

// Add seconds to current time
const inThirtySeconds = DateUtil.addSeconds(30);
// Output: 13/01/2026 14:31:15

// Get current time only
const currentTime = DateUtil.getCurrentTime();
// Output: 14:30:45

// Get current timestamp
const timestamp = DateUtil.getCurrentTimestamp();
// Output: 1736779845000

// ========== DATE COMPARISONS ==========
// Check if date is in the past
const isPast = DateUtil.isDateInPast('01/01/2025');
// Output: true

// Check if date is in the future
const isFuture = DateUtil.isDateInFuture('01/01/2027');
// Output: true

// Check if date is today
const isToday = DateUtil.isDateToday(DateUtil.getTodayDate());
// Output: true

// ========== DATE CALCULATIONS ==========
// Calculate days between two dates
const daysBetween = DateUtil.daysBetween('01/01/2026', '13/01/2026');
// Output: 12

// Compare two dates
const comparison = DateUtil.compareDates('01/01/2026', '13/01/2026');
// Output: -1 (first date is earlier)

// ========== DATE PARSING ==========
// Parse date string
const parsedDate = DateUtil.parseDate('25/12/2026');
// Output: Date object for 25/12/2026

// ========== AGE CALCULATION ==========
// Get age from birthdate
const age = DateUtil.getAgeFromBirthdate('15/05/1990');
// Output: 35

// ========== CALENDAR INFO ==========
// Get week number
const weekNumber = DateUtil.getWeekNumber();
// Output: 2

// Get quarter
const quarter = DateUtil.getQuarter();
// Output: 1

// Get month name
const monthName = DateUtil.getMonthName(0);
// Output: January

// Check if leap year
const isLeap = DateUtil.isLeapYear(2026);
// Output: false

// Get days in month
const daysInMonth = DateUtil.getDaysInMonth(2, 2026);
// Output: 28

// ========== STEP DEFINITION EXAMPLES ==========

// // Example 1: Test booking for a future date
// Given('I want to book an appointment 5 days from now', async function () {
//   const appointmentDate = DateUtil.getFutureDate(5);
//   this.appointmentDate = appointmentDate;
//   console.log(`Booking for: ${appointmentDate}`);
// });

// // Example 2: Test with specific month
// When('I check available dates in March', async function () {
//   const firstDay = DateUtil.getFirstDayOfSpecificMonth(3, 2026);
//   const lastDay = DateUtil.getLastDayOfSpecificMonth(3, 2026);
//   console.log(`March range: ${firstDay} to ${lastDay}`);
// });

// // Example 3: Test age validation
// Then('user should be at least 18 years old', async function () {
//   const age = DateUtil.getAgeFromBirthdate('01/01/2000');
//   expect(age).toBeGreaterThanOrEqual(18);
// });

// // Example 4: Test date in past
// Given('an expired coupon from 30 days ago', async function () {
//   const expiredDate = DateUtil.getPastDate(30);
//   const isPast = DateUtil.isDateInPast(expiredDate);
//   expect(isPast).toBe(true);
// });

// // Example 5: Test next business day
// When('I schedule for the next Monday', async function () {
//   const nextMonday = DateUtil.getNextDayOfWeek(1);
//   this.scheduledDate = nextMonday;
// });

// // Example 6: Test subscription renewal
// Given('I subscribe on the first of the month', async function () {
//   const firstDay = DateUtil.getFirstDayOfMonth();
//   const renewalDate = DateUtil.getFutureDate(30); // 30 days later
//   console.log(`Subscription from: ${firstDay}, renews: ${renewalDate}`);
// });

// // Example 7: Test date range
// When('I filter dates between last month and next month', async function () {
//   const lastMonth = DateUtil.getPastDateByMonths(1);
//   const nextMonth = DateUtil.getFutureDateByMonths(1);
//   console.log(`Filter range: ${lastMonth} to ${nextMonth}`);
// });

// // Example 8: Test with time
// When('I set a reminder for 2 hours from now', async function () {
//   const reminderTime = DateUtil.addHours(2, 'dd/MM/yyyy HH:mm:ss');
//   console.log(`Reminder set for: ${reminderTime}`);
// });
