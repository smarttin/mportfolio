import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_CURRENT_USER } from '@/apollo/queries';
import Layout from '../shared/Layout';
import { POSTS_BY_TOPIC, TOPIC_BY_SLUG } from './forumQueries';
import Posts from './Posts';

// define some initials
const useInitialData = (slug, pagination) => {
  // Get TOPIC_BY_SLUG Query
  const { data: topicBySlugData } = useQuery(TOPIC_BY_SLUG, {
    variables: { slug: slug },
    fetchPolicy: 'cache-and-network',
    onError: (err) => console.log(err),
    onCompleted: (result) => console.log(result),
  });

  // Get POSTS_BY_TOPIC Query
  const { data: postsByTopicData, fetchMore } = useQuery(POSTS_BY_TOPIC, {
    variables: { slug: slug, ...pagination },
    pollInterval: 5000,
    fetchPolicy: 'cache-and-network',
    onError: (err) => console.log(err),
    onCompleted: (result) => console.log(result),
  });

  // GET_CURRENT_USER Query
  const { data: userData } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    onError: (err) => console.log(err),
    onCompleted: (result) => console.log(result),
  });

  const user = (userData && userData.me) || null;
  const topic = (topicBySlugData && topicBySlugData.topicBySlug) || {};
  const postsData = (postsByTopicData && postsByTopicData.postsByTopic) || {
    posts: [],
    count: 0,
  };

  return { topic, ...postsData, user, fetchMore };
};

const PostPage = () => {
  const router = useRouter();
  const { slug, pageNum = 1, pageSize = 5 } = router.query;
  const [pagination, setPagination] = useState({
    pageNum: parseInt(pageNum, 10),
    pageSize: parseInt(pageSize, 10),
  });
  const { topic, posts, ...rest } = useInitialData(slug, pagination);

  return (
    <Layout>
      <section className="section-title">
        <div className="px-2">
          <div className="pb-3">
            <h2>{topic.title}</h2>
          </div>
        </div>
      </section>

      <Posts
        posts={posts}
        topic={topic}
        {...rest}
        {...pagination}
        onPageChange={(pageNum, pageSize) => {
          router.push(
            '/forum/topics/[slug]',
            `/forum/topics/${slug}?pageNum=${pageNum}&pageSize=${pageSize}`,
            { shallow: true }
          );
          setPagination({ pageNum, pageSize });
        }}
      />
    </Layout>
  );
};

export default PostPage;
