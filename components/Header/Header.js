import { useState } from 'react';
import classNames from 'classnames/bind';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import Link from 'next/link';

import { NavigationMenu, SkipNavigationLink } from '../';
import ThemeToggle from '../ThemeToggle';
import appConfig from 'app.config';

import styles from './Header.module.scss';
let cx = classNames.bind(styles);

export default function Header({ className, menuItems }) {
  const [isNavShown, setIsNavShown] = useState(false);

  const headerClasses = cx('header', className);
  const navClasses = cx('primary-navigation', isNavShown ? 'show' : undefined);

  return (
    <header className={headerClasses}>
      <SkipNavigationLink />
      <div className="container">
        <div className={cx('bar')}>
          <Link href="/" className={cx('logo')}>
            <span className={cx('logo-text')}>{appConfig.siteName || 'Blog'}</span>
          </Link>

          <div className={cx('actions')}>
            <NavigationMenu
              id={cx('primary-navigation')}
              className={navClasses}
              menuItems={menuItems}
            >
              <li>
                <Link href="/search" className={cx('nav-link')}>
                  <FiSearch size={18} />
                  <span className="sr-only">Search</span>
                </Link>
              </li>
            </NavigationMenu>

            <ThemeToggle className={cx('theme-toggle')} />

            <button
              type="button"
              className={cx('nav-toggle')}
              onClick={() => setIsNavShown(!isNavShown)}
              aria-label="Toggle navigation"
              aria-controls={cx('primary-navigation')}
              aria-expanded={isNavShown}
            >
              {isNavShown ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
