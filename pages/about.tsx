import React from "react";
import { NextPage } from "next";
import { css } from "@mui/styled-engine";
import { Box, Typography } from "@mui/material";
import DrawerAppBar from "../src/components/NavBar";
import AboutParallax from "../src/components/AboutParallax";
import Image from "next/image";
const AboutPage: NextPage = () => {
  const overflow = css`
    -ms-overflow-style: none;
    scrollbar-width: none;
    &:-webkit-scrollbar {
      display: none; /* Chrome, Safari 対応 */
    }
  `;
  const Background = css`
    opacity: 0.1;
    object-fit: cover;
  `;
  return (
    <Box>
      <Image src="/images/bgptn.jpg" alt="BgImg" fill css={Background} />
      <DrawerAppBar />
      <Box css={overflow}>
        <AboutParallax />
      </Box>
    </Box>
  );
};

export default AboutPage;
