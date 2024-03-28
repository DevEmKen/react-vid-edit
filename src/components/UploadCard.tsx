import { useState, useEffect, useRef } from "react";
import { Button, Typography, Card, Tooltip } from "@material-tailwind/react";
import { BallTriangle } from "react-loader-spinner";
import RootState from "../redux/reduxtypes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setBlobUrl } from "../redux/vidFileSlice";

const UploadCard = ({ setUserHasUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [folder, setFolder] = useState(null);

  const fileFromButton = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const file = useSelector((state: RootState) => state.vidFile.blobUrl);

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const getFolderFromExplorer = async () => {};

  const handleSelectFromExplorer = async (event: any) => {
    setIsUploading(true);

    const selectedFile = event.target.files[0];

    try {
      const fh = await folder.getFileHandle(selectedFile.name);
      const fl = await fh.getFile();
      if (fl) {
        const blob = new Blob([fl], { type: fl.type });
        const url = window.URL.createObjectURL(blob);
        setUserHasUploaded(true);
        dispatch(setBlobUrl(url));
      }
    } catch (error) {
      console.log(error);
      window.alert(
        "Cannot open file. Did you give permission for the correct folder?"
      );
      setIsUploading(false);
      dispatch(setBlobUrl(null));
    }
  };

  // showDirectoryPicker is not included with Window type by default.
  // For Amplify, we must intersect the default type so that TS won't complain
  type WindowWithFilePicker = Window & {
    showDirectoryPicker(
      options?: FilePickerOptions
    ): Promise<FileSystemDirectoryHandle>;
  };

  type FilePickerOptions = {
    startIn: "desktop";
    mode: "readwrite";
  };

  const handleUploadBtnClick = async () => {
    try {
      const extWindow = window as unknown as WindowWithFilePicker;
      // File System Access API. Requires HTTPS.
      if ("showDirectoryPicker" in window) {
        const fld = await extWindow.showDirectoryPicker({
          startIn: "desktop",
          mode: "readwrite",
        });
        setFolder(fld);
      } else {
        window.alert("Please update your browser");
      }
    } catch (error) {
      console.error("Error :: ", error);
    } finally {
      setIsUploading(false);
      fileFromButton.current?.click();
    }
  };

  return (
    <Card
      className={`mx-auto max-w-xl flex items-center justify-center bg-gray-150`}
      onDragOver={handleDragOver}
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
          color={file ? "blue-gray" : "blue"}
          size="sm"
          placeholder={undefined}
          onClick={handleUploadBtnClick}
        >
          {folder && !file
            ? "Choose File..."
            : file
            ? "Working..."
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
