import { useEffect, useRef, useState } from 'react';
import Typed from 'react-typed';
import Layout from '../components/shared/Layout';

const ROLES = [
  'Developer',
  'Tech Lover',
  'Team Player',
  'Javascript',
  'Typescript',
  'Node.js',
  'Express.js',
  'React.js',
  'React Native',
  'Next.js',
  'Gatsby.js',
  'Graphql',
  'Rest Api',
  'Golang - intro',
  'MongoDB',
  'PostgreSQL',
];

const Home = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const flipInterval = useRef();

  useEffect(() => {
    startAnimation();
    return () => flipInterval.current && clearInterval(flipInterval.current);
  }, []);

  const startAnimation = () => {
    flipInterval.current = setInterval(() => {
      setIsFlipping((prevFlipping) => !prevFlipping);
    }, 20000);
  };

  return (
    <main className={`cover ${isFlipping ? 'cover-orange' : 'cover-blue'}`}>
      <div className="wrapper">
        <Layout navClass="transparent">
          <div className="background-image">
            <img src="/images/background-index.png" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="hero-section">
                  <div className={`flipper ${isFlipping ? 'isFlipping' : ''}`}>
                    <div className="front">
                      <div className="image image-1">
                        <div className="hero-section-content">
                          <h2> Javascript Developer </h2>
                          <div className="hero-section-content-intro">
                            Have a look at my portfolio and job history.
                          </div>
                        </div>
                      </div>
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                    <div className="back">
                      <div className="image image-2">
                        <div className="hero-section-content">
                          <h2>Amazing React, Next & Graphql</h2>
                          <div className="hero-section-content-intro">
                            Software developer ready for a project of any type!
                          </div>
                        </div>
                      </div>
                      <div className="shadow-custom shadow-custom-orange">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    Welcome to the portfolio website of Onyeka Oguejiofor G. Get
                    informed, collaborate and discover projects am working on!
                  </h1>
                </div>
                <Typed
                  loop
                  typeSpeed={70}
                  backSpeed={70}
                  strings={ROLES}
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  className="self-typed"
                  cursorChar="|"
                />
                <div className="hero-welcome-bio">
                  <h1>Let's take a look at my work.</h1>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </main>
  );
};

export default Home;
