import React from "react";

function ImageUploader({ onUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="mt-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer bg-gray-50 focus:outline-none"
      />
    </div>
  );
}

export default ImageUploader;
