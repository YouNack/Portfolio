import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Card, Button, CardMedia, CardActionArea, Typography, CardContent } from "@mui/material";
import { css, keyframes } from "@mui/styled-engine";
import Image from "next/image";

export default function CardContext(prop: {
  imgSrc: string;
  title: string;
  text: string;
  backtitle: string;
  backtext: string;
  buttonList: Array<string>;
  buttonRef: Array<string>;
}) {
  const [flipped, setFlipped] = useState(false);
  const [cardImg, setCardImg] = useState(prop.imgSrc);
  const [cardTitle, setCardTitle] = useState(prop.title);
  const [cardText, setCardText] = useState("" + prop.text);

  const flipFlop = () => {
    setFlipped(!flipped);
    if (flipped) {
      setCardImg(prop.imgSrc);
      setCardTitle(prop.title);
      setCardText(prop.text);
    } else {
      setCardImg(prop.imgSrc);
      setCardTitle(prop.backtitle);
      setCardText(prop.backtext);
    }
  };

  const { transform, opacity } = useSpring({
    opacity: flipped ? 0 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 360 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const createButtons = () => {
    const buttonNum = prop.buttonList.length ?? 0;
    const btList = [];
    for (let i = 0; i < buttonNum; i++) {
      btList.push(
        <Button href={prop.buttonRef[i]} className="id_button" key={i}>
          {prop.buttonList[i]}
        </Button>
      );
    }
    return btList;
  };

  const CardStyle = css`
    min-width: 300px;
    max-width: 350px;
    @media screen and (max-width: 680px) {
      max-width: 200px;
    }
  `;

  const ImgStyle = css`
    margin: 5px;
    padding: 2px;
  `;

  return (
    <div>
      <animated.div style={{ opacity: opacity.to((o) => 1 - o), transform }}>
        <Card css={CardStyle} sx={{ backgroundColor: "#041526", color: "#ffffffcc" }}>
          <CardActionArea onClick={() => flipFlop()}>
            <Image src={cardImg} alt="Ux-GrHub" width="50" height="50" css={ImgStyle} />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                  fontFamily: "Zen Kurenaido",
                }}
              >
                {cardTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ color: "#ffffffcc" }}>
                {cardText}
              </Typography>
            </CardContent>
          </CardActionArea>
          {createButtons()}
        </Card>
      </animated.div>
    </div>
  );
}
