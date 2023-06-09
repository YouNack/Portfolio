import { css } from "@emotion/react";

export const global_style = css`
  html,
  body {
    height: 100%;
    padding: 0;
    margin: 0;
    background: radial-gradient(circle, rgba(4, 17, 30, 1) 10%, rgba(2, 10, 20, 1) 35%, rgba(1, 7, 12, 1) 72%);
    background-size: 800% 800%;
    animation: GradientBackground 30s ease infinite;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
      Helvetica Neue, sans-serif;
  }
  @keyframes GradientBackground {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  } ;
`;
