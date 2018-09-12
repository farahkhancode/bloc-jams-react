import React from 'react';

const Landing = () => (
  <section className="landing">
  <div className="jumbotron jumbotron-fluid">
  <div className="container">
    <h1 className="appname">Jamsbar</h1>
    <p className="hero-title">Turn the music up!</p>
  </div>
</div>

  <section className="selling-points">
    <div className="point1">
      <h2 className="point-title">Choose your music</h2>
      <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
    </div>
    <div className="point2">
      <h2 className="point-title">Unlimited, streaming, ad-free</h2>
      <p className="point-description">No arbitrary limits. No distractions.</p>
    </div>
    <div className="point3">
      <h2 className="point-title">Mobile enabled</h2>
      <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
    </div>
  </section>
  </section>
);

export default Landing;
