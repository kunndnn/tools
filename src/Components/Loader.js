import "../Styles/Loader.css";

// import { useState } from "react";
// const [loading, setLoading] = useState(false); // State management here
// function toggleLoader() {
//   setLoading((prevLoading) => !prevLoading); // Toggle the loading state
// }
function Loader({ loading }) {
  return (
    <>
      {loading && (
        <div id="loader">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
}

export default Loader;
