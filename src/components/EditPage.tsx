import { useState } from "react";
import RootState from "../redux/reduxtypes.tsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setBlobUrl } from "../redux/vidFileSlice.tsx";
import ReactPlayer from "react-player";
import { Button } from "@material-tailwind/react";

const EditPage = ({}) => {
  const file = useSelector((state: RootState) => state.vidFile.blobUrl);

  return (
    <div>
      <div>pretty swag</div>
      <ReactPlayer url={file} />
      <Button placeholder={undefined}>playpause</Button>
    </div>
  );
};

export default EditPage;
