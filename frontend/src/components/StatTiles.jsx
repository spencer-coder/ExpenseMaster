import { formatCurrency } from "../utils/currencyFormatter";
import { currentMonth, expenseMonth } from "../utils/month";

// These are stat tiles, not charts: a label and a figure, no plot and no hover.
// The hero figure on this page is the budget card's remaining amount, so these
// stay deliberately smaller than it.
function StatTiles({ expenses }) {
  const now = new Date();
  const month = currentMonth();

  const sum = (rows) => rows.reduce((total, e) => total + (e.amount || 0), 0);
  const dateOf = (e) => new Date(e.customDate || e.createdAt);

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  // Week starts Monday, matching WeeklyChart.
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  startOfWeek.setHours(0, 0, 0, 0);

  const monthRows = expenses.filter((e) => expenseMonth(e) === month);

  const today = sum(expenses.filter((e) => dateOf(e) >= startOfToday));
  const week = sum(expenses.filter((e) => dateOf(e) >= startOfWeek));
  const monthTotal = sum(monthRows);

  // Average over days elapsed so far, not the whole month -- dividing by 30 on
  // the 2nd would understate the run rate by an order of magnitude.
  const dailyAverage = monthTotal / now.getDate();

  const tiles = [
    { label: "Today", value: today },
    { label: "This week", value: week },
    { label: "This month", value: monthTotal },
    { label: "Daily average", value: dailyAverage },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {tiles.map((tile) => (
        <div key={tile.label} className="p-4 rounded-xl bg-base-200">
          <p className="text-sm text-base-content/60">{tile.label}</p>
          {/* Proportional figures: tabular-nums makes standalone values look loose. */}
          <p className="mt-1 text-xl font-semibold sm:text-2xl">{formatCurrency(tile.value)}</p>
        </div>
      ))}
    </div>
  );
}

export default StatTiles;
