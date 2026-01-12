/**
 * Personal Tech & Leadership Blog Configuration
 */
const appConfig = {
  /**
   * Site metadata for SEO/AEO
   */
  siteName: 'Tech & Leadership',
  siteTagline: 'Insights on Technology, Engineering, and Leadership',
  author: {
    name: 'Your Name',
    role: 'Engineering Leader & Tech Enthusiast',
    bio: 'I write about software engineering, technology trends, and the art of building and leading high-performing teams.',
    avatar: '/static/avatar.jpg',
  },

  /**
   * The number of posts to fetch per 'page'.
   */
  postsPerPage: 6,

  /**
   * The number of projects to fetch per 'page'.
   */
  projectsPerPage: 4,

  /**
   * The number of post featured images that are above the fold for most screen sizes.
   * These images will be considered high priority and preloaded.
   */
  postsAboveTheFold: 3,

  /**
   * The number of project featured images that are above the fold for most screen sizes.
   * These images will be considered high priority and preloaded.
   */
  projectsAboveTheFold: 2,

  /**
   * Displays a default Featured Image when a Post does not have one.
   */
  archiveDisplayFeaturedImage: false,

  /**
   * Content categories for the blog
   */
  categories: ['Technology', 'Leadership', 'Engineering', 'Career', 'Productivity'],

  /**
   * @type {[key: 'twitterUrl' | 'linkedinUrl' | 'githubUrl' | 'emailAddress']: string}
   */
  socialLinks: {
    twitterUrl: 'https://twitter.com/yourhandle',
    linkedinUrl: 'https://www.linkedin.com/in/yourprofile',
    githubUrl: 'https://github.com/yourusername',
    emailAddress: 'hello@yourdomain.com',
  },

  /**
   * Newsletter settings
   */
  newsletter: {
    enabled: true,
    title: 'Stay Updated',
    description: 'Get weekly insights on tech and leadership delivered to your inbox.',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
  },

  /**
   * SEO defaults
   */
  seo: {
    defaultImage: '/static/og-image.jpg',
    twitterHandle: '@yourhandle',
    locale: 'en_US',
  },
};

export default appConfig;
