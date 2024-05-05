import React, { useEffect } from "react";
import { NftVideo } from "./NftVideo";
import { fadeOutIsland1, playSoundIsland1} from "@/sounds";

export type ApeRockProps = React.ComponentPropsWithoutRef<"div">;

export function Ticket({ ...props }: ApeRockProps) {
  
  const hasClaimed = true;

  // play sound on load
  useEffect(() => {
    setTimeout(() => playSoundIsland1(), 600);
    return () => fadeOutIsland1();
  }, []);

  return (
    <div {...props}>

      <NftVideo type={0} active={(!!hasClaimed)} />
    </div>
  );
}