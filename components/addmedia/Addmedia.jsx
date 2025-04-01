import { Box, Avatar } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "./Addmedia.css";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { SlCamrecorder } from "react-icons/sl";
import { TbBrandPagekit } from "react-icons/tb";
import { CiChat1 } from "react-icons/ci";
import { RiVoiceprintFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";

const Addmedia = ({ setFileType, setFile }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.type.startsWith("audio")) {
          setFileType("audio");
          setFile(file);
        } else if (file.type.startsWith("video")) {
          setFileType("video");
          setFile(file);
        } else if (file.type.startsWith("image")) {
          setFileType("image");
          setFile(file);
        }
      }
    },
    [setFileType, setFile]
  );

  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv'],
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    }
  });

  return (
    <Box className="addmedia">
      <h1>Add Media</h1>
      <Box className="media-filebox" {...getRootProps()}>
        <input {...getInputProps()} />
        <Box className="media-upload-icon">
          <IoCloudUploadOutline />
        </Box>
        <p>Upload Files</p>
        <a>
          <span>Drag and Drop</span> <br /> or Import from a Link
        </a>
      </Box>
      <Box className="media-buttons">
        <button className="media-btn">
          <SlCamrecorder /> Record
        </button>
        <button className="media-btn">
          <TbBrandPagekit /> Brand Kit
        </button>
        <button className="media-btn">
          <CiChat1 /> Text to Speech
        </button>
        <button className="media-btn">
          <RiVoiceprintFill /> Voice Clone
        </button>
      </Box>
      <Box className="avtars">
        <Box className="heading">
          <h2>AI Avtars</h2>
          <span>View All</span>
        </Box>
        <Carousel className="carousel" withIndicators height={100} slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }} slideGap={{ base: 0, sm: "md" }} loop align="start" slidesToScroll={3}>
          <Carousel.Slide className="slide">
            <Box className="avtar">
              <Avatar />
            </Box>
          </Carousel.Slide>
          <Carousel.Slide className="slide">
            <Box className="avtar">
              <Avatar />
            </Box>
          </Carousel.Slide>
          <Carousel.Slide className="slide">
            <Box className="avtar">
              <Avatar />
            </Box>
          </Carousel.Slide>
          <Carousel.Slide className="slide">
            <Box className="avtar">
              <Avatar />
            </Box>
          </Carousel.Slide>
          <Carousel.Slide className="slide">
            <Box className="avtar">
              <Avatar />
            </Box>
          </Carousel.Slide>
          <Carousel.Slide className="slide">
            <Box className="avtar">
              <Avatar />
            </Box>
          </Carousel.Slide>
        </Carousel>
      </Box>
      <Box className="videos">
        <Box className="heading">
          <h2>Stock Videos</h2>
          <span>Search</span>
        </Box>
        <Box className="categories">
          <Box className="category">Animals</Box>
          <Box className="category">Nature</Box>
          <Box className="category">People</Box>
          <Box className="category dots">
            <BsThreeDots />
          </Box>
        </Box>
        <Carousel className="carousel" withIndicators height={100} slideSize={{ base: "100%", sm: "50%", md: "55%" }} slideGap={{ base: 0, sm: "0" }} loop align="start" slidesToScroll={2}>
          <Carousel.Slide className="slide">
            <Box className="vid"></Box>
          </Carousel.Slide>
          <Carousel.Slide className="slide">
            <Box className="vid"></Box>
          </Carousel.Slide>
          <Carousel.Slide className="slide">
            <Box className="vid"></Box>
          </Carousel.Slide>
          <Carousel.Slide className="slide">
            <Box className="vid"></Box>
          </Carousel.Slide>
          <Carousel.Slide className="slide">
            <Box className="vid"></Box>
          </Carousel.Slide>
          <Carousel.Slide className="slide">
            <Box className="vid"></Box>
          </Carousel.Slide>
        </Carousel>
      </Box>
      <Box className="audios">
        <Box className="heading">
          <h2>Stock Music</h2>
          <span>Search</span>
        </Box>
        <Box className="categories">
          <Box className="category">R&B</Box>
          <Box className="category">Jazz</Box>
          <Box className="category">Blues</Box>
          <Box className="category">Pop</Box>
          <Box className="category">Rock</Box>
          <Box className="category dots">
            <BsThreeDots />
          </Box>
        </Box>
        <Box className="music">
          <Box className="single"></Box>
          <Box className="single"></Box>
          <Box className="single"></Box>
          <Box className="single"></Box>
          <Box className="single"></Box>
          <Box className="single"></Box>
          <button className="more single">More</button>
        </Box>
      </Box>
      <Box className="effects">
        <Box className="heading">
          <h2>Sound Effects</h2>
          <span>Search</span>
        </Box>
        <Box className="categories">
          <Box className="category">Effects</Box>
          <Box className="category">Bells</Box>
          <Box className="category">Foley</Box>
          <Box className="category">Buzzers</Box>
          <Box className="category dots">
            <BsThreeDots />
          </Box>
        </Box>
        <Box className="music">
          <Box className="single"></Box>
          <Box className="single"></Box>
          <Box className="single"></Box>
          <Box className="single"></Box>
          <Box className="single"></Box>
          <Box className="single"></Box>
          <button className="more single">More</button>
        </Box>
      </Box>
    </Box>
  );
};

export default Addmedia;