import { toast, Zoom } from "react-toastify"; // Assuming you are using react-toastify
import "react-toastify/dist/ReactToastify.css";
const { success, info, dismiss } = toast;

const CopyToClipBoard = ({ textToCopy, style }) => {
  const handleCopy = () => {
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      dismiss(); // Dismiss any existing toast notifications
      success("Text copied to clipboard", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    } else {
      dismiss(); // Dismiss any existing toast notifications
      info(`Nothing to copy`, {
        theme: "dark",
      });
    }
  };
  return (
    <>
      <button style={style} onClick={handleCopy}>
        Copy
      </button>
    </>
  );
};

export default CopyToClipBoard;
