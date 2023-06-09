import { Box, Button, Typography } from "@mui/material";
import { css, keyframes } from "@mui/styled-engine";
import { useState } from "react";
import { faTwitter, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ZayuComponent() {
  const [isStopped, setStop] = useState(false);
  const [zayunomei1, setZayunomei1] = useState("筋");
  const [zayunomei2, setZayunomei2] = useState("肉");
  const [zayunomei3, setZayunomei3] = useState("番");
  const [zayunomei4, setZayunomei4] = useState("付");
  const [yojiJukugoYomi, setYomi] = useState("わかんない！");
  const kanji = require("../wordset/Kanji").default;
  const yoji_jukugo = require("../wordset/四字熟語").default;

  const decideYojijukugo = () => {
    let r = Math.floor(Math.random() * 1001);
    if (r > 950) {
      decideKanji();
    } else {
      let yj = yoji_jukugo[Math.floor(Math.random() * yoji_jukugo.length)];
      setZayunomei1(yj[1][0]);
      setZayunomei2(yj[1][1]);
      setZayunomei3(yj[1][2]);
      setZayunomei4(yj[1][3]);
      setYomi(yj[0]);
    }
  };

  const decideKanji = () => {
    let firstKanji = kanji[Math.floor(Math.random() * kanji.length)][0];
    let secondKanji = kanji[Math.floor(Math.random() * kanji.length)][0];
    let thirdKanji = kanji[Math.floor(Math.random() * kanji.length)][0];
    let forthKanji = kanji[Math.floor(Math.random() * kanji.length)][0];
    let sameKanji = Math.floor(Math.random() * 101);
    setZayunomei1(firstKanji);
    if (sameKanji > 99) {
      setZayunomei2(firstKanji);
    } else {
      setZayunomei2(secondKanji);
    }
    if (sameKanji > 85) {
      setZayunomei3(firstKanji);
    } else {
      setZayunomei3(thirdKanji);
    }
    if (sameKanji > 99) {
      setZayunomei4(firstKanji);
    } else {
      setZayunomei4(forthKanji);
    }
    setYomi("わかんない！");
  };

  const ParentStyle = css`
    min-width: 600px;
    min-height: 600px;
    @media screen and (max-width: 680px) {
      min-width: 300px;
    }
  `;

  const KanjiSpaceStyle = css`
    background-color: rgb(255, 255, 255);
    height: 20vh;
    display: grid;
    justify-items: center;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-top: 4vh;
    margin: 4vh 2vw 0 2vw;
    overflow: hidden;
  `;

  const ZayuNoscrollStyle = css`
    font-family: Yuji Boku, serif;
    color: rgb(0, 0, 0);
    writing-mode: vertical-rl;
    font-size: 4rem;
    min-width: 4vw;
    text-align: center;
    white-space: nowrap;
    @media screen and (max-width: 780px) {
      font-size: 1.9rem;
    }
  `;

  const scrollText = keyframes`
      0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(400px);
  }
  51% {
    transform: translateY(-400px);
  }
  100% {
    transform: translateY(0px);
  }
  `;

  const ZayuScrollStyle = css`
    font-family: Yuji Boku, serif;
    color: rgb(0, 0, 0);
    writing-mode: vertical-rl;
    font-size: 4rem;
    animation: 0.3s linear infinite ${scrollText};
    min-width: 4vw;
    text-align: center;
    white-space: nowrap;
    @media screen and (max-width: 780px) {
      font-size: 1.9rem;
    }
  `;

  const ZayuStopStyle = css`
    border: 1px solid #329c79;
    border-radius: 5%;
    padding: 0.4rem;
    margin: 1em;
    font-size: x-large;
    background-color: #38b48b;
    color: #ffffff;
    margin-top: 5vh;
  `;

  const StopSpaceStyle = css`
    justify-content: center;
    align-items: center;
    text-align: center;
  `;

  const YourZayuStyle = css`
    margin: 6vh 0 1vh 0;
    color: #ffffff;
    @media screen and (max-width: 780px) {
      font-size: 1.5rem;
    }
  `;

  const ButtonDivStyle = css`
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    display: flex;
  `;

  const SearchButtonStyle = css`
    border: 1px solid #006dd9;
    border-radius: 5%;
    padding: 0.5rem;
    margin-right: 1em;
    font-size: x-large;
    background-color: rgb(245, 245, 245);
    color: #001b08;
    min-width: 120px;
    @media screen and (max-width: 780px) {
      font-size: 1rem;
    }
  `;

  const ZayuTweetButtonStyle = css`
    border: 1px solid #006dd9;
    border-radius: 5%;
    padding: 0.5rem;
    margin: 1em;
    font-size: x-large;
    background-color: #31a9ee;
    color: #ffffff;
    min-width: 120px;
    @media screen and (max-width: 780px) {
      font-size: 1rem;
    }
  `;

  const StoppedDivStyle = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `;

  return (
    <>
      <Box css={ParentStyle}>
        {isStopped ? (
          <Box css={KanjiSpaceStyle}>
            <p css={ZayuNoscrollStyle}>{zayunomei1}</p>
            <p css={ZayuNoscrollStyle}>{zayunomei2}</p>
            <p css={ZayuNoscrollStyle}>{zayunomei3}</p>
            <p css={ZayuNoscrollStyle}>{zayunomei4}</p>
          </Box>
        ) : (
          <Box css={KanjiSpaceStyle}>
            <p css={ZayuScrollStyle}>筋肉長者番付三保松原棒鶏</p>
            <p css={ZayuScrollStyle}>長者番付三保松原棒鶏筋肉</p>
            <p css={ZayuScrollStyle}>番付三保松原棒鶏筋肉長者</p>
            <p css={ZayuScrollStyle}>三保松原棒鶏筋肉長者番付</p>
          </Box>
        )}
        <Box css={StopSpaceStyle}>
          <Button
            css={ZayuStopStyle}
            onClick={() => {
              if (!isStopped) {
                decideYojijukugo();
              }
              setStop(!isStopped);
            }}
          >
            {isStopped ? "スタート" : "ストップ"}
          </Button>
        </Box>
        <Box>
          {isStopped ? (
            <Box css={StoppedDivStyle}>
              <Typography variant="h4" css={YourZayuStyle}>
                あなたの座右の銘は...{zayunomei1 + zayunomei2 + zayunomei3 + zayunomei4 + " (" + yojiJukugoYomi + ")"}
              </Typography>
              <Box css={ButtonDivStyle}>
                <a
                  href={"https://www.google.com/search?q=" + zayunomei1 + zayunomei2 + zayunomei3 + zayunomei4}
                  css={SearchButtonStyle}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faGoogle} />
                  &nbsp;座右の銘をGoogleで検索
                </a>
                <a
                  href={
                    "http://twitter.com/share?related=enilimo&hashtags=ルーレット座右の銘&text=あなたの座右の銘は：" +
                    zayunomei1 +
                    zayunomei2 +
                    zayunomei3 +
                    zayunomei4
                  }
                  css={ZayuTweetButtonStyle}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                  &nbsp;ツイート
                </a>
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </>
  );
}
