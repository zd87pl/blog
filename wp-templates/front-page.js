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
  FeaturedImage,
  FormatDate,
} from 'components';
import { BlogInfoFragment } from 'fragments/GeneralSettings';

const postsPerPage = 5;

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
  const posts = data?.posts?.nodes ?? [];
  const featuredPost = posts[0];
  const morePosts = posts.slice(1);

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
        {/* Hero Section: Featured Post + About Sidebar */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              {/* Main: Featured Post */}
              <div className={styles.featuredPost}>
                {featuredPost ? (
                  <>
                    <span className={styles.featuredLabel}>Latest</span>
                    {featuredPost.featuredImage?.node && (
                      <Link legacyBehavior href={featuredPost.uri ?? '#'}>
                        <a className={styles.featuredImageLink}>
                          <FeaturedImage
                            className={styles.featuredImage}
                            image={featuredPost.featuredImage.node}
                            width={800}
                            height={450}
                            priority={true}
                          />
                        </a>
                      </Link>
                    )}
                    <div className={styles.featuredContent}>
                      <div className={styles.featuredMeta}>
                        <FormatDate date={featuredPost.date} />
                      </div>
                      <Heading className={styles.featuredTitle} level="h1">
                        <Link legacyBehavior href={featuredPost.uri ?? '#'}>
                          <a>{featuredPost.title}</a>
                        </Link>
                      </Heading>
                      {featuredPost.excerpt && (
                        <div
                          className={styles.featuredExcerpt}
                          dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }}
                        />
                      )}
                      <Link legacyBehavior href={featuredPost.uri ?? '#'}>
                        <a className={styles.readMoreLink}>
                          Read article
                          <FiArrowRight size={16} />
                        </a>
                      </Link>
                    </div>
                  </>
                ) : (
                  <p className={styles.noPosts}>No posts yet.</p>
                )}
              </div>

              {/* Sidebar: About Me */}
              <aside className={styles.sidebar}>
                <div className={styles.aboutCard}>
                  <p className={styles.aboutGreeting}>Hey, I&apos;m</p>
                  <Heading className={styles.aboutName} level="h2">
                    {appConfig.author?.name || 'Your Name'}
                  </Heading>
                  <p className={styles.aboutText}>
                    Software engineer turned engineering leader. I write about
                    building products, leading teams, and the lessons learned along the way.
                  </p>
                  <div className={styles.aboutLinks}>
                    <Link legacyBehavior href="/about">
                      <a className={styles.aboutLink}>
                        More about me
                        <FiArrowRight size={14} />
                      </a>
                    </Link>
                    <a
                      href={`mailto:${appConfig.socialLinks?.emailAddress || 'hello@example.com'}`}
                      className={styles.aboutLink}
                    >
                      Say hello
                      <FiMail size={14} />
                    </a>
                  </div>
                </div>

                {/* Topics */}
                <div className={styles.topicsCard}>
                  <span className={styles.topicsLabel}>Topics</span>
                  <div className={styles.topicsList}>
                    <span className={styles.topicTag}>Engineering</span>
                    <span className={styles.topicTag}>Leadership</span>
                    <span className={styles.topicTag}>Career</span>
                    <span className={styles.topicTag}>Tools</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* More Posts */}
        {morePosts.length > 0 && (
          <section className={styles.morePosts}>
            <div className="container">
              <div className={styles.morePostsHeader}>
                <Heading className={styles.morePostsTitle} level="h2">
                  More writing
                </Heading>
                <Link legacyBehavior href="/posts">
                  <a className={styles.viewAllLink}>
                    View all
                    <FiArrowRight size={16} />
                  </a>
                </Link>
              </div>
              <div className={styles.morePostsGrid}>
                {morePosts.map((post) => (
                  <article key={post.id} className={styles.postCard}>
                    <div className={styles.postMeta}>
                      <FormatDate date={post.date} />
                    </div>
                    <h3 className={styles.postTitle}>
                      <Link legacyBehavior href={post.uri ?? '#'}>
                        <a>{post.title}</a>
                      </Link>
                    </h3>
                    {post.excerpt && (
                      <div
                        className={styles.postExcerpt}
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                      />
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

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
  ${FeaturedImage.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $first: Int
  ) {
    posts(first: $first) {
      nodes {
        id
        date
        uri
        title
        excerpt
        ...FeaturedImageFragment
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
