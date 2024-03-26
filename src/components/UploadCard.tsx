import { useState, useEffect, useRef } from "react";
import { Button, Typography, Card, Tooltip } from "@material-tailwind/react";
import { BallTriangle, Circles } from "react-loader-spinner";

const UploadCard = ({ file, setFile, folder, setFolder }) => {
  const [isDragging, setIsDragging] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileFromButton = useRef<HTMLInputElement | null>(null);
  const [infoHovered, setInfoHovered] = useState(false);

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

  const getFolderFromExplorer = async () => {
    try {
      // File System Access API. Requires HTTPS. Throws TS
      // compiler error because not included by default.
      const handle = await window.showDirectoryPicker({
        startIn: "desktop",
        mode: "readwrite",
      });
      setFolder(handle.name);
      console.log(handle.entries());
    } catch (error) {
      console.error("Error :: ", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelectFromExplorer = async (event: any) => {
    setIsUploading(true);

    const selectedFile = event.target.files[0];
    console.log("select: " + selectedFile.name);
    setFile(selectedFile);
  };

  const handleUploadBtnClick = async () => {
    await getFolderFromExplorer();
    fileFromButton.current?.click();
  };

  return (
    <Card
      className={`mx-auto max-w-xl flex items-center justify-center bg-gray-150 ${
        isDragging > 0 ? "bg-gray-300" : ""
      }`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      placeholder={undefined}
      shadow={true}
    >
      <Typography
        className="pointer-events-none text-center pt-6 inline-block"
        color="blue-gray"
        placeholder={undefined}
      >
        1. Allow the webpage access to the folder with your desired media.
        <br />
        2. Select your video from the folder.
      </Typography>
      <Tooltip
        className="max-w-md"
        content="Browsers generally disallow webpages interacting directly with the user's system. The File System Access API bypasses this restriction in a secure and transparent way, allowing the user to restrict the webpage to only interact with a chosen folder."
      >
        <p className="pt-2 text-xs text-underline hover:underline cursor-pointer">
          ⓘ Why?
        </p>
      </Tooltip>

      <div className="flex flex-col place-content-center max-w-30">
        <Button
          className="max-w-xs mt-6"
          variant="outlined"
          color={isDragging > 0 || file ? "blue-gray" : "blue"}
          size="sm"
          placeholder={undefined}
          onClick={handleUploadBtnClick}
        >
          {folder && !file
            ? "Choose File..."
            : file
            ? file.name
            : "Choose Folder..."}
        </Button>

        <div className={isUploading ? "p-2 " : "p-2 opacity-0"}>
          <BallTriangle
            height="15"
            width="15"
            color="#637D8A"
            ariaLabel="circles-loading"
            wrapperStyle={{ justifyContent: "center" }}
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
            onChange={handleSelectFromExplorer}
          />
        </div>
      </div>
    </Card>
  );
};

export default UploadCard;
