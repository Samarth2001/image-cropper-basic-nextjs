import { useState, useEffect, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Image from "next/image";

export default function Home() {
  const [image, setImage] = useState("");
  const [cropper, setCropper] = useState();
  const [croppedImages, setCroppedImages] = useState([]);

  const onCrop = () => {
    if (cropper) {
      // Specifying the same dimensions used for cropping
      const croppedCanvas = cropper.getCroppedCanvas({
        minWidth: 256,
        minHeight: 256,
        maxWidth: 4096,
        maxHeight: 4096,
        fillColor: "#fff",
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high",
      });
      setCroppedImages([...croppedImages, croppedCanvas.toDataURL()]);
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      console.log("Image loaded"); // Debug image loading
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const fileInputRef = useRef();

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="container mx-auto p-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        onClick={handleFileButtonClick}
        className="mb-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Choose File
      </button>
      <div className="cropper-container mb-4">
        {image && (
          <Cropper
            src={image}
            style={{ height: 400, width: "100%" }}
            initialAspectRatio={16 / 9}
            onInitialized={(instance) => setCropper(instance)}
            ready={() => console.log("Cropper ready")}
          />
        )}
      </div>
      <button
        onClick={onCrop}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Crop
      </button>
      <div className="cropped-images flex flex-wrap mt-4">
        {croppedImages.map((src, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={src}
            alt={`Cropped Image ${index}`}
            className="w-32 h-32 m-2 border p-1"
          />
        ))}
      </div>
    </div>
  );
}
