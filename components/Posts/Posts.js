import React from 'react';
import { gql } from '@apollo/client';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { FeaturedImage, FormatDate } from 'components';
import appConfig from 'app.config';
import useFocusFirstNewResult from 'hooks/useFocusFirstNewResult';

import styles from './Posts.module.scss';
let cx = classNames.bind(styles);

/**
 * Renders a list of Post items with a clean card design
 * @param {Props} props The props object.
 * @param {Post[]} props.posts The array of post items.
 * @param {string} props.id The unique id for this component.
 * @param {string} props.intro Message to show as an introduction text.
 * @param {boolean} props.compact Whether to show compact cards without images.
 * @returns {React.ReactElement} The Posts component
 */
function Posts({ posts, intro, id, compact = false }) {
  const { firstNewResultRef, firstNewResultIndex } =
    useFocusFirstNewResult(posts);

  if (!posts || posts.length === 0) {
    return (
      <section {...(id && { id })}>
        <p className={cx('no-posts')}>No posts found.</p>
      </section>
    );
  }

  return (
    <section {...(id && { id })}>
      {intro && <p className={cx('intro')}>{intro}</p>}
      <div className={cx('post-list', { compact })}>
        {posts.map((post, i) => {
          const isFirstNewResult = i === firstNewResultIndex;
          const image = post?.featuredImage?.node;
          const hasImage = image && !compact;

          return (
            <article
              className={cx('card', { 'has-image': hasImage })}
              key={post.id ?? i}
              id={`post-${post.id}`}
            >
              {hasImage && (
                <Link href={post?.uri ?? '#'} className={cx('image-link')} tabIndex={-1}>
                  <FeaturedImage
                    className={cx('image')}
                    image={image}
                    width={400}
                    height={225}
                    priority={i < appConfig.postsAboveTheFold}
                  />
                </Link>
              )}

              <div className={cx('content')}>
                <div className={cx('meta')}>
                  <FormatDate date={post?.date} />
                  {post?.author?.node?.name && (
                    <>
                      <span className={cx('separator')}>·</span>
                      <span className={cx('author')}>{post.author.node.name}</span>
                    </>
                  )}
                </div>

                <h3 className={cx('title')}>
                  <Link
                    href={post?.uri ?? '#'}
                    ref={isFirstNewResult ? firstNewResultRef : null}
                  >
                    {post.title}
                  </Link>
                </h3>

                {post.excerpt && (
                  <p
                    className={cx('excerpt')}
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

Posts.fragments = {
  entry: gql`
    ${FeaturedImage.fragments.entry}
    fragment PostsItemFragment on Post {
      id
      date
      uri
      title
      excerpt
      author {
        node {
          name
        }
      }
      ...FeaturedImageFragment
    }
  `,
};

export default Posts;
