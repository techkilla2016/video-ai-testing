import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/header';
import VideoSection from './components/video';

const App = () => {
  return (
    <div className='alai-main'>
      <div className="alai-container">
        <Header />
        <Container>
          <VideoSection />
        </Container>
      </div>
    </div>
  );
};

export default App;
