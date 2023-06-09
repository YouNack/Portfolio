import { Box, Button, Typography } from "@mui/material";
import { css, keyframes } from "@mui/styled-engine";
import { forwardRef, useImperativeHandle } from "react";

const DoitsuComponent = forwardRef<any, any>(function DoitsuComponent(
  prop: {
    setDoitsuTop: any;
    setDoitsuMiddle: any;
    setDoitsuEnd: any;
    doitsu_top: string;
    doitsu_middle: string;
    doitsu_end: string;
  },
  ref
) {
  const verb3 = require("../wordset/3文字verb").default;
  const norm3 = require("../wordset/3文字norm").default;
  const norm4 = require("../wordset/4文字norm").default;
  const norm5 = require("../wordset/5文字norm").default;
  const verb_ba2 = require("../wordset/2文字verb_ba").default;
  const verb_ba3 = require("../wordset/3文字verb_ba").default;

  const generateDoitsu_ba = (Zen: Array<string>, Go: Array<string>) => {
    return Zen[Math.floor(Math.random() * Zen.length)] + "ば" + Go[Math.floor(Math.random() * Go.length)];
  };

  const generateDoitsu_sugataha = (Zen: Array<string>, Go: Array<string>) => {
    return Zen[Math.floor(Math.random() * Zen.length)] + "姿は" + Go[Math.floor(Math.random() * Go.length)];
  };

  const createDoitsu_FirstAndSecond = (pos: number) => {
    let doitsu_tmp = "";
    let first = Math.floor(Math.random() * 101);
    if (first < 50) {
      if (pos === 1) {
        doitsu_tmp = generateDoitsu_ba(verb_ba2, norm4);
      } else {
        doitsu_tmp = generateDoitsu_ba(verb_ba2, norm3);
      }
    } else {
      doitsu_tmp = generateDoitsu_ba(verb_ba3, norm3);
    }
    if (pos === 1) {
      prop.setDoitsuTop(doitsu_tmp);
    } else {
      prop.setDoitsuMiddle(doitsu_tmp);
    }
  };

  const createDoitsu_end = () => {
    let doitsu_tmp = "";
    let end = Math.floor(Math.random() * 101);
    if (end < 50) {
      doitsu_tmp = generateDoitsu_sugataha(verb3, norm5);
    } else {
      doitsu_tmp = generateDoitsu_sugataha(verb3, norm5);
    }
    prop.setDoitsuEnd(doitsu_tmp);
  };
  const createDoitsu = () => {
    createDoitsu_FirstAndSecond(1);
    createDoitsu_FirstAndSecond(2);
    createDoitsu_end();
  };

  useImperativeHandle(ref, () => ({
    doitsu: () => {
      createDoitsu();
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
          <Button onClick={createDoitsu_end} css={ReloadStyle}>
            リロード
          </Button>
          <Button onClick={() => createDoitsu_FirstAndSecond(2)} css={ReloadStyle}>
            リロード
          </Button>
          <Button onClick={() => createDoitsu_FirstAndSecond(1)} css={ReloadStyle}>
            リロード
          </Button>
          <Box sx={{ marginTop: 22 }}>
            <p css={KuStyle}>{prop.doitsu_end}</p>
          </Box>
          <Box sx={{ marginTop: 10 }}>
            <p css={KuStyle}>{prop.doitsu_middle}</p>
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <p css={KuStyle}>{prop.doitsu_top}</p>
          </Box>
        </Box>
      </Box>
    </>
  );
});

export default DoitsuComponent;
