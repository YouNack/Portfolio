import { Box, Button, Typography } from "@mui/material";
import { css, keyframes } from "@mui/styled-engine";
import { forwardRef, useImperativeHandle } from "react";

const HaikuComponent = forwardRef<any, any>(function HaikuComponent(
  prop: {
    setKuTop: any;
    setKuMiddle: any;
    setKuEnd: any;
    ku_top: string;
    ku_middle: string;
    ku_end: string;
  },
  ref
) {
  const postp1 = require("../wordset/1文字postp").default;
  const postp2 = require("../wordset/2文字postp").default;
  const auxil2 = require("../wordset/2文字auxil").default;
  const adnominal4 = require("../wordset/4文字adnominal").default;
  const verb5 = require("../wordset/5文字verb").default;
  const norm3 = require("../wordset/3文字norm").default;
  const norm4 = require("../wordset/4文字norm").default;
  const norm5 = require("../wordset/5文字norm").default;
  const norm6 = require("../wordset/6文字norm").default;
  const norm7 = require("../wordset/7文字norm").default;
  const st = require("../wordset/ひらがな").default;

  const generateKu = (Zen: Array<string>, Go: Array<string>) => {
    return Zen[Math.floor(Math.random() * Zen.length)] + Go[Math.floor(Math.random() * Go.length)];
  };

  const createKu_first = () => {
    let ku_tmp = "";
    let first = Math.floor(Math.random() * 101);
    if (first < 40) {
      ku_tmp = generateKu(norm3, postp2);
    } else if (first < 80) {
      ku_tmp = generateKu(norm4, postp1);
    } else {
      ku_tmp = norm5[Math.floor(Math.random() * norm5.length)];
    }
    prop.setKuTop(ku_tmp);
  };

  const createKu_middle = () => {
    let ku_tmp = "";
    let middle = Math.floor(Math.random() * 101);
    if (middle < 20) {
      ku_tmp = generateKu(adnominal4, norm3);
    } else if (middle < 35) {
      ku_tmp = generateKu(norm5, postp2);
    } else if (middle < 65) {
      ku_tmp = generateKu(norm6, postp1);
    } else {
      ku_tmp = norm7[Math.floor(Math.random() * norm7.length)];
    }
    prop.setKuMiddle(ku_tmp);
  };

  const createKu_end = () => {
    let ku_tmp = "";
    let end = Math.floor(Math.random() * 101);
    if (end < 5) {
      ku_tmp = generateKu(norm3, auxil2);
    } else if (end < 10) {
      ku_tmp = generateKu(norm3, postp2);
    } else if (end < 15) {
      ku_tmp = generateKu(norm4, postp1);
    } else if (end < 18) {
      ku_tmp = norm6[Math.floor(Math.random() * norm6.length)];
    } else if (end < 60) {
      ku_tmp = norm5[Math.floor(Math.random() * norm5.length)];
    } else {
      ku_tmp = verb5[Math.floor(Math.random() * verb5.length)];
    }
    prop.setKuEnd(ku_tmp);
  };

  const createFucKu = () => {
    let fk_first = "";
    let fk_second = "";
    let fk_third = "";

    for (let i = 0; i < 5; i++) {
      fk_first += st[Math.floor(Math.random() * st.length)];
    }
    for (let i = 0; i < 7; i++) {
      fk_second += st[Math.floor(Math.random() * st.length)];
    }
    for (let i = 0; i < 5; i++) {
      fk_third += st[Math.floor(Math.random() * st.length)];
    }
    prop.setKuTop(fk_first);
    prop.setKuMiddle(fk_second);
    prop.setKuEnd(fk_third);
  };

  const createKu = () => {
    let level = Math.floor(Math.random() * 101);
    if (level < 99) {
      createKu_first();
      createKu_middle();
      createKu_end();
    } else {
      createFucKu();
    }
  };

  useImperativeHandle(ref, () => ({
    ku: () => {
      createKu();
    },
  }));

  const ReloadStyle = css`
    font-family: Yuji Boku, serif;
    padding: 5px 10px 5px 10px;
    font-size: x-large;
    background-color: #041526;
    border-radius: 5%;
    border: solid;
    border-color: #0a1c2e;
    @media screen and (max-width: 680px) {
      font-size: 1rem;
      margin: 0 10px 0 10px;
    }
  `;

  const KuStyle = css`
    font-family: Yuji Boku, serif;
    color: rgb(255, 255, 255);
    writing-mode: vertical-rl;
    font-size: 2rem;
  `;

  const ParentStyle = css`
    min-width: 600px;
    max-height: 600px;
    @media screen and (max-width: 680px) {
      min-width: 300px;
    }
  `;

  const WrapperStyle = css`
    display: grid;
    justify-items: center;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;
  `;

  return (
    <>
      <Box css={ParentStyle}>
        <Box css={WrapperStyle}>
          <Button onClick={createKu_end} css={ReloadStyle}>
            リロード
          </Button>
          <Button onClick={createKu_middle} css={ReloadStyle}>
            リロード
          </Button>
          <Button onClick={createKu_first} css={ReloadStyle}>
            リロード
          </Button>
          <Box sx={{ marginTop: 22 }}>
            <p css={KuStyle}>{prop.ku_end}</p>
          </Box>
          <Box sx={{ marginTop: 10 }}>
            <p css={KuStyle}>{prop.ku_middle}</p>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <p css={KuStyle}>{prop.ku_top}</p>
          </Box>
        </Box>
      </Box>
    </>
  );
});

export default HaikuComponent;
