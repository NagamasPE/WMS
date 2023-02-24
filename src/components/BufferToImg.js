import { useState, useEffect } from "react";

function BufferToImg({ buffer }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (buffer && buffer.data) {
      const uint8array = new Uint8Array(buffer.data);
      const blob = new Blob([uint8array], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setImageSrc(url);
    }
  }, [buffer]);
  if (!imageSrc) {
    // Return a placeholder image if the Base64 data is not available
    return <img src="https://via.placeholder.com/150" alt="Placeholder" />;
  }
  return (
    <img
      src={imageSrc}
      alt="Image"
      style={{
        height: "12rem",
        width: "auto",
        border: "5px solid black",
        verticalAlign: "middle",
        margin: "5px",
      }}
    />
  );
}

export default BufferToImg;
