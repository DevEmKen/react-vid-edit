import { useState, useEffect, useRef } from "react";
import MyNav from "./components/MyNav.tsx";
import UploadCard from "./components/UploadCard.tsx";
import "./styles/LandingPage.css";

import { Button, Typography, Card } from "@material-tailwind/react";

function LandingPage() {
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState(null);

  return (
    <div className="">
      <MyNav />

      <Typography
        variant="h1"
        color="blue-gray"
        className="text-center font-bold mb-8 pt-20"
        placeholder={undefined}
      >
        Offline Editor
      </Typography>
      <Typography
        variant="h3"
        color="blue-gray"
        className="text-center font-bold mb-8 py-8"
        placeholder={undefined}
      >
        Edit your videos locally, through a webpage!
      </Typography>

      <UploadCard
        file={file}
        setFile={setFile}
        folder={folder}
        setFolder={setFolder}
      />

      <div className="mx-auto max-w-screen-md py-12">
        <Card className="mb-12 overflow-hidden" placeholder={undefined}>
          <img
            alt="nature"
            className="h-[32rem] w-full object-cover object-center"
            src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
          />
        </Card>
        <Typography
          variant="h2"
          color="blue-gray"
          className="mb-2"
          placeholder={undefined}
        >
          Check out what it does
        </Typography>
      </div>
    </div>
  );
}

export default LandingPage;
