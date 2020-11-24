import { useQuery } from '@apollo/client';
import Link from 'next/link';
import Layout from '../shared/Layout';
import { FORUM_CATEGORIES } from './forumQueries';

const Forums = () => {
  const { data } = useQuery(FORUM_CATEGORIES, {
    fetchPolicy: 'cache-and-network',
    onError: (err) => console.log(err),
    onCompleted: (result) => console.log(result),
  });

  const forumCategories = (data && data.forumCategories) || [];

  return (
    <Layout>
      <section className="section-title">
        <div className="px-2">
          <div className="pb-4">
            <h2>Categories</h2>
          </div>
        </div>
      </section>
      <section className="fj-category-list">
        <div className="row">
          {forumCategories.map((fc) => (
            <div key={fc.slug} className="col-md-4 pb-2">
              <div className="fj-category-container">
                <Link
                  href="/forum/categories/[slug]"
                  as={`/forum/categories/${fc.slug}`}
                >
                  <a className="fj-category subtle-shadow no-border">
                    <div className="category-information">
                      <div className="heading gray-90">{fc.title}</div>
                      <div className="description">{fc.subTitle}</div>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Forums;
