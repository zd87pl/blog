import Link from 'next/link';
import classNames from 'classnames/bind';

import styles from './Button.module.scss';

let cx = classNames.bind(styles);

/**
 * Modern Button component with clean design.
 *
 * @param {Props} props The props object.
 * @param {string} props.href The href attribute. If provided the button will be a link.
 * @param {string} props.variant Button style: 'primary', 'secondary', 'outline', 'ghost'
 * @param {string} props.size Button size: 'sm', 'md', 'lg'
 * @param {string} props.className An optional className to be added to the button
 * @return {React.ReactElement} The Button component.
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  const buttonClassName = cx('button', `button-${variant}`, `button-${size}`, className);

  if (href) {
    return (
      <Link href={href} className={buttonClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}
