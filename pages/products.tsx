import CardContext from "../src/components/CardContext";
import { NextPage } from "next";
import productJson from "../src/products.json";
import { css } from "@mui/styled-engine";
import { Box } from "@mui/material";
import { useSpring, animated } from "react-spring";
import DrawerAppBar from "../src/components/NavBar";
import Image from "next/image";

const ProductsPage: NextPage = () => {
  const styles = useSpring({
    from: { opacity: 0.5 },
    to: { opacity: 1 },
    config: { duration: 700 },
  });

  const Background = css`
    opacity: 0.1;
    object-fit: cover;
  `;

  const ParentStyle = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    min-width: 1200px;
    gap: 30px;
    padding: 5px;
    padding-top: 90px;
    @media screen and (max-width: 980px) {
      min-width: 600px;
      top: 5%;
      left: 50%;
      transform: translate(-50%, 0%);
      padding-top: 40px;
    }
    @media screen and (max-width: 680px) {
      min-width: 400px;
    }
  `;
  return (
    <>
      <Image src="/images/bgptn.jpg" alt="BgImg" fill css={Background} />
      <DrawerAppBar />
      <Box css={ParentStyle}>
        {productJson.product.map((content: any) => {
          return (
            <animated.div key={content.title} style={{ ...styles }}>
              <CardContext
                imgSrc={"/images/cards/" + content.imgSrc}
                title={content.title}
                text={content.content}
                backtitle={content.backTitle}
                backtext={content.backContent}
                buttonList={content.buttonList}
                buttonRef={content.buttonRef}
              />
            </animated.div>
          );
        })}
      </Box>
    </>
  );
};

export default ProductsPage;
