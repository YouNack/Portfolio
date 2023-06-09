import { useRive } from "@rive-app/react-canvas";
import { Box } from "@mui/material";
import { css } from "@mui/styled-engine";

export default function Particle() {
  return (
    <>
      <Particle1 />
      <Particle2 />
      <Particle3 />
      <Particle4 />
    </>
  );
}

export function Particle1() {
  const { RiveComponent } = useRive({
    src: "/images/particle.riv",
    autoplay: true,
  });

  const Particle1Style = css`
    position: absolute;
    left: 10%;
    top: 10%;
  `;

  return (
    <Box css={Particle1Style} sx={{ width: "50px", height: "50px" }}>
      <RiveComponent />
    </Box>
  );
}

export function Particle2() {
  const { RiveComponent } = useRive({
    src: "/images/particle.riv",
    autoplay: true,
  });

  const Particle2Style = css`
    position: absolute;
    right: 10%;
    top: 20%;
    transform: scale(-1, 1);
  `;

  return (
    <Box css={Particle2Style} sx={{ width: "60px", height: "60px" }}>
      <RiveComponent />
    </Box>
  );
}

export function Particle3() {
  const { RiveComponent } = useRive({
    src: "/images/particle.riv",
    autoplay: true,
  });

  const Particle3Style = css`
    position: absolute;
    left: 10%;
    bottom: 20%;
    transform: scale(1, -1);
  `;

  return (
    <Box css={Particle3Style} sx={{ width: "60px", height: "60px" }}>
      <RiveComponent />
    </Box>
  );
}

export function Particle4() {
  const { RiveComponent } = useRive({
    src: "/images/particle.riv",
    autoplay: true,
  });

  const Particle4Style = css`
    position: absolute;
    right: 10%;
    bottom: 10%;
    transform: scale(-1, -1);
  `;

  return (
    <Box css={Particle4Style} sx={{ width: "50px", height: "50px" }}>
      <RiveComponent />
    </Box>
  );
}
