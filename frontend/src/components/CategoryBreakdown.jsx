import { formatCurrency } from "../utils/currencyFormatter";
import { categoryLabel, DEFAULT_CATEGORY } from "../constants/categories";
import { currentMonth, expenseMonth } from "../utils/month";

const TOP_N = 6;

// Ranked horizontal bars for this month's spend per category.
//
// Single hue on purpose. These categories have no natural order, so shading them
// by size would double-encode bar length as colour and burn the only free
// channel on information the bar already shows. Identity is carried by the row
// label, which also means no 8-hue categorical palette is needed here at all.
function CategoryBreakdown({ expenses }) {
  const month = currentMonth();
  const monthRows = expenses.filter((expense) => expenseMonth(expense) === month);

  const totals = new Map();
  for (const expense of monthRows) {
    const key = expense.category || DEFAULT_CATEGORY;
    totals.set(key, (totals.get(key) || 0) + (expense.amount || 0));
  }

  const ranked = [...totals.entries()]
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  const total = ranked.reduce((sum, row) => sum + row.amount, 0);

  // Past the top few, fold the tail into a single "Other" row rather than
  // rendering an unreadable stack of near-zero bars.
  const head = ranked.slice(0, TOP_N);
  const tail = ranked.slice(TOP_N);
  const rows =
    tail.length > 0
      ? [...head, { category: "__other", amount: tail.reduce((s, r) => s + r.amount, 0) }]
      : head;

  const max = Math.max(...rows.map((r) => r.amount), 0);

  return (
    <div className="p-4 rounded-xl bg-base-200 sm:p-5">
      <h2 className="font-semibold">Where it went</h2>
      <p className="mb-4 text-sm text-base-content/60">This month, by category</p>

      {rows.length === 0 ? (
        <p className="py-6 text-sm text-center text-base-content/60">
          No spending recorded this month yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {rows.map((row) => {
            const label = row.category === "__other" ? "Other categories" : categoryLabel(row.category);
            const share = total > 0 ? Math.round((row.amount / total) * 100) : 0;
            return (
              <li key={row.category} title={`${label}: ${formatCurrency(row.amount)} (${share}%)`}>
                <div className="flex items-baseline justify-between gap-3 mb-1 text-sm">
                  <span className="truncate">{label}</span>
                  {/* Text never wears the data colour; the bar below carries it. */}
                  <span className="shrink-0 text-base-content/60">
                    {formatCurrency(row.amount)} · {share}%
                  </span>
                </div>
                {/* Thin mark, 4px rounded data-end, grown from a single baseline. */}
                <div className="h-2 rounded-sm bg-primary/15">
                  <div
                    className="h-2 rounded-sm bg-primary"
                    style={{ width: max > 0 ? `${Math.max((row.amount / max) * 100, 2)}%` : "0%" }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CategoryBreakdown;
