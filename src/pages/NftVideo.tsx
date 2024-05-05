import StarsCanvas from "@/canvas/mars_cover";
import { BaseBtn } from "@/components/base/BaseBtn";
import { BaseFlipper } from "@/components/base/BaseFlipper";
import { BaseIcon } from "@/components/base/BaseIcon";
import { useEffect, useState } from "react";

export type NftVideoProps = React.ComponentPropsWithoutRef<"div"> & {
  type: number;
  active: boolean;
};

export function NftVideo({ className, type, active }: NftVideoProps) {
  const [gif, setGif] = useState("");
  const [playFlipper, setPlayFlipper] = useState(true);

  useEffect(() => {
    if (type === 0) {
      setGif("/images/ticket.gif");
    } else if (type === 1) {
      setGif("/images/ticket.giff");
    } else if (type === 2) {
      setGif("/images/ticket.gif");
    } else if (type === 3) {
      setGif("/images/ticket.gif");
    }
  }, [type]);

  return (

    <div className={`pointer-events-none relative z-10  ${className}`}>
      <StarsCanvas />
      <div className="flex justify-center">
        <div className={`flex w-full max-w-[1140px] flex-wrap justify-between px-24 xxl:max-w-[900px] l:max-w-[500px]}`}>
          <div className="l:mt-24 l:w-full s:col-span-2 s:mt-0">
            <div className="flex gap-4 xxl:gap-2">
              <BaseFlipper className="l:!w-1/4" play={playFlipper} offset={1.7}>
                B
              </BaseFlipper>
              <BaseFlipper className="l:!w-1/4" play={playFlipper} offset={1.8}>
                E
              </BaseFlipper>
              <BaseFlipper className="l:!w-1/4" play={playFlipper} offset={1.9}>
                T
              </BaseFlipper>
            </div>
          </div>
        </div>
      </div>

      {gif && (
        <img
          className="relative z-20 w-[50%] mx-auto max-w-none object-cover transition-all"
          style={{
            filter: active
              ? `drop-shadow(0px 2px 16px #4dce19) ${type === 3 ? "brightness(1.1)" : ""} contrast(1.25)`
              : `${type === 3 ? "brightness(1.1)" : ""} contrast(1.25)`,
            height: "150%", // Increase size
            padding: 0, // Set padding to zero
          }}
          src={gif}
          alt={`NFT ${type}`}
        />

      )}
      <div className={`mx-auto flex w-full max-w-[1140px] flex-wrap justify-between px-24 xxl:max-w-[900px] l:max-w-[500px]}`}>
        <div className="mb-56 flex w-full flex-wrap justify-between l:mb-32 s:grid s:grid-cols-2 s:gap-16">
          <div className="flex gap-4 xxl:gap-2 s:grid s:grid-cols-4">
            <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.1}>
              C
            </BaseFlipper>
            <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.2}>
              O
            </BaseFlipper>
            <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.3}>
              M
            </BaseFlipper>
            <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.1}>
              P
            </BaseFlipper>
            <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.2}>
              L
            </BaseFlipper>
            <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.3}>
              E
            </BaseFlipper>
            <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.3}>
              T
            </BaseFlipper>
            <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.3}>
              E
            </BaseFlipper>
            <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.3}>
              D
            </BaseFlipper>
          </div>
        </div>
        <div className="w-full">
          <BaseBtn className="mx-auto s:w-full" onClick={() => { }} size="large" variant="glow">
            Return to home
            <BaseIcon name="arrow-right-fill" className="ml-8" width="32px" height="32px" />
          </BaseBtn>

          <p className="mt-16 hidden text-center text-14 l:block xxs:text-12">
            *for the best experience, please view on a larger display
          </p>
        </div>
      </div>
    </div>

  );
}
