import DoitsuComponent from "../src/components/DodoitsuComponent";
import { NextPage } from "next";
import { css } from "@mui/styled-engine";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import KuDoitsuFooter from "../src/components/KuDoitsuFooter";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonHiking } from "@fortawesome/free-solid-svg-icons";
import DrawerAppBar from "../src/components/NavBar";

const DoitsuPage: NextPage = () => {
  const doitsuRef = useRef<any>();
  const [dodoitsu_top, setDoitsuTop] = useState("");
  const [dodoitsu_middle, setDoitsuMiddle] = useState("");
  const [dodoitsu_end, setDoitsuEnd] = useState("");

  useEffect(() => {
    doitsuRef.current?.doitsu();
  }, []);

  const Background = css`
    opacity: 0.1;
    object-fit: cover;
    min-height: 1100px;
    min-width: 100vw;
    @media screen and (max-width: 1200px) {
      min-width: 1200px;
    }
  `;

  const LinkStyle = css`
    color: white;
    position: absolute;
    left: 10px;
    top: 80px;
    text-decoration: none;
    z-index: 2;
  `;

  const LinkTextStyle = css`
    color: white;
    background-color: #193f30;
    border-radius: 5%;
    border: solid;
    border-color: #0a1c2e;
    padding: 5px;
  `;
  const TitleStyle = css`
    color: #f0f0f0d0;
    font-family: Yuji Boku, serif;
  `;

  const SubtitleStyle = css`
    color: #f0f0f0d0;
    font-family: Yuji Boku, serif;
    letter-spacing: -2px;
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
    min-height: 1100px;
    @media screen and (max-width: 1100px) {
      min-width: 100vw;
    }
    @media screen and (max-width: 680px) {
      min-width: 350px;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -25%);
      padding-top: 80px;
      padding-bottom: 80px;
    }
  `;

  return (
    <>
      <Image src="/images/bgptn.jpg" alt="BgImg" width={500} height={500} css={Background} />
      <DrawerAppBar />
      <Link href="/haiku" css={LinkStyle}>
        <Typography variant="h5" css={LinkTextStyle}>
          <FontAwesomeIcon icon={faPersonHiking} />
          &ensp;俳句にする
        </Typography>
      </Link>
      <Box css={ParentStyle}>
        <Box css={TitleareaStyle}>
          <Typography variant="h2" css={TitleStyle}>
            都都逸
          </Typography>
          <Typography variant="h6" css={SubtitleStyle}>
            テクニカルな風情をあなたに
          </Typography>
        </Box>
        <DoitsuComponent
          setDoitsuTop={setDoitsuTop}
          setDoitsuMiddle={setDoitsuMiddle}
          setDoitsuEnd={setDoitsuEnd}
          doitsu_top={dodoitsu_top}
          doitsu_middle={dodoitsu_middle}
          doitsu_end={dodoitsu_end}
          ref={doitsuRef}
        ></DoitsuComponent>
        <KuDoitsuFooter
          top={dodoitsu_top}
          middle={dodoitsu_middle}
          end={dodoitsu_end}
          onClickFunc={() => {
            doitsuRef.current?.doitsu();
          }}
        />
      </Box>
    </>
  );
};

export default DoitsuPage;
