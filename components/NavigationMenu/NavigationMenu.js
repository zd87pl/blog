import { gql } from '@apollo/client';
import Link from 'next/link';

export default function NavigationMenu({ menuItems, className, children, onLinkClick, id }) {
  if (!menuItems) {
    return null;
  }

  return (
    <nav
      id={id}
      className={className}
      role="navigation"
      aria-label={menuItems[0]?.menu?.node?.name ? `${menuItems[0].menu.node.name} menu` : 'Main menu'}
    >
      <ul className="menu">
        {menuItems.map((item) => {
          const { id: itemId, path, label } = item;
          return (
            <li key={itemId ?? ''}>
              <Link href={path ?? ''} onClick={onLinkClick}>
                {label ?? ''}
              </Link>
            </li>
          );
        })}
        {children}
      </ul>
    </nav>
  );
}

NavigationMenu.fragments = {
  entry: gql`
    fragment NavigationMenuItemFragment on MenuItem {
      id
      path
      label
      parentId
      cssClasses
      menu {
        node {
          name
        }
      }
    }
  `,
};
