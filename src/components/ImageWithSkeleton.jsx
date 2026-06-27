import { useState } from "react";
import "./ImageWithSkeleton.css";

const ImageWithSkeleton = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="image-container">
      {loading && <div className="image-skeleton"></div>}

      <img
        src={src}
        alt={alt}
        className={loading ? "hidden-img" : "show-img"}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default ImageWithSkeleton;
