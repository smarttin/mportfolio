import { useMutation } from '@apollo/client';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import AppPagination from '../shared/Pagination';
import Replier from '../shared/Replier';
import { CREATE_POST } from './forumQueries';
import PostItem from './PostItem';

const Posts = ({ posts, topic, user, fetchMore, ...pagination }) => {
  const pageEnd = useRef();
  const [isReplierOpen, setReplierOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const { pageSize, count, pageNum } = pagination;

  // CREATE_POST Mutation
  const [createPost] = useMutation(CREATE_POST, {
    update: () => {},
    onError: (err) => console.log(err),
    onCompleted: (result) => console.log(result),
  });

  const handleCreatePost = async (reply, resetReplier) => {
    if (replyTo) {
      reply.parent = replyTo.id;
    }

    reply.topic = topic.id;
    await createPost({ variables: reply });
    let lastPage = Math.ceil(count / pageSize);
    if (count === 0) {
      lastPage = 1;
    }

    lastPage === pageNum &&
      (await fetchMore({
        variables: { pageSize, pageNum: lastPage },
        updateQuery: (previousResults, { fetchMoreResult }) => {
          return Object.assign({}, previousResults, {
            postsByTopic: { ...fetchMoreResult.postsByTopic },
          });
        },
      }));
    resetReplier();
    cleanup();
  };

  const cleanup = () => {
    setReplierOpen(false);
    toast.success('Post has been created!', { autoClose: 2000 });
    scrollToBottom();
  };

  const scrollToBottom = () =>
    pageEnd.current.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="mb-5">
      <div className="fj-post-list">
        {topic.id && pagination.pageNum === 1 && (
          <PostItem post={topic} className="topic-post-lead" />
        )}
        {posts.map((post) => (
          <div key={post.id} className="row">
            <div className="col-md-9">
              <PostItem
                post={post}
                canCreate={user !== null}
                onReply={(reply) => {
                  setReplyTo(reply);
                  setReplierOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-2 mx-0">
        <div className="col-md-9">
          <div className="posts-bottom">
            {user && (
              <div className="pt-2 pb-2">
                <button
                  onClick={() => {
                    setReplyTo(null);
                    setReplierOpen(true);
                  }}
                  className="btn btn-lg btn-outline-primary"
                >
                  Create New Post
                </button>
              </div>
            )}
            <div className="pagination-container ml-auto">
              <AppPagination {...pagination} />
            </div>
          </div>
        </div>
      </div>

      <div ref={pageEnd}></div>

      <Replier
        isOpen={isReplierOpen}
        hasTitle={false}
        onSubmit={handleCreatePost}
        replyTo={(replyTo && replyTo.user.username) || topic.title}
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
    </section>
  );
};

export default Posts;
