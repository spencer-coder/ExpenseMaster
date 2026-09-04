import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaWallet, FaTags, FaChartColumn, FaCircleCheck } from "react-icons/fa6";
import { formatCurrency } from "../utils/currencyFormatter";
import logo from "/logo.svg";

const FEATURES = [
  { Icon: FaWallet, title: "Monthly budget", body: "Set a limit. Watch what's left." },
  { Icon: FaTags, title: "Categories", body: "Tag it, filter it, find it." },
  { Icon: FaChartColumn, title: "Weekly view", body: "Daily totals, so heavy days stand out." },
];

// A styled illustration of the dashboard, not live data. It uses the same
// daisyUI tokens as the real screens so it follows the active theme.
function DashboardPreview() {
  const bars = [12, 30, 74, 8, 46, 22, 0];
  const categories = [
    { label: "Food & Drink", amount: 420, width: 100 },
    { label: "Transport", amount: 180, width: 43 },
    { label: "Utilities", amount: 95, width: 23 },
  ];

  return (
    <div
      aria-hidden="true"
      className="p-4 border shadow-sm rounded-2xl bg-base-200 border-base-300"
    >
      <div className="p-4 rounded-xl bg-base-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-base-content/60">Left to spend</p>
            <p className="mt-1 text-3xl font-semibold">{formatCurrency(1305)}</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-success">
            <FaCircleCheck /> On track
          </span>
        </div>
        <div className="w-full mt-4 rounded-full h-2.5 bg-success/20">
          <div className="h-2.5 rounded-full bg-success" style={{ width: "38%" }} />
        </div>
        <div className="flex justify-between mt-2 text-xs text-base-content/60">
          <span>
            {formatCurrency(795)} of {formatCurrency(2100)}
          </span>
          <span>38%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="p-3 rounded-xl bg-base-100">
          <p className="mb-3 text-xs text-base-content/60">This week</p>
          <div className="grid items-end grid-cols-7 gap-1 h-14">
            {bars.map((value, i) => (
              <div
                key={i}
                className={`w-full rounded-t ${value > 0 ? "bg-primary" : "bg-primary/15"}`}
                style={{ height: `${Math.max(value, 3)}%` }}
              />
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-base-100">
          <p className="mb-3 text-xs text-base-content/60">Where it went</p>
          <ul className="flex flex-col gap-2">
            {categories.map((c) => (
              <li key={c.label}>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="truncate">{c.label}</span>
                  <span className="text-base-content/60">{formatCurrency(c.amount)}</span>
                </div>
                <div className="h-1.5 rounded-sm bg-primary/15">
                  <div className="h-1.5 rounded-sm bg-primary" style={{ width: `${c.width}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Landing() {
  const { user } = useSelector((state) => state.auth);

  return (
    // min-h-screen with a flex-1 hero: the hero absorbs any leftover height, so
    // the page fills the viewport instead of leaving dead space underneath.
    <div className="flex flex-col w-full min-h-screen px-4 py-6 mx-auto max-w-7xl">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" className="w-8 h-8" />
          <span className="font-semibold">ExpenseMaster</span>
        </div>
        {user ? (
          <Link to="/dashboard" className="btn btn-sm btn-primary">
            Dashboard
          </Link>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-sm btn-ghost">
              Log in
            </Link>
            <Link to="/register" className="btn btn-sm btn-primary">
              Get started
            </Link>
          </div>
        )}
      </header>

      <section className="grid items-center flex-1 gap-12 py-16 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-balance">
            Know what&apos;s left.
          </h1>
          <p className="mt-4 text-lg text-base-content/70">
            Set a budget. Log what you spend. See where you stand.
          </p>

          {!user && (
            <Link to="/register" className="mt-8 btn btn-primary">
              Get started
            </Link>
          )}
        </div>

        <DashboardPreview />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {FEATURES.map(({ Icon, title, body }) => (
          <div key={title} className="p-5 rounded-xl bg-base-200">
            <Icon className="mb-3 text-xl text-primary" />
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-1 text-sm text-base-content/70">{body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Landing;
