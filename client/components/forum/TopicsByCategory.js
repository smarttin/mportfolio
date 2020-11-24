import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GET_CURRENT_USER } from '../../apollo/queries';
import Layout from '../shared/Layout';
import Replier from '../shared/Replier';
import { CREATE_TOPIC, TOPICS_BY_CATEGORY } from './forumQueries';

const useInitialData = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Get TOPICS_BY_CATEGORY Query
  const { data: topicsData } = useQuery(TOPICS_BY_CATEGORY, {
    variables: { category: slug },
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

  const topicsByCategory = (topicsData && topicsData.topicsByCategory) || [];
  const user = (userData && userData.me) || null;
  return { router, slug, topicsByCategory, user };
};

const TopicsByCategory = () => {
  const { router, slug, topicsByCategory, user } = useInitialData();
  const [replierOpen, setReplierOpen] = useState(false);

  // CREATE_TOPIC Mutation
  const [createTopic] = useMutation(CREATE_TOPIC, {
    update: (cache, { data: { createTopic } }) => {
      try {
        const { topicsByCategory } = cache.readQuery({
          query: TOPICS_BY_CATEGORY,
          variables: { category: createTopic.forumCategory.slug },
        });
        cache.writeQuery({
          query: TOPICS_BY_CATEGORY,
          data: { topicsByCategory: [...topicsByCategory, createTopic] },
          variables: { category: createTopic.forumCategory.slug },
        });
      } catch (error) {}
    },
    onError: (err) => console.log(err),
    onCompleted: (result) => console.log(result),
  });

  const handleCreateTopic = (topicData, done) => {
    topicData.forumCategory = slug;
    createTopic({ variables: topicData }).then(() => {
      setReplierOpen(false);
      done();
    });
  };

  const goToTopic = (slug) =>
    router.push('/forum/topics/[slug]', `/forum/topics/${slug}`);

  return (
    <Layout>
      <section className="section-title">
        <div className="px-2">
          <div className="pb-3">
            <h2>Select a Topic</h2>
            <button
              type="button"
              onClick={() => setReplierOpen(true)}
              disabled={!user}
              className="btn btn-primary"
            >
              Create Topic
            </button>
            {!user && <i className="ml-2">Sign in to create topic</i>}
          </div>
        </div>
      </section>
      <section className="fj-topic-list">
        <table className="table table-hover ">
          <thead>
            <tr>
              <th scope="col">Topic</th>
              <th scope="col">Category</th>
              <th scope="col">Author</th>
            </tr>
          </thead>
          <tbody>
            {topicsByCategory.map((topic) => (
              <tr key={topic.id} onClick={() => goToTopic(topic.slug)}>
                <th>{topic.title}</th>
                <td className="category">{topic.forumCategory.title}</td>
                <td>{topic.user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Replier
        isOpen={replierOpen}
        onSubmit={handleCreateTopic}
        onClose={() => setReplierOpen(false)}
        closeBtn={() => (
          <a
            onClick={() => setReplierOpen(false)}
            className="btn py-2 ttu gray-10"
          >
            Cancel
          </a>
        )}
      />
    </Layout>
  );
};

export default TopicsByCategory;
