import { formatCurrency } from "../utils/currencyFormatter";
import { currentMonth, expenseMonth } from "../utils/month";

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

  // Averaged over days elapsed, not the whole month, so the run rate isn't understated early on.
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
          <p className="mt-1 text-xl font-semibold sm:text-2xl">{formatCurrency(tile.value)}</p>
        </div>
      ))}
    </div>
  );
}

export default StatTiles;
