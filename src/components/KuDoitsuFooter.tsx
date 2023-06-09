import { css } from "@mui/styled-engine";
import Image from "next/image";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const KuDoitsuFooter = (prop: { top: string; middle: string; end: string; onClickFunc: any }) => {
  const TweetStyle = css`
    min-width: 2em;
    min-height: 6rem;
    border: 1px solid #006dd9;
    border-radius: 5%;
    padding: 0.5rem;
    padding-top: 1.4rem;
    margin: 1em;
    font-size: 2rem;
    background-color: #00a1e0;
    color: #c7c7c7;
    @media screen and (max-width: 1080px) {
      font-size: 1.3rem;
      min-width: 1.2em;
      min-height: 3rem;
      padding-top: 1rem;
    }
  `;

  const ButtonAreaStyle = css`
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    right: 0;
    bottom: 0;
    background-color: transparent;
    @media screen and (max-width: 680px) {
      flex-direction: column;
    }
  `;

  const RedoTextStyle = css`
    font-family: Yuji Boku, serif;
    font-size: xx-large;
    border: solid;
    border-color: rgba(237, 237, 237, 0.287);
    max-height: 100px;
    @media screen and (max-width: 1080px) {
      max-width: 300px;
      max-height: 80px;
      font-size: 1.3rem;
    }
  `;

  const FooterStyle = css`
    position: absolute;
    left: 5px;
    bottom: 5px;
    color: #ffffff49;
    /* @media screen and (max-width: 680px) {
      left: 0px;
      bottom: -220px;
    } */
  `;

  const FooterTextStyle = css`
    @media screen and (max-width: 680px) {
      font-size: 0.8rem;
    }
  `;
  return (
    <>
      <Box css={ButtonAreaStyle}>
        <Link
          href={
            "http://twitter.com/share?related=enilimo&hashtags=フェニックス一句&text=" +
            prop.top +
            " " +
            prop.middle +
            " " +
            prop.end
          }
          rel="noopener noreferrer"
          css={TweetStyle}
          target="_blank"
        >
          <FontAwesomeIcon icon={faTwitter} />
          &nbsp;ツイート
        </Link>
        <Button onClick={prop.onClickFunc} css={RedoTextStyle}>
          もう一句
          <Image src={"/images/インターネット松尾芭蕉.png"} alt="basho" width={80} height={80} />
        </Button>
      </Box>
      <Box css={FooterStyle}>
        <Typography variant="h6" css={FooterTextStyle}>
          ※単語はmecab-ipadic-2.7.0-20070801より抜粋
        </Typography>
      </Box>
    </>
  );
};

export default KuDoitsuFooter;
