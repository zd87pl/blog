import classNames from 'classnames/bind';
import { FiTwitter, FiGithub, FiLinkedin, FiMail, FiRss } from 'react-icons/fi';
import Link from 'next/link';
import appConfig from 'app.config';

import styles from './Footer.module.scss';

let cx = classNames.bind(styles);

export default function Footer({ menuItems }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cx('footer')}>
      <div className="container">
        <div className={cx('content')}>
          <div className={cx('brand')}>
            <Link legacyBehavior href="/">
              <a className={cx('logo')}>
                {appConfig.siteName || 'Blog'}
              </a>
            </Link>
            <p className={cx('tagline')}>
              {appConfig.siteTagline || 'Insights on Technology and Leadership'}
            </p>
          </div>

          {appConfig?.socialLinks && (
            <div className={cx('social-links')}>
              <ul aria-label="Social media">
                {appConfig.socialLinks?.twitterUrl && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx('social-icon-link')}
                      href={appConfig.socialLinks.twitterUrl}
                      aria-label="Twitter"
                    >
                      <FiTwitter size={20} />
                    </a>
                  </li>
                )}

                {appConfig.socialLinks?.githubUrl && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx('social-icon-link')}
                      href={appConfig.socialLinks.githubUrl}
                      aria-label="GitHub"
                    >
                      <FiGithub size={20} />
                    </a>
                  </li>
                )}

                {appConfig.socialLinks?.linkedinUrl && (
                  <li>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx('social-icon-link')}
                      href={appConfig.socialLinks.linkedinUrl}
                      aria-label="LinkedIn"
                    >
                      <FiLinkedin size={20} />
                    </a>
                  </li>
                )}

                {appConfig.socialLinks?.emailAddress && (
                  <li>
                    <a
                      className={cx('social-icon-link')}
                      href={`mailto:${appConfig.socialLinks.emailAddress}`}
                      aria-label="Email"
                    >
                      <FiMail size={20} />
                    </a>
                  </li>
                )}

                <li>
                  <a
                    className={cx('social-icon-link')}
                    href="/feed.xml"
                    aria-label="RSS Feed"
                  >
                    <FiRss size={20} />
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className={cx('bottom')}>
          <div className={cx('copyright')}>
            &copy; {currentYear} {appConfig.author?.name || appConfig.siteName}. All rights reserved.
          </div>
          <nav className={cx('nav')}>
            {menuItems?.map((item) => (
              <Link legacyBehavior key={item.id} href={item.uri ?? '#'}>
                <a>{item.label}</a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
