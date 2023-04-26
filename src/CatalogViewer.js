import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import {
  PlayArrow,
  Pause,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import images from "./data";

const CatalogViewer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Slideshow autoplay
  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying]);

  // Thumbnail click handler
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setIsPlaying(false);
  };

  // Previous/Next button click handlers
  const handlePreviousClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setIsPlaying(false);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsPlaying(false);
  };

  // Play/Pause button click handler
  const handlePlayPauseClick = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <Box sx={{ mx: "auto", p: 2 }}>
      {/* Current image and details */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box sx={{ position: "relative" }}>
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].details}
              width="100%"
              style={{ borderRadius: "3rem" }}
            />
            {isPlaying && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Pause
                  sx={{ fontSize: { xs: "40px", md: "60px" }, color: "white" }}
                />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h6">{images[currentIndex].details}</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Thumbnail gallery */}
      <Box sx={{ mt: 2 }}>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Grid item>
            <IconButton onClick={handlePreviousClick}>
              <NavigateBefore
                sx={{
                  fontSize: { xs: "40px", md: "60px" },
                }}
              />
            </IconButton>
          </Grid>

          {images.map((image, index) => (
            <Grid item xs={4} sm={2} key={index}>
              <Box
                onClick={() => handleThumbnailClick(index)}
                sx={{
                  position: "relative",
                  cursor: "pointer",
                  filter: index === currentIndex ? "none" : "grayscale(100%)",
                }}
              >
                <img
                  src={image.url}
                  alt={image.details}
                  width="100%"
                  style={{ borderRadius: "1rem" }}
                />
                {index === currentIndex && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <PlayArrow
                      sx={{
                        fontSize: { xs: "40px", md: "60px" },
                        color: "white",
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
          {/* Previous/Next buttons */}
          <Grid item>
            <IconButton onClick={handleNextClick}>
              <NavigateNext
                sx={{
                  fontSize: { xs: "40px", md: "60px" },
                }}
              />
            </IconButton>
          </Grid>

          {/* Play/Pause button */}
          <Grid item>
            <IconButton onClick={handlePlayPauseClick}>
              {isPlaying ? (
                <Pause sx={{ fontSize: { xs: "40px", md: "60px" } }} />
              ) : (
                <PlayArrow sx={{ fontSize: { xs: "40px", md: "60px" } }} />
              )}
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CatalogViewer;
