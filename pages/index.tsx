import type { NextPage } from "next";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { css, keyframes } from "@mui/styled-engine";
import Link from "next/link";
import Particle from "../src/components/TitleRive";
import { useRive } from "@rive-app/react-canvas";
const Home: NextPage = () => {
  const TitleText = css`
    font-size: 3rem;
    color: #ffffffcc;
    letter-spacing: -3px;
    font-family: "Zen Kurenaido", serif;
    margin-left: 1%;
  `;

  const Background = css`
    opacity: 0.1;
    object-fit: cover;
  `;

  const ParentDiv = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    min-width: 1000px;
    @media screen and (max-width: 980px) {
      min-width: 600px;
    }
    @media screen and (max-width: 680px) {
      min-width: 400px;
    }
  `;

  const LinkDiv = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    min-width: 350px;
    max-width: 550px;
    letter-spacing: -3px;
  `;

  const LinkHover = keyframes`
  from, 20%, 50%, to {
    transform: translate3d(0,0,0);
  }
  25% {
    transform: translate3d(0px, 2px, 0px);
  }
  75% {
    transform: translate3d(0px, -6px, 0px);
  }
  `;

  const LinkButton = css`
    background-image: linear-gradient(120deg, #3ccd9d 0%, #38b48b 70%);
    transform: rotateX(30deg);
    min-width: 8rem;
    min-height: 4rem;
    font-size: 2rem;
    text-align: center;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Zen Kurenaido", sans-serif;
    &:hover {
      animation: ${LinkHover} 0.8s linear infinite;
    }
  `;

  const { RiveComponent } = useRive({
    src: "/images/kurage.riv",
    autoplay: true,
    stateMachines: "Kurage",
  });

  return (
    <>
      <Particle />
      <Image src="/images/bgptn.jpg" alt="BgImg" fill css={Background} />
      <Box css={ParentDiv}>
        <Typography variant="h2" css={TitleText}>
          {"You-N Portfolio"}
        </Typography>
        <Box sx={{ width: "200px", height: "200px" }}>
          <RiveComponent />
        </Box>
        <Box css={LinkDiv}>
          <Link href="/about" css={LinkButton}>
            概要
          </Link>
          <Link href="/products" css={LinkButton}>
            生産物
          </Link>
          <Link href="/techs" css={LinkButton}>
            学んだ物
          </Link>
          <Link href="/" css={LinkButton}>
            早押し＜封鎖中＞
          </Link>
          <Link href="/" css={LinkButton}>
            俳句＜封鎖中＞
          </Link>
          <Link href="/" css={LinkButton}>
            即席の銘＜封鎖中＞
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Home;
