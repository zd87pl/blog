import * as MENUS from 'constants/menus';
import { useQuery, gql } from '@apollo/client';
import { FiArrowRight, FiMail, FiGithub, FiExternalLink } from 'react-icons/fi';
import Link from 'next/link';
import appConfig from 'app.config';
import styles from 'styles/pages/_Home.module.scss';

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

const postsPerPage = 3;

const projects = [
  {
    name: 'ai-crypto-trader',
    url: 'https://github.com/zd87pl/ai-crypto-trader',
    language: 'Python',
    description: 'An experimental cryptocurrency trading system that combines AI-powered analysis with real-time market data and social sentiment monitoring.',
  },
  {
    name: 'private-ai-adapters',
    url: 'https://github.com/zd87pl/private-ai-adapters',
    language: 'Python',
    description: 'Privacy-preserving AI personalization through encrypted DoRA/LoRA adapters. Cryptographic right-to-be-forgotten and consent-gated access.',
  },
  {
    name: 'dna-analysis',
    url: 'https://github.com/zd87pl/dna-analysis',
    language: 'Shell',
    description: 'Open-source genetic analysis toolkit. Analyze your WGS/VCF data locally and privately. 500+ variants across fitness, health, and traits.',
  },
  {
    name: 'intent-sentiment-assistant',
    url: 'https://github.com/zd87pl/intent-sentiment-assistant',
    language: 'TypeScript',
    description: 'AI-powered communication assistant for engineering leaders. Track workplace situations and analyze tone & intent across Slack, Gmail, and Zoom.',
  },
];

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
        {/* Welcome Section */}
        <section className={styles.welcome}>
          <div className="container">
            <div className={styles.welcomeContent}>
              <p className={styles.greeting}>Hey, I&apos;m</p>
              <Heading className={styles.name} level="h1">
                {appConfig.author?.name || 'Your Name'}
              </Heading>
              <p className={styles.intro}>
                I&apos;m a software engineer who&apos;s spent the past decade building products
                and, more recently, learning what it takes to build teams. This is my corner
                of the internet where I think out loud about the craft of engineering,
                the challenges of leadership, and everything in between.
              </p>
              <p className={styles.intro}>
                I don&apos;t have all the answers—far from it—but I find that writing helps
                me make sense of what I&apos;m learning. If any of it resonates or sparks
                a thought, I&apos;d love to hear from you.
              </p>
              <div className={styles.welcomeActions}>
                <Link legacyBehavior href="/about">
                  <a className={styles.textLink}>
                    More about me
                    <FiArrowRight size={16} />
                  </a>
                </Link>
                <a
                  href={`mailto:${appConfig.socialLinks?.emailAddress || 'hello@example.com'}`}
                  className={styles.textLink}
                >
                  Say hello
                  <FiMail size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* What I Write About */}
        <section className={styles.topics}>
          <div className="container">
            <div className={styles.topicsHeader}>
              <Heading className={styles.topicsTitle} level="h2">
                What I write about
              </Heading>
              <p className={styles.topicsDescription}>
                Mostly things I&apos;m figuring out as I go.
              </p>
            </div>
            <div className={styles.topicsGrid}>
              <div className={styles.topicItem}>
                <span className={styles.topicLabel}>Engineering</span>
                <p className={styles.topicText}>
                  Architecture decisions, code quality, and the joy of solving hard problems.
                </p>
              </div>
              <div className={styles.topicItem}>
                <span className={styles.topicLabel}>Leadership</span>
                <p className={styles.topicText}>
                  Building teams, giving feedback, and navigating the transition from IC to manager.
                </p>
              </div>
              <div className={styles.topicItem}>
                <span className={styles.topicLabel}>Career</span>
                <p className={styles.topicText}>
                  Growth, decisions, and the occasional reflection on where this all leads.
                </p>
              </div>
              <div className={styles.topicItem}>
                <span className={styles.topicLabel}>Tools & Process</span>
                <p className={styles.topicText}>
                  What&apos;s working for me—dev tools, workflows, and ways of thinking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Source Projects */}
        <section className={styles.projects}>
          <div className="container">
            <div className={styles.projectsHeader}>
              <Heading className={styles.projectsTitle} level="h2">
                Open source
              </Heading>
              <a
                href="https://github.com/zd87pl"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewAllLink}
              >
                View GitHub
                <FiGithub size={16} />
              </a>
            </div>
            <p className={styles.projectsDescription}>
              A few things I&apos;ve been building and experimenting with.
            </p>
            <div className={styles.projectsGrid}>
              {projects.map((project) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectCard}
                >
                  <div className={styles.projectHeader}>
                    <span className={styles.projectName}>{project.name}</span>
                    <FiExternalLink size={14} className={styles.projectLinkIcon} />
                  </div>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <span className={styles.projectLanguage}>{project.language}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Writing */}
        <section className={styles.recent}>
          <div className="container">
            <div className={styles.recentHeader}>
              <Heading className={styles.recentTitle} level="h2">
                Recent writing
              </Heading>
              <Link legacyBehavior href="/posts">
                <a className={styles.viewAllLink}>
                  View all
                  <FiArrowRight size={16} />
                </a>
              </Link>
            </div>
            <Posts posts={data.posts?.nodes} id="posts-list" />
          </div>
        </section>

        {/* Newsletter */}
        {appConfig.newsletter?.enabled && (
          <section className={styles.newsletter}>
            <div className="container">
              <div className={styles.newsletterContent}>
                <Heading className={styles.newsletterTitle} level="h3">
                  Want to stay in the loop?
                </Heading>
                <p className={styles.newsletterDescription}>
                  I send occasional updates when I publish something new.
                  No spam, no sales pitches—just writing.
                </p>
                <form
                  className={styles.newsletterForm}
                  onSubmit={(e) => {
                    e.preventDefault();
                    // TODO: Implement newsletter subscription with your preferred service
                    console.log('Newsletter subscription submitted');
                  }}
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={styles.newsletterInput}
                    required
                  />
                  <button type="submit" className={styles.newsletterButton}>
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}
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
