import { useState, useEffect } from "react";
import MyNav from "./components/MyNav";
import "./App.css";

import { Button, Typography, Card } from "@material-tailwind/react";

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState([]);

  const handleDragEnter = (event: any) => {
    // Need to check if event.dataTransfer has files
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    setFile(droppedFiles); // Update state with dropped files
  };

  return (
    <div className="">
      <MyNav />

      <Typography
        variant="h1"
        color="blue-gray"
        className="text-center font-bold mb-8 pt-20"
        placeholder={undefined}
      >
        Online Editor
      </Typography>
      <Typography
        variant="h3"
        color="blue-gray"
        className="text-center font-bold mb-8 py-8"
        placeholder={undefined}
      >
        Upload your videos to our website, edit them, then download them yo
      </Typography>

      <Card
        className={`mx-auto max-w-lg flex ${isDragging ? "bg-blue-500" : ""}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        placeholder={undefined}
      >
        <Typography color="blue-gray" placeholder={undefined}>
          <p className="text-center text-gray-700 mb-8">
            Drag and drop or click to select...
          </p>
        </Typography>
        <div className="flex justify-center content-center">
          <Button
            className="max-w-xs mb-4"
            variant="outlined"
            color="blue"
            size="md"
            placeholder={undefined}
          >
            Upload
          </Button>
        </div>
      </Card>

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
          Check out what it do
        </Typography>
      </div>
    </div>
  );
}

export default App;
