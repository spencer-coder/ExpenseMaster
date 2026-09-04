import { formatCurrency } from "../utils/currencyFormatter";

export default function WeeklyChart({ expenses }) {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Assuming week starts on Monday
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const weeklyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.customDate || expense.createdAt);
    return expenseDate >= startOfWeek && expenseDate <= endOfWeek;
  });

  const dailyExpenses = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    return weeklyExpenses
      .filter((expense) => {
        const expenseDate = new Date(expense.customDate || expense.createdAt);
        return (
          expenseDate.getDate() === date.getDate() &&
          expenseDate.getMonth() === date.getMonth() &&
          expenseDate.getFullYear() === date.getFullYear()
        );
      })
      .reduce((total, expense) => total + (expense.amount || 0), 0);
  });

  const locale = navigator.language;
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
  });

  const maxDataValue = Math.max(...dailyExpenses, 0);
  const weekTotal = dailyExpenses.reduce((total, value) => total + value, 0);
  const todayIndex = Math.floor((now - startOfWeek) / 86400000);

  return (
    <div className="flex flex-col p-4 rounded-xl bg-base-200 sm:p-5">
      <h2 className="font-semibold">Spending — this week</h2>
      <p className="mb-4 text-sm text-base-content/60">Daily totals, Monday to Sunday</p>

      {weekTotal > 0 ? (
        // A three-row grid rather than absolutely-positioned bars: the value and
        // day labels sit on their own fixed baselines, so they no longer drift
        // with bar height the way the previous version's did.
        <div className="grid grid-cols-7 gap-1" style={{ gridTemplateRows: "auto 1fr auto" }}>
          {dailyExpenses.map((value, index) => (
            <div key={`v-${index}`} className="text-xs text-center text-base-content/60">
              {/* Only non-zero days get a label -- seven zeros is noise, not data. */}
              {value > 0 ? Math.round(value).toLocaleString() : ""}
            </div>
          ))}

          {dailyExpenses.map((value, index) => (
            <div
              key={`b-${index}`}
              className="flex items-end justify-center h-32"
              title={`${daysOfWeek[index]}: ${formatCurrency(value)}`}
            >
              {/* Thin mark capped at 24px, 4px rounded top, square on the baseline. */}
              <div
                className={`w-full max-w-[24px] rounded-t ${value > 0 ? "bg-primary" : "bg-primary/15"}`}
                style={{
                  height: maxDataValue > 0 ? `${Math.max((value / maxDataValue) * 100, 2)}%` : "2%",
                }}
              />
            </div>
          ))}

          {daysOfWeek.map((day, index) => (
            <div
              key={`d-${index}`}
              className={`text-xs text-center ${
                index === todayIndex ? "font-semibold text-base-content" : "text-base-content/60"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-32 text-sm text-base-content/60">
          No spending this week
        </div>
      )}

      {/* Hairline baseline, one step off the surface, solid and recessive. */}
      <div className="h-px mt-3 bg-base-300" />

      <div className="mt-3">
        <p className="text-sm text-base-content/60">Total this week</p>
        <p className="text-2xl font-semibold">{formatCurrency(weekTotal)}</p>
      </div>
    </div>
  );
}
