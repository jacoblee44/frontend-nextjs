import React from 'react';
import Head from "next/head";
import Logo from '@/static/images/logo_dayratework.png';

const ComingSoon = () => {
  return (
    <>
      <Head>
        <title>Coming soon - Dayratework</title>
      </Head>
      <div
        className="flex flex-col items-center justify-center h-screen overflow-auto lg:p-0 md:p-[50px] sm:p-[30px] p-[30px]">
        <div className="flex flex-col items-center justify-center lg:w-[827px] h-[auto] md:w-[100%]">
          <div className="mb-[84px]">
            <img className="w-[280px]" src={Logo?.src} alt="Dayratework" />
          </div>

          <div className="font-bold sm:text-[55px] text-[30px] mb-[55px] text-[#1B113F] text-center">
            Launching Soon
          </div>

          <div
            className="w-[100%] grid lg:gap-[87px] md:gap-[60px] sm:gap-[35px] gap-[20px] grid-cols-3 grid-rows-1 mb-[105px]">
            <div className="flex flex-row lg:gap-[28px] md:gap-[15px] sm:gap-[10px] gap-[7px]">
              <div
                className="flex bg-[#F05E00] lg:h-[160px] md:h-[140px] sm:h-[80px] rounded-[5px] flex-grow lg:text-[96px] md:text-[70px] sm:text-[40px] text-[40px] text-white justify-center items-center digital-number">3
              </div>

              <div
                className="flex bg-[#F05E00] lg:h-[160px] md:h-[140px] sm:h-[80px] rounded-[5px] flex-grow lg:text-[96px] md:text-[70px] sm:text-[40px] text-[40px] text-white justify-center items-center digital-number">3
              </div>
            </div>

            <div className="flex flex-row lg:gap-[28px] md:gap-[15px] sm:gap-[10px] gap-[7px]">
              <div
                className="flex bg-[#F05E00] lg:h-[160px] md:h-[140px] sm:h-[80px] rounded-[5px] flex-grow lg:text-[96px] md:text-[70px] sm:text-[40px] text-[40px] text-white justify-center items-center digital-number">3
              </div>

              <div
                className="flex bg-[#F05E00] lg:h-[160px] md:h-[140px] sm:h-[80px] rounded-[5px] flex-grow lg:text-[96px] md:text-[70px] sm:text-[40px] text-[40px] text-white justify-center items-center digital-number">3
              </div>
            </div>

            <div className="flex flex-row lg:gap-[28px] md:gap-[15px] sm:gap-[10px] gap-[7px]">
              <div
                className="flex bg-[#F05E00] lg:h-[160px] md:h-[140px] sm:h-[80px] rounded-[5px] flex-grow lg:text-[96px] md:text-[70px] sm:text-[40px] text-[40px] text-white justify-center items-center digital-number">3
              </div>

              <div
                className="flex bg-[#F05E00] lg:h-[160px] md:h-[140px] sm:h-[80px] rounded-[5px] flex-grow lg:text-[96px] md:text-[70px] sm:text-[40px] text-[40px] text-white justify-center items-center digital-number">3
              </div>
            </div>
          </div>

          <div className="w-[100%] flex flex-col justify-center items-center gap-[20px] mb-[38px]">
            <div className="text-[#7E7C7A] sm:text-[23px] text-[18px] text-center">We’ll let you know when we are
              Launching
            </div>
            <div className="flex flex-row w-[100%]">
              <input
                className="border-0 w-[100%] h-[65px] outline-0 bg-[#EFE9E9] text-black placeholder:text-[#666666] px-[20px] rounded-tl-[10px] rounded-bl-[10px]"
                placeholder="Email Address" />
              <div
                className="bg-[#1B113F] text-white text-[20px] flex justify-center items-center w-[200px] h-[65px] rounded-tr-[10px] rounded-br-[10px]">Notify
                Me
              </div>
            </div>
          </div>

          <div className="font-bold text-[#1B113F]">
            Already have an account?
            <a href="" className="text-[#F05E00]">Sign in</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
