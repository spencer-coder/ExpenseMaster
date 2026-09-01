import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../features/settings/settingsSlice";
import { FaMoon, FaSun, FaDesktop } from "react-icons/fa";

const themes = ["light", "dark", "system"];

const themeIcons = {
  light: <FaSun />,
  dark: <FaMoon />,
  system: <FaDesktop />,
};

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.settings);

  const handleThemeChange = (newTheme) => {
    dispatch(updateSettings({ theme: newTheme, currency: settings.currency }));
  };

  return (
    <div className="p-4 bg-base-200 rounded-box">
      <h2 className="text-xl font-semibold mb-2 text-center">Select Theme</h2>
      <ul className="flex gap-2 menu menu-vertical lg:menu-horizontal">
        {themes.map((theme) => (
          <li key={theme}>
            <button
              className={`btn  shadow-none ${settings.theme === theme ? "btn-secondary" : ""}`}
              onClick={() => handleThemeChange(theme)}
            >
              {themeIcons[theme]} {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
