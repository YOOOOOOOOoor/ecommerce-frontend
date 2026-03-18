import React, { useState } from "react";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Strict MIME type check
      if (!["image/png", "image/jpeg"].includes(file.type)) {
        alert("Only PNG or JPEG images are allowed!");
        e.target.value = null;
        setSelectedFile(null);
        setPreview(null);
      } else {
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  return (
    <div className="profile">
      <div className="left">
        <p>My Profile</p>
        <p>Manage your personal information and preferences</p>
        <div>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
        </div>

        {preview && (
          <div style={{ marginTop: "10px" }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Profile;
