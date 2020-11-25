import { useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Layout from '../components/shared/Layout';

const CVModal = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-2">
      <Button variant="outline-dark" onClick={() => setShow(true)}>
        View or Download Resume
      </Button>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* <Modal.Body> */}
        <iframe style={{ width: '100%', height: '800px' }} src="/og.pdf" />
        {/* </Modal.Body> */}
      </Modal>
    </div>
  );
};

const about = () => {
  return (
    <Layout>
      <Row className="mt-2">
        <Col md="6">
          <div className="left-side">
            <h1 className="title">Hello, Welcome</h1>
            <h4 className="subtitle">To About Page</h4>
            <p className="subsubTitle">
              Feel free to read short description about me.
            </p>
            <CVModal />
            <a
              href="https://github.com/smarttin"
              target="_blank"
              className="btn btn-social-icon btn-github mb-2 "
            >
              <span className="fa fa-github"></span> View Github Repo
            </a>
          </div>
        </Col>
        <Col md="6">
          <div>
            <p>
              My name is Oguejiofor Onyekachuwku and I am a self-taught software
              developer
            </p>
            <p>
              I have Bachelors degree in chemical engineering. I've got
              experience working with a wide range of Javascript/Typescript
              technologies and frameworks from cross-platform mobile development
              with React Native to modern tech stack for frontend web
              applications with React.Js, Next.Js. Gatsby.Js etc, and also
              backend development with Node.Js and Express.
            </p>
            <p>
              I enjoy being challenged and engaging with projects that require
              me to work outside my comfort and knowledge set, as continuing to
              learn new languages, efficient ways of doing things and
              development techniques are important to me.
            </p>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default about;
