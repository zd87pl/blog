import classNames from 'classnames/bind';
import { FiSun, FiMoon } from 'react-icons/fi';

import { useTheme } from '../ThemeStyles/ThemeStyles';
import styles from './ThemeToggle.module.scss';

let cx = classNames.bind(styles);

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cx('toggle', className)}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className={cx('icon', 'sun', { active: theme === 'light' })}>
        <FiSun />
      </span>
      <span className={cx('icon', 'moon', { active: theme === 'dark' })}>
        <FiMoon />
      </span>
    </button>
  );
}
