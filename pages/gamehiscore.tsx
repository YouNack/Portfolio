import React, { useState, useEffect } from "react";
import DrawerAppBar from "../src/components/NavBar";
import { Card, Button, Table, Grid, Typography, CardContent, Divider, Box, TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Watch } from "react-loader-spinner";
import { css } from "@mui/styled-engine";
import Image from "next/image";
import axios from "axios";

const db = "https://enybackend.fly.dev";
const updateUser_url = db + "/handleUser/updateUserName";
const getScoreboard_url = db + "/handleScoreBoard/getscoreboard";

function GameHiscorepage() {
  const [scoreBoard, setScoreBoard] = useState([]);
  const [inputUserName, setUserName] = useState("");

  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [hiscore, setHiscore] = useState("");

  const [loadingBoard, setLoadingBoard] = useState(false);
  const [upLoading, setUploading] = useState(false);

  const Background = css`
    opacity: 0.1;
    object-fit: cover;
  `;

  const rootArea = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    gap: 100px;
  `;

  const CardStyle = css`
    width: 650px;
    height: 700px;
    margin: 3rem auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #041526;
    color: #ffffffcc;
    @media screen and (max-width: 1100px) {
      width: 300px;
    }
    @media screen and (max-width: 600px) {
      width: 200px;
    }
  `;
  const CardContentStyle = css`
    position: relative;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 82%;
    gap: 1rem;
    align-items: center;
  `;

  const HiscoreStyle = css`
    font-size: 1.6rem;
    font-family: Yuji Boku, serif;
    margin: 0 0 20px 0;
  `;

  const LoaderStyle = css`
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 1;
  `;

  const TableStyle = css`
    width: 100%;
    min-height: 400px;
  `;

  const InputGroupStyle = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    gap: 20px;
  `;

  const TextFieldStyle = {
    "& .MuiInputBase-input": {
      color: "#4ee2b1", // 入力文字の色
    },
    "& label": {
      color: "#e5e5e5", // 通常時のラベル色
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#e5e5e5", // 通常時のボーダー色
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "#4ee2b1", // ホバー時のボーダー色
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#e5e5e5", // 通常時のボーダー色(アウトライン)
      },
      "&:hover fieldset": {
        borderColor: "#4ee2b1", // ホバー時のボーダー色(アウトライン)
      },
    },
  };

  function displayScore() {
    return scoreBoard.map((line: any, i: any) => (
      <tr key={i}>
        <td align="right">{line.rank}</td>
        <td align="right">{line.user_name}</td>
        <td align="right">{line.score_hayaoshi}</td>
        <td align="right">{line.difficulty}</td>
      </tr>
    ));
  }

  function sanitize(string: string) {
    return string
      .replace(/&/g, "&lt;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");
  }

  function getScoreBoard() {
    setLoadingBoard(true);
    axios
      .post(getScoreboard_url, { headers: { "Content-Type": "text/plain" } })
      .then((res) => {
        setScoreBoard(res.data);
        setLoadingBoard(false);
      })
      .catch((e) => {
        console.log(e);
        console.log("エラーなう");
      });
  }

  async function updateUserName() {
    setUploading(true);

    let resUser = await axios.post(updateUser_url, {
      headers: { "Content-Type": "application/json" },
      reg_name: inputUserName,
      id: localStorage.getItem("user_id"),
      platform: "webPage",
    });

    if (resUser.data.state === "SUCCESS") {
      localStorage.setItem("user_name", resUser.data.name);
      getScoreBoard();
      toast.success("更新されました");
    } else {
      toast.error("何か失敗したらしい");
    }
    setUploading(false);
  }

  // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録
  useEffect(() => {
    setName(localStorage.getItem("user_name") ?? "");
    setDifficulty(localStorage.getItem("difficulty") ?? "");
    setHiscore(localStorage.getItem("hiscore") ?? "");
    getScoreBoard();
    try {
      localStorage.setItem("test", "ブラウザチェック");
    } catch (e) {
      toast.error("プライベートモードのため一部ブラウザでは動作しないかもしれないです（Choromeは動く）");
    }
  }, []);

  return (
    <>
      <Image src="/images/bgptn.jpg" alt="BgImg" fill css={Background} />
      <DrawerAppBar></DrawerAppBar>
      <Toaster></Toaster>
      <Box css={rootArea}>
        <Card css={CardStyle}>
          <CardContent css={CardContentStyle}>
            {upLoading ? (
              <Box css={LoaderStyle}>
                <Watch color="#0ead69" height="100" width="110" />
              </Box>
            ) : null}
            <Typography variant="h4" className="id_card_title">
              あなたの名前を登録する
            </Typography>
            <Divider />
            <Box className="id_card_content">
              <Typography variant="h5" css={HiscoreStyle}>
                ハイスコア: {hiscore}
              </Typography>
              <Typography variant="h5" css={HiscoreStyle}>
                難易度: {difficulty}
              </Typography>

              <Box css={InputGroupStyle}>
                <TextField
                  placeholder={"現在の名：" + name}
                  aria-label="Username"
                  label="ユーザー名を登録する"
                  aria-describedby="basic-addon1"
                  color="primary"
                  variant="standard"
                  sx={TextFieldStyle}
                  onChange={(event: any) => {
                    setUserName(sanitize(event.target.value));
                  }}
                />
                {parseInt(hiscore) > 0 && inputUserName.length > 0 ? (
                  <Button
                    className="id_card_inputGroup_Button"
                    variant="outlined"
                    size="large"
                    sx={{ fontFamily: "Yuji Boku, serif", height: "57px" }}
                    onClick={updateUserName}
                  >
                    登録
                  </Button>
                ) : null}
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card css={CardStyle}>
          <CardContent css={CardContentStyle}>
            {loadingBoard ? (
              <Box css={LoaderStyle}>
                <Watch color="#0ead69" height="100" width="110" />
              </Box>
            ) : null}
            <Typography variant="h4" className="id_card_title">
              Score Voodoo
            </Typography>
            <Divider />
            <Box css={TableStyle}>
              <Table>
                <thead>
                  <tr>
                    <th>順位</th>
                    <th>ユーザ名</th>
                    <th>スコア</th>
                    <th>難易度</th>
                  </tr>
                </thead>
                <tbody>{scoreBoard?.length > 0 ? displayScore() : null}</tbody>
              </Table>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default GameHiscorepage;
