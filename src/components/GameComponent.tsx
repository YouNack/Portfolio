import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import axios from "axios";
const db = "https://enybackend.fly.dev";
const createUser = db + "/handleUser/createUser";
const regScoreboard = db + "/handleScoreBoard/hayaoshi";
import { css } from "@mui/styled-engine";

const GameComponent = () => {
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  // ゲームが開始しているかどうか
  const [isPlay, setPlay] = useState(false);
  // ハイスコア
  const [hiscore, setHiscore] = useState(0);
  // ゲームの難易度（normal -> 矢印とWASD / hard -> 矢印と数字とQWERTY）
  const [difficulty, setDifficulty] = useState("normal");

  const normalKeys = ["↑", "↓", "←", "→", "W", "A", "S", "D"];
  const hardKeys = [
    "↑",
    "↓",
    "←",
    "→",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
  ];

  const CanvasStyle = css`
    background-color: rgb(255, 255, 255);
    margin: 4rem 0 0 0;
  `;

  const ParentStyle = css`
    text-align: center;
  `;

  const ScoreStyle = css`
    font-size: 1.4rem;
    color: white;
    @media screen and (max-width: 1400px) {
      font-size: 1.2rem;
    }
    @media screen and (max-width: 600px) {
      font-size: 1rem;
    }
  `;

  const DisplayBox = css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  `;

  const TitleTextStyle = css`
    font-size: 2.3rem;
    margin-bottom: 2rem;
  `;

  const HiscoreButton = css`
    font-size: 1.5rem;
  `;

  const setup = () => {
    return (
      <Box>
        <canvas width="720" height="720" css={CanvasStyle} id="canvas" />
        {!isPlay ? (
          <Box css={DisplayBox}>
            <Typography variant="h4" css={TitleTextStyle}>
              はやく押してはやく反応してゲーム
            </Typography>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                setDifficulty("normal");
                setPlay(true);
              }}
            >
              START
            </Button>
            {/* ハイスコアが一定以上でハードモードを出す */}
            {hiscore > 50 ? (
              <Button
                className="startButton_hard"
                variant="outlined"
                onClick={() => {
                  setDifficulty("hard");
                  setPlay(true);
                }}
              >
                HARD MODE
              </Button>
            ) : null}
            <Link href="/gamehiscore" css={HiscoreButton}>
              RANKING
            </Link>
          </Box>
        ) : null}
        <p css={ScoreStyle}>現在のハイスコア: {hiscore}</p>
        <span css={ScoreStyle}>
          表示されたキーを押すゲームです、シンプル！（WASDと矢印キーの8つのどれかが表示される）(※ゲームの仕様上キーボード限定です。注意)
          <br />
          {hiscore > -50 ? (
            <span css={ScoreStyle}>
              ハードモードはキーが多い（英数字＋矢印）代わりにスコア3倍！！（ゼロは出ませんのでそれはオーです）
            </span>
          ) : null}
        </span>
      </Box>
    );
  };

  // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録
  useEffect(() => {
    const canvas: HTMLCanvasElement = (document.getElementById("canvas") as HTMLCanvasElement) ?? null;
    const canvasContext = canvas.getContext("2d");
    setContext(canvasContext!);
    setHiscore(parseInt(localStorage.getItem("hiscore") ?? "0"));
  }, []);

  useEffect(() => {
    if (isPlay) {
      const hukidashi: HTMLImageElement = new Image();
      const hayaoshi: HTMLImageElement = new Image();
      let hukidashiLoaded = false;
      let hayaoshiLoaded = false;

      hukidashi.src = "/images/reverse_hukidashi_white_waku.png";
      hayaoshi.src = "/images/hayaoshi.png";

      hukidashi.onload = () => {
        hukidashiLoaded = true;
      };

      hayaoshi.onload = () => {
        hayaoshiLoaded = true;
      };

      let req: any;
      let frameCount = 0;
      let timer = 3600;
      let correctCount = 0;
      let countDown = 4;
      let maruDisplayTime = 0;
      let batsuDisplayTime = 0;
      let finishDisplayTime = 0;

      let target = "";

      const owari = () => {
        if (typeof window !== "undefined") {
          // windowやdocumentを使う処理を記述
          window.removeEventListener("keydown", handleKeyDown);
        }
        finishDisplayTime = frameCount + 120;
        if (difficulty === "hard") {
          correctCount *= 3;
        }
      };

      const handleKeyDown = (e: any) => {
        if (timer > 0) {
          let answer = e.key;
          if (e.key === "ArrowUp" || e.key === "Up") {
            answer = "↑";
          } else if (e.key === "ArrowLeft" || e.key === "Left") {
            answer = "←";
          } else if (e.key === "ArrowDown" || e.key === "Down") {
            answer = "↓";
          } else if (e.key === "ArrowRight" || e.key === "Right") {
            answer = "→";
          } else {
            answer = answer.toUpperCase();
          }

          if (answer === target) {
            correctCount++;
            if (difficulty === "hard") {
              target = hardKeys[Math.floor(Math.random() * hardKeys.length)];
            } else {
              target = normalKeys[Math.floor(Math.random() * normalKeys.length)];
            }
            // 正解したら〇、外れたら×を表示したい (0.5秒)
            maruDisplayTime = frameCount + 30;
          } else {
            batsuDisplayTime = frameCount + 30;
            timer -= 90;
            if (timer <= 0) {
              owari();
            }
          }
        }
      };
      // ここがdraw内
      const step = () => {
        if (frameCount > 1000000000000) {
          frameCount = 0;
          maruDisplayTime = 0;
          batsuDisplayTime = 0;
          finishDisplayTime = 0;
        }

        context?.clearRect(0, 0, 2000, 2000);
        if (countDown > 0) {
          context!.fillStyle = "#000";
          context!.font = "48px serif";
          context?.fillText(`${countDown}`, 360, 360);
          if (frameCount % 60 === 0) {
            countDown--;
          }
          if (countDown === 0) {
            if (typeof window !== "undefined") {
              // windowやdocumentを使う処理を記述
              window.addEventListener("keydown", handleKeyDown);
            }
            if (difficulty === "hard") {
              target = hardKeys[Math.floor(Math.random() * hardKeys.length)];
            } else {
              target = normalKeys[Math.floor(Math.random() * normalKeys.length)];
            }
          }
        } else {
          if (timer > 0) {
            if (hayaoshiLoaded) context?.drawImage(hayaoshi, -100, 50);
            if (hukidashiLoaded) context?.drawImage(hukidashi, 470, 310, 160, 200);

            context!.fillStyle = "#000";
            context!.font = "48px MSゴシック";
            context?.fillText(target, 530, 400);

            if (frameCount < maruDisplayTime) {
              drawMaru();
            }
            if (frameCount < batsuDisplayTime) {
              drawBatsu();
            }
            drawFrame();
            context!.fillText(`${correctCount}`, 195, 134);
            drawTime(timer);

            timer--;
            if (timer <= 0) {
              owari();
            }
          } else {
            if (hiscore < correctCount) {
              if (parseInt(localStorage.getItem("hiscore") ?? "0") != correctCount) {
                setHiscore(correctCount);
                sendDB(correctCount, difficulty);
                localStorage.setItem("hiscore", `${correctCount}`);
                localStorage.setItem("difficulty", difficulty);
              }
            }
            if (frameCount < finishDisplayTime) {
              context!.fillStyle = "#000";
              context!.font = "48px serif";
              context?.fillText("FINISH", 280, 360);
            } else {
              setPlay(false);
            }
          }
        }
        frameCount++;
        req = requestAnimationFrame(step);
      };

      req = requestAnimationFrame(step);
      return () => {
        cancelAnimationFrame(req);
      };
    }
  }, [isPlay]);

  async function sendDB(score: number, difficulty: string) {
    try {
      // ユーザ作成
      let resUser = await axios.post(createUser, {
        headers: { "Content-Type": "application/json" },
        reg_name: localStorage.getItem("user_name"),
        id: localStorage.getItem("user_id"),
        platform: "webPage",
      });

      let resScore = await axios.post(regScoreboard, {
        headers: { "Content-Type": "application/json" },
        reg_name: resUser.data.name,
        id: resUser.data.id,
        user_score: score,
        difficulty: difficulty,
      });

      if (resScore.data === "SUCCESS") {
        localStorage.setItem("user_name", resUser.data.name);
        localStorage.setItem("user_id", resUser.data.id);
      }
    } catch (e) {
      console.log("DB接続時エラー");
    }
  }

  function drawFrame() {
    context!.font = "28px Arial";
    context!.fillStyle = "#CCC";
    context?.fillRect(10, 10, 300, 150);
    context!.fillStyle = "#AAA";
    context?.fillRect(20, 20, 280, 130);
    context!.fillStyle = "#555";
    context?.fillRect(20, 65, 280, 40);
    context!.fillStyle = "#FFF";
    context!.font = "24px Arial";
    context?.fillText("せいかい", 25, 95);
    context?.fillText("回", 250, 135);
  }

  function drawTime(timer: number) {
    let s: string = `${Math.floor(timer / 3600)}`;
    let ms: string = (timer / 60).toFixed(0);
    let mms: string = (timer % 60).toFixed(0);
    if (parseFloat(s) / 10 < 1) {
      s = "0" + s;
    }
    if (parseFloat(ms) / 10 < 1) {
      ms = "0" + ms;
    }
    if (parseFloat(mms) / 10 < 1) {
      mms = "0" + mms;
    }
    context!.fillText(s + " : " + ms + " : " + mms, 97, 53);
  }

  function drawMaru() {
    context?.beginPath();
    context?.arc(480, 300, 40, (0 * Math.PI) / 180, (360 * Math.PI) / 180, false);
    context!.strokeStyle = "red";
    context!.lineWidth = 8;
    context?.stroke();
  }

  function drawBatsu() {
    context?.beginPath();
    context?.moveTo(400, 300);
    context?.lineTo(480, 380);
    context?.moveTo(400, 380);
    context?.lineTo(480, 300);
    context?.closePath();
    context!.strokeStyle = "blue";
    context!.lineWidth = 8;
    context?.stroke();
  }

  return <Box css={ParentStyle}>{setup()}</Box>;
};

export default GameComponent;
