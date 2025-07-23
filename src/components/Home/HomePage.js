import videoHomepage from "../../assets/video-homepage.mp4";

const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="homepage-text">There's a better way to ask</div>
        <div className="homepage-title">
          You don't want to make a boring form. And your audience won'n answer
          one. Create a typeform instead - and make everyone happy.
        </div>
        <div className="homepage-button">
          <button>Get's started. It's free</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
