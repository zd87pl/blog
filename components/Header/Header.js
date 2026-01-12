import { useState, useEffect, useCallback } from 'react';
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

  const closeNav = useCallback(() => {
    setIsNavShown(false);
  }, []);

  // Handle Escape key to close nav
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isNavShown) {
        closeNav();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isNavShown, closeNav]);

  // Prevent body scroll when nav is open
  useEffect(() => {
    if (isNavShown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavShown]);

  const headerClasses = cx('header', className);
  const navClasses = cx('primary-navigation', isNavShown ? 'show' : undefined);

  return (
    <header className={headerClasses}>
      <SkipNavigationLink />
      <div className="container">
        <div className={cx('bar')}>
          <Link href="/" className={cx('logo')} onClick={closeNav}>
            <span className={cx('logo-text')}>{appConfig.siteName || 'Blog'}</span>
          </Link>

          <div className={cx('actions')}>
            <NavigationMenu
              id={cx('primary-navigation')}
              className={navClasses}
              menuItems={menuItems}
              onLinkClick={closeNav}
            >
              <li>
                <Link href="/search" className={cx('nav-link')} onClick={closeNav}>
                  <FiSearch size={18} />
                  <span className="sr-only">Search</span>
                </Link>
              </li>
              {/* Mobile-only close button and theme toggle */}
              <li className={cx('mobile-actions')}>
                <ThemeToggle />
              </li>
            </NavigationMenu>

            <ThemeToggle className={cx('theme-toggle')} />

            <button
              type="button"
              className={cx('nav-toggle', { 'nav-open': isNavShown })}
              onClick={() => setIsNavShown(!isNavShown)}
              aria-label={isNavShown ? 'Close navigation' : 'Open navigation'}
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
