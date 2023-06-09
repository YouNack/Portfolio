import DrawerAppBar from "../src/components/NavBar";
import { css } from "@mui/styled-engine";
import NextImage from "next/image";
import GameComponent from "../src/components/GameComponent";

const HayaoshiPage = () => {
  const Background = css`
    opacity: 0.1;
    object-fit: cover;
  `;

  return (
    <>
      <NextImage src="/images/bgptn.jpg" alt="BgImg" fill css={Background} />
      <DrawerAppBar />
      <GameComponent />
    </>
  );
};
export default HayaoshiPage;
