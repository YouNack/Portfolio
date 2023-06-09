import { NextPage } from "next";
import { css } from "@mui/styled-engine";
import { Box, Typography } from "@mui/material";
import ZayuComponent from "../src/components/ZayuComponent";
import DrawerAppBar from "../src/components/NavBar";
import Image from "next/image";

const ZayunomeiPage: NextPage = () => {
  const Background = css`
    opacity: 0.1;
    object-fit: cover;
  `;

  const TitleStyle = css`
    color: #f0f0f0d0;
    font-family: Yuji Boku, serif;
  `;

  const SubtitleStyle = css`
    color: #f0f0f0d0;
    font-family: Yuji Boku, serif;
  `;

  const TitleareaStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  `;

  const ParentStyle = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    min-width: 1200px;
    padding: 2px;
    gap: 30px;
    padding-top: 90px;
    @media screen and (max-width: 980px) {
      min-width: 350px;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -25%);
      padding-top: 40px;
    }
    @media screen and (max-width: 280px) {
      min-width: 200px;
    }
  `;

  return (
    <>
      <Image src="/images/bgptn.jpg" alt="BgImg" fill css={Background} />
      <DrawerAppBar />
      <Box css={ParentStyle}>
        <Box css={TitleareaStyle}>
          <Typography variant="h2" css={TitleStyle}>
            即席の銘
          </Typography>
          <Typography variant="h5" css={SubtitleStyle}>
            ボタンを押して生き方を決める
          </Typography>
        </Box>
        <ZayuComponent />
      </Box>
    </>
  );
};

export default ZayunomeiPage;
