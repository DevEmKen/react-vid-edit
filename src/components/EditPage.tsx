import { useRef, useState, useEffect } from "react";
import RootState from "../redux/reduxtypes.tsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setBlobUrl } from "../redux/vidFileSlice.tsx";
import ReactPlayer from "react-player";
import { Button } from "@material-tailwind/react";
import { FFmpeg } from "@ffmpeg/ffmpeg";

const EditPage = ({}) => {
  const file = useSelector((state: RootState) => state.vidFile.blobUrl);
  const playerRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [controls, setControls] = useState(true);
  const [loaded, setLoaded] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    const ffmpeg = new FFmpeg();
    async function loadFFmpeg() {
      try {
        await ffmpeg.load();
      } catch (error) {
        console.log("Error loading FFMpeg.wasm: " + error);
      }
    }

    loadFFmpeg();
  }, []);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleSplit = () => {};

  return (
    <div>
      <div>pretty swag</div>
      <ReactPlayer
        url={file}
        ref={playerRef}
        playing={playing}
        volume={volume}
        muted={muted}
        controls={controls}
      />
      <Button onClick={handlePlayPause} placeholder={undefined}>
        playpause
      </Button>
      <Button onClick={handleSplit} placeholder={undefined}>
        SPLIT
      </Button>
    </div>
  );
};

export default EditPage;
