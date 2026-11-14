import React from "react";
import { Composition } from "remotion";
import { OmniSurgeDemo } from "./OmniSurgeDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OmniSurgeDemo"
        component={OmniSurgeDemo}
        durationInFrames={330}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
