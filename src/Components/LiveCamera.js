import { useRef, useEffect } from "react";

const LiveCamera = () => {
  const videoRef = useRef(null); // Reference to video tag

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        // Set the video stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error(`Error accessing camera: `, error);
      });
      console.log('render')
  }, []);

  return (
    <div style={styles.containerStyle}>
      <video style={styles.videoStyle} ref={videoRef} autoPlay></video>
    </div>
  );
};

const styles = {
  containerStyle: {
    display: "flex",
    justifyContent: "center", // Horizontal centering
    alignItems: "center", // Vertical centering
    height: "100vh", // Full viewport height
    backgroundColor: "#f0f0f0", // Optional background color
  },
  videoStyle: {
    width: "80%", // Default for larger screens
    height: "auto", // Maintain aspect ratio
    maxWidth: "600px", // Limit the maximum width on large screens
  },
};

const responsiveStyles = `
  @media (max-width: 768px) {
    video {
      width: 90%;  // Larger width for tablets and smaller screens
    }
  }

  @media (max-width: 480px) {
    video {
      width: 100%; // Full width for mobile devices
    }
  }
`;

// Inject responsive styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = responsiveStyles;
document.head.appendChild(styleSheet);

export default LiveCamera;
