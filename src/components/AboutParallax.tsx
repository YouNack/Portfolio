import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { css } from "@mui/styled-engine";
import aboutJson from "../about.json";
import React from "react";
import Image from "next/image";

export default function AboutParallax() {
  const transBr = (text: string) => {
    return text.split("<br/>").map((t, idx) => (
      <React.Fragment key={idx}>
        {t}
        <br css={brStyle} />
      </React.Fragment>
    ));
  };

  const ScrollbarStyle = css`
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari 対応 */
    }
  `;
  const CardStyle = css`
    width: 800px;
    min-height: 570px;
    background-color: #041526;
    @media screen and (max-width: 680px) {
      width: 400px;
    }
    @media screen and (max-width: 390px) {
      min-height: 80%;
      margin-top:100px;
    }
  `;
  const TitleStyle = css`
    font-family: Zen Kurenaido;
    color: white;
    @media screen and (max-width: 680px) {
      font-size: 1.7rem;
    }
    @media screen and (max-width: 380px) {
      font-size: 1.4rem;
    }
  `;
  const ContentStyle = css`
    color: white;
    line-height: 1.7em;
    @media screen and (max-width: 680px) {
      font-size: 1rem;
    }
    @media screen and (max-width: 380px) {
      font-size: 0.8rem;
    }    
  `;
  const CardAreaStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const brStyle = css`
    display: block;
    content: "";
    margin: 10px 0;
    @media screen and (max-width: 780px) {
      margin: 15px 0;
    }
  `;

  const ImageAreaStyle = css`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 30px 0;
    @media screen and (max-width: 780px) {
      justify-content: center;
      flex-direction: column;
    }
  `;

  const ImageStyle = css`
    @media screen and (max-width: 780px) {
      width: 150px;
      height: 150px;
    }
    @media screen and (max-width: 380px) {
      width: 100px;
      height: 100px;
    }
  `;

  return (
    <Box>
      <Parallax pages={7} css={ScrollbarStyle}>
        {aboutJson.about.map((content: any) => {
          return (
            <ParallaxLayer offset={0} sticky={{ start:(content.end) -2, end: content.end }} css={CardAreaStyle} key={content.title}>
              <Card css={CardStyle}>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div" css={TitleStyle}>
                    {content.title}
                  </Typography>

                  {content.imgSrc != null ? (
                    <Box css={ImageAreaStyle}>
                      <Typography variant="h6" sx={{ color: "white" }}>
                        　{transBr(content.imgDesc)}
                      </Typography>
                      <Image
                        src={"/images/" + content.imgSrc}
                        alt="cardImg"
                        width="200"
                        height="200"
                        css={ImageStyle}
                      />
                    </Box>
                  ) : (
                    <></>
                  )}

                  <Typography variant="h6" css={ContentStyle}>
                    　{transBr(content.content)}
                  </Typography>

                  {content.subtitle != null ? (
                    <>
                      <br />
                      <br />
                      <Typography gutterBottom variant="h4" component="div" css={TitleStyle}>
                        {content.subtitle}
                      </Typography>
                    </>
                  ) : (
                    <></>
                  )}

                  {content.subcontent != null ? (
                    <>
                      <Typography variant="h6" css={ContentStyle}>
                        　{transBr(content.subcontent)}
                      </Typography>
                    </>
                  ) : (
                    <></>
                  )}
                </CardContent>
              </Card>
            </ParallaxLayer>
          );
        })}

        <ParallaxLayer offset={0} speed={1} factor={2.1} style={{ background: "linear-gradient(#020a14, #02060c)" }} />
        <ParallaxLayer offset={1} speed={1} factor={2.1} style={{ background: "linear-gradient(#02060c, #071a3c)" }} />
        <ParallaxLayer offset={2} speed={1} factor={2.1} style={{ background: "linear-gradient(#071a3c, #100433)" }} />
        <ParallaxLayer offset={3} speed={1} factor={2.1} style={{ background: "linear-gradient(#100433, #083245)" }} />
        <ParallaxLayer offset={4} speed={1} factor={2.1} style={{ background: "linear-gradient(#083245, #217172)" }} />
        <ParallaxLayer offset={5} speed={1} factor={2.1} style={{ background: "linear-gradient(#217172, #217681)" }} />
        <ParallaxLayer offset={6} speed={1} factor={2.1} style={{ background: "linear-gradient(#217681, #9addde)" }} />
      </Parallax>
    </Box>
  );
}
