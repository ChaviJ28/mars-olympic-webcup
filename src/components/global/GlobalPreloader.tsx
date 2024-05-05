import clsx from "clsx";
import gsap from "gsap";
import { useRef, useState, useEffect, Dispatch, SetStateAction } from "react";

import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';

import { BaseBtn } from "../base/BaseBtn";
import { BaseFlipper } from "../base/BaseFlipper";
import { BaseIcon } from "../base/BaseIcon";
import styles from "../styles/global/GlobalPreloader.module.css";
import { createCamera } from "../../three/preloader/camera";
import { createClouds, transitionClouds, removeClouds } from "../../three/preloader/clouds";
import { createEvents, removeEvents } from "../../three/preloader/events";
import { createLights } from "../../three/preloader/lights";
import { createPlane, revealPlane, transitionPlane, removePlane } from "../../three/preloader/plane";
import { createPreloader, hidePreloader } from "../../three/preloader/preloader";
import { createRenderer, removeRenderer } from "../../three/preloader/renderer";
import { createScene } from "../../three/preloader/scene";
import { createTick, removeTick } from "../../three/preloader/tick";
import StarsCanvas from "@/canvas/Stars";
import { muteAllSounds, playSoundUiClick } from "@/sounds";

export function GlobalPreloader({ onAnimComplete }: { onAnimComplete: Dispatch<SetStateAction<boolean>> }) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const spinner = useRef<HTMLDivElement>(null);
  const track = useRef(null);
  const intro = useRef(null);
  let btnText = "Join the Mars Betting Club"
  let loggedIn = false;
  const [showLoginComponent, setShowLoginComponent] = useState(false);
  const [formType, setFormType] = useState('login');

  const toggleFormType = () => {
    setFormType(formType === 'login' ? 'register' : 'login');
  };

  const handleButtonClick = () => {
    if (loggedIn) {
      mapTransition();
    } else {
      setShowLoginComponent(true);
    }
  };

  type FieldType = {
    username?: string;
    password?: string;
  };

  const handleLogin = async (values: any) => {
    console.log(values);
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.username,
        password: values.password,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      console.error(result.message)
    }

    localStorage.setItem("jwt", result.data.jwt);
    loggedIn = true;
    mapTransition();
  };

  const handleRegister = async (values: any) => {
    console.log(values);
    const response = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      console.error(result.message)
    }

    localStorage.setItem("jwt", result.data.jwt);
    loggedIn = true;
    mapTransition();
  };

  const onFinish = (values: any) => {
    if (formType === 'login') {
      handleLogin(values);
    } else {
      handleRegister(values);
    }
  };
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [playFlipper, setPlayFlipper] = useState(false);

  const removeExperience = () => {
    removeClouds();
    removePlane();
    removeEvents();
    removeTick();
    removeRenderer();
  };

  useEffect(() => {
    if (loggedIn) {
      btnText = "Fly To Olympic 2092"
    }
  }, [localStorage, loggedIn])

  useEffect(() => {
    let tl: gsap.core.Timeline;
    const spinnerAnim = () => {
      tl = gsap.timeline({
        delay: 2,
        onComplete: () => {
          hidePreloader();
          revealPlane();
          gsap.to(intro.current, { delay: 2, duration: 0.5, autoAlpha: 1 });
          tl.kill();
          setPlayFlipper(true);
        },
      });

      tl.to(track.current, { duration: 0.6, yPercent: -33.333 });
      tl.to(track.current, { delay: 1, yPercent: -66.666 });
      tl.to(track.current, { delay: 0.6, yPercent: -70.666 });
    };
    const createExperience = async () => {
      // run three.js
      createScene();
      createCamera();
      createRenderer(canvas.current || document.createElement("canvas"));
      createEvents();
      createTick();

      createPreloader(spinner.current || document.createElement("div"));
      createLights();
      createClouds();
      await createPlane();

      spinnerAnim();
    };

    createExperience();

    return () => {
      removeExperience();
    };
  }, []);
  const mapTransition = () => {
    gsap.to(intro.current, { duration: 0.5, autoAlpha: 0 });
    muteAllSounds(false);
    playSoundUiClick();
    transitionPlane();
    transitionClouds(root.current || document.createElement("div"));
    setTimeout(() => {
      onAnimComplete(true);
      removeExperience();
      // sessionStorage.setItem("beenBefore", "true");
    }, 4000);
  };

  return (
    <>
      <section ref={root} className={clsx("fixed top-0 z-[110] size-full bg-[url('/images/preloader/space.webp')]", styles.globalPreloader)}>
        <StarsCanvas />
        {/* <section className={` ${showLoginComponent ? 'blur-gray' : ''}`}> */}

        <div ref={spinner} className={`absolute top-0 z-20 grid size-full place-items-center bg-[url('/images/preloader/space.webp')]`}>
          <div className="relative z-30 flex flex-wrap justify-center">
            <div className="relative">
              <img className="w-280" src="/images/preloader/mars.png" />
              <img
                className={clsx("xy-center absolute size-300 max-w-none", styles.globalPreloader__loader)}
                src="/images/preloader/rocket.png" />
            </div>
            <div className="absolute top-360 h-24 w-400 overflow-hidden text-center">
              <div ref={track} className="font-lores uppercase tracking-tighter text-white">
                <p>This is your captain speaking...</p>
                <p>Welcome aboard the Olympic Space Shuttle!</p>
                <p>We've just departed from Earth...</p>
              </div>
            </div>
          </div>
        </div><div
          ref={intro}
          className="absolute top-0 z-20 grid size-full content-between pb-120 pt-32 opacity-0 l:pb-56 s:pb-40 h-l:pb-56"
        >

          <img className="mx-auto" src="/images/olympic-logo.png" alt="Lingo logo" width="118" height="32" />

          <a href="https://bff.ecoindex.fr/redirect/?url=https://debugthugs20.maurice.webcup.hodi.host/" style={{ position: "absolute", top: "1rem", right: "1rem" }} target="_blank">
            <img src="https://bff.ecoindex.fr/badge/?theme=dark&url=https://debugthugs20.maurice.webcup.hodi.host" alt="Ecoindex Badge" />
          </a>

          {showLoginComponent ? (

            <div className="flex justify-center items-center bg-gray-200 pt-8 pr-8 z-10" style={{ height: "50vh" }}>
              <div className="backdrop-filter bg-black backdrop-blur-lg bg-opacity-75 p-24 rounded-lg shadow-xxl w-[365px]">
                <h2 className="text-8xl text-center mb-8 text-white" style={{ fontSize: '1.5rem', fontWeight: '500' }}>{formType === 'login' ? 'Login' : 'Register'}</h2>
                <Form
                  name="basic"
                  style={{ maxWidth: 600, margin: 'auto' }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  layout="vertical"
                >
                  <Form.Item
                    className="text-black rounded-md"
                    label="name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input />
                  </Form.Item>

                  {formType === 'register' && (
                    <Form.Item
                      className="text-black rounded-md"
                      label="Email"
                      name="email"
                      rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                    >
                      <Input />
                    </Form.Item>
                  )}

                  <Form.Item
                    className="text-black rounded-md"
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password />
                  </Form.Item>

                  {formType === 'register' && (
                    <Form.Item
                      className="text-black rounded-md"
                      label="Confirm Password"
                      name="confirmPassword"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                  )}
                  <Form.Item className="m-auto text-center w-full">
                    <Button type="primary" className="w-full" htmlType="submit">
                      {formType === 'login' ? 'Login' : 'Register'}
                    </Button>
                  </Form.Item>
                  <Form.Item className="m-auto text-center w-full mt-[1rem]">
                    <Button type="link" onClick={toggleFormType}>
                      {formType === 'login' ? 'Need an account? Register' : 'Already have an account? Login'}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>

          ) : (
            <span></span>
          )}

          <div className={`mx-auto flex w-full max-w-[1140px] flex-wrap justify-between px-24 xxl:max-w-[900px] l:max-w-[500px] ${showLoginComponent ? 'blur-gray' : ''}`}>
            <div className="mb-56 flex w-full flex-wrap justify-between l:mb-32 s:grid s:grid-cols-2 s:gap-16">
              <div>
                <div className="flex gap-4 xxl:gap-2 s:grid s:grid-cols-4">
                  <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.1}>
                    W
                  </BaseFlipper>
                  <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.2}>
                    E
                  </BaseFlipper>
                  <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.3}>
                    L
                  </BaseFlipper>
                  <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.1}>
                    C
                  </BaseFlipper>
                  <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.2}>
                    O
                  </BaseFlipper>
                  <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.3}>
                    M
                  </BaseFlipper>
                  <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.3}>
                    E
                  </BaseFlipper>
                </div>
              </div>
              <div>
                <div className="flex gap-4 xxl:gap-2 s:grid s:grid-cols-5">
                  <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.8}>
                    T
                  </BaseFlipper>
                  <BaseFlipper className="s:w-auto" play={playFlipper} offset={0.9}>
                    O
                  </BaseFlipper>
                </div>
              </div>
              <div className="l:mt-24 l:w-full s:col-span-2 s:mt-0">
                <div className="flex gap-4 xxl:gap-2">
                  <BaseFlipper className="l:!w-1/4" play={playFlipper} offset={1.7}>
                    M
                  </BaseFlipper>
                  <BaseFlipper className="l:!w-1/4" play={playFlipper} offset={1.8}>
                    A
                  </BaseFlipper>
                  <BaseFlipper className="l:!w-1/4" play={playFlipper} offset={1.9}>
                    R
                  </BaseFlipper>
                  <BaseFlipper className="l:!w-1/4" play={playFlipper} offset={2.0}>
                    S
                  </BaseFlipper>
                </div>
              </div>
            </div>

            <div className="w-full">
              <BaseBtn className="mx-auto s:w-full" onClick={handleButtonClick} size="large" variant="glow">
                {btnText}
                <BaseIcon name="arrow-right-fill" className="ml-8" width="32px" height="32px" />
              </BaseBtn>

              <p className="mt-16 hidden text-center text-14 l:block xxs:text-12">
                *for the best experience, please view on a larger display
              </p>
            </div>
          </div>
        </div><canvas ref={canvas} className="absolute inset-0 z-10" />
      </section>
    </>
  );
}

