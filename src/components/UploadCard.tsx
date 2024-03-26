import { useState, useEffect, useRef } from "react";
import { Button, Typography, Card } from "@material-tailwind/react";
import { BallTriangle, Circles } from "react-loader-spinner";

const UploadCard = ({ file, setFile }) => {
  const [isDragging, setIsDragging] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileFromButton = useRef<HTMLInputElement | null>(null);

  const handleDragEnter = (event: any) => {
    setIsDragging(isDragging + 1);
  };

  const handleDragLeave = () => {
    if (isDragging <= 0) return;
    setIsDragging(isDragging - 1);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const getFileFromLocal = async (f: File) => {
    try {
      // File System Access API. Requires HTTPS. Throws TS
      // compiler error because not included by default.
      const handle = await window.showDirectoryPicker({
        startIn: "desktop",
        mode: "readwrite",
      });

      const localFile = await handle.getFileHandle(f.name);
      setFile(localFile);
    } catch (error) {
      console.error("Error :: ", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (event: any) => {
    event.preventDefault();
    setIsUploading(true);
    setIsDragging(0);

    const droppedFile = event.dataTransfer.files[0];
    console.log("dropped:" + droppedFile.name);
    await getFileFromLocal(droppedFile);
  };

  const handleSelectFromExplorer = async (event: any) => {
    setIsUploading(true);

    const selectedFile = event.target.files[0];
    console.log("select: " + selectedFile.name);
    await getFileFromLocal(selectedFile);
  };

  const handleUploadBtnClick = () => {
    fileFromButton.current?.click();
  };

  return (
    <Card
      className={`mx-auto max-w-lg flex items-center justify-center bg-gray-150 ${
        isDragging > 0 ? "bg-gray-300" : ""
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      placeholder={undefined}
      shadow={true}
    >
      <Typography
        className="pointer-events-none text-center p-8 inline-block"
        color="blue-gray"
        placeholder={undefined}
      >
        Drag and drop video files here
      </Typography>

      <div className="flex place-content-center max-w-30">
        <Button
          className="max-w-xs mb-6"
          variant="outlined"
          color={isDragging > 0 || file ? "blue-gray" : "blue"}
          size="sm"
          placeholder={undefined}
          onClick={handleUploadBtnClick}
        >
          {isDragging > 0 ? "Drop Video" : file ? file.name : "Choose File..."}
        </Button>

        <div className={isUploading ? "pt-1 pl-2" : "pt-1 pl-2 opacity-0"}>
          <BallTriangle
            height="25"
            width="25"
            color="#637D8A"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>

        <div className="hidden">
          <input
            type="file"
            ref={fileFromButton}
            id="vid_uploads"
            name="vid_uploads"
            // Optional chaining takes precedence over index access,
            // so we have to type the array and not the File element
            onChange={handleSelectFromExplorer}
          />
        </div>
      </div>
    </Card>
  );
};

export default UploadCard;
