import * as MENUS from 'constants/menus';

import { useQuery, gql } from '@apollo/client';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import styles from 'styles/pages/_Home.module.scss';
import appConfig from 'app.config';
import {
  Main,
  Heading,
  NavigationMenu,
  SEO,
  Header,
  Footer,
  Posts,
} from 'components';
import { BlogInfoFragment } from 'fragments/GeneralSettings';

const postsPerPage = 6;

export default function Component() {
  const { data, loading } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  if (loading) {
    return null;
  }

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? {};
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  const pageTitle = appConfig.siteName || siteTitle;
  const pageDescription = appConfig.siteTagline || siteDescription;

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        imageUrl={appConfig.seo?.defaultImage}
      />

      <Header menuItems={primaryMenu} />

      <Main className={styles.home}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <span className={styles.badge}>Tech & Leadership Blog</span>
              <Heading className={styles.heroTitle} level="h1">
                {appConfig.author?.bio || 'Insights on building great software and leading high-performing teams.'}
              </Heading>
              <p className={styles.heroDescription}>
                Welcome! I share my thoughts on software engineering, technology trends,
                and the lessons I&apos;ve learned about leadership and team building.
              </p>
              <div className={styles.heroActions}>
                <Link href="/posts" className={styles.primaryButton}>
                  Read Articles
                  <FiArrowRight size={18} />
                </Link>
                <Link href="/about" className={styles.secondaryButton}>
                  About Me
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.featured}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading className={styles.sectionTitle} level="h2">
                Latest Articles
              </Heading>
              <p className={styles.sectionDescription}>
                Thoughts on technology, engineering practices, and leadership lessons.
              </p>
            </div>
            <Posts posts={data.posts?.nodes} id="posts-list" />
            <div className={styles.viewAll}>
              <Link href="/posts" className={styles.viewAllLink}>
                View all articles
                <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {appConfig.newsletter?.enabled && (
          <section className={styles.newsletter}>
            <div className="container">
              <div className={styles.newsletterContent}>
                <Heading className={styles.newsletterTitle} level="h3">
                  {appConfig.newsletter?.title || 'Stay Updated'}
                </Heading>
                <p className={styles.newsletterDescription}>
                  {appConfig.newsletter?.description || 'Get weekly insights on tech and leadership delivered to your inbox.'}
                </p>
                <form className={styles.newsletterForm}>
                  <input
                    type="email"
                    placeholder={appConfig.newsletter?.placeholder || 'Enter your email'}
                    className={styles.newsletterInput}
                    required
                  />
                  <button type="submit" className={styles.newsletterButton}>
                    {appConfig.newsletter?.buttonText || 'Subscribe'}
                  </button>
                </form>
                <p className={styles.newsletterPrivacy}>
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </section>
        )}

        <section className={styles.topics}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading className={styles.sectionTitle} level="h2">
                Topics I Write About
              </Heading>
            </div>
            <div className={styles.topicsGrid}>
              {(appConfig.categories || ['Technology', 'Leadership', 'Engineering', 'Career']).map((topic) => (
                <Link
                  key={topic}
                  href={`/category/${topic.toLowerCase()}`}
                  className={styles.topicCard}
                >
                  <span className={styles.topicName}>{topic}</span>
                  <FiArrowRight size={16} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Main>

      <Footer menuItems={footerMenu} />
    </>
  );
}

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    first: postsPerPage,
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  ${Posts.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $first: Int
  ) {
    posts(first: $first) {
      nodes {
        ...PostsItemFragment
      }
    }
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;
