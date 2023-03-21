import { useState, useEffect, useRef } from "react";

function BufferToImg({
  buffer,
  setMapHeight,
  setMapWidth,
  mapHeight,
  mapWidth,
  imageSrc,
  setImageSrc,
}) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (buffer && buffer.data) {
      const uint8array = new Uint8Array(buffer.data);
      const blob = new Blob([uint8array], { type: "image/png" });
      const url = URL.createObjectURL(blob);
      setImageSrc(url);
    }
  }, [buffer]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setMapWidth(mapRef.current.offsetWidth);
      setMapHeight(mapRef.current.offsetHeight - 8);
    }, 100);

    // console.log(`H: ${mapHeight}px | W: ${mapWidth}px`);
  }, [buffer, imageSrc]);

  return (
    <>
      {imageSrc ? (
        <img
          ref={mapRef}
          src={imageSrc}
          alt="Image"
          style={{
            height: "525px",
            width: "auto",
            border: "5px solid black",
            verticalAlign: "middle",
          }}
        />
      ) : (
        <img
          ref={mapRef}
          src="https://placehold.co/1000x200"
          alt="Placeholder"
        />
      )}
    </>
  );
}

export default BufferToImg;
