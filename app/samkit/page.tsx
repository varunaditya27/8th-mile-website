'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';

export default function HomePage() {

    return (
        <>
            <div className="w-full ">

                {/* Section 1 */}
                <section className="sticky top-0 thick-waves-bg h-screen flex items-center justify-center text-4xl font-bold">
                    <div className="absolute top-8 z-10 seasons text-[120px] md:text-[190px] max-[1024px]:text-[150px] text-black">
                        ASHTRANGA
                    </div>

                    <div className='absolute top-55 sora font-extrabold text-black left-60'>4<sup>TH</sup>, 5<sup>TH</sup> & 6<sup>TH</sup><br />DECEMBER, 2025</div>
                    <img src="/collage.svg" alt="" className='absolute -bottom-40 flex z-20' />
                </section>

                {/* Section 2 */}
                <section className="sticky top-0 h-screen squiggly-bg flex items-center justify-center text-4xl font-bold overflow-hidden">

                    {/* Yellow Star stays inside this section */}
                    <img
                        src="/shape_star.svg"
                        alt="star"
                        className="absolute bottom-0 -right-90 animate-spin"
                        style={{ animationDuration: '12s' }}
                    />

                    {/* RVCE Layer */}
                    <img
                        src="/college.svg"
                        alt=""
                        className="w-full z-10"
                    />

                    <div className="absolute z-20 top-4 left-4 w-1/3 text-right">
                        <p className="sora font-extrabold text-black text-[144px]">ABOUT</p>
                        <p className="seasons text-black text-[144px] -my-8">RVCE</p>
                        <p className="text-base sora text-gray-800 mt-10">
                            RV College of Engineering participated in the Rising Bharat Summit 2025,
                            which was organised by CNN News18. During an interactive session with
                            Hon’ble Prime Minister Shri Narendra Modi, our students presented their
                            ideas, receiving a lot of praises.
                        </p>
                    </div>

                </section>


                {/* Section 3 */}
                <section className="relative h-screen w-full squiggly-bg flex items-center justify-between overflow-hidden">

                    {/* Background yellow shape */}
                    <img
                        src="/shape_flow.svg"
                        alt="background-shape"
                        className="absolute -left-150 scale-150 top-60 h-full w-auto object-cover z-0"
                    />
                    0
                    {/* KK image (big, left aligned) */}
                    <img
                        src="/kk.svg"
                        alt="KK"
                        className="scale-75 absolute -left-40 -bottom-150 z-10"
                    />

                    {/* Right side text */}
                    <div className="absolute z-20 top-10 right-12 w-[45%]">
                        <p className="sora font-extrabold text-black text-[120px] md:text-[144px] leading-none">
                            ABOUT
                        </p>

                        <p className="seasons text-black text-[120px] md:text-[144px] leading-none mt-4">
                            8<sup>TH</sup> MILE
                        </p>

                        <p className="sora text-gray-800 mt-16 leading-relaxed">
                            RV College of Engineering participated in the Rising Bharat Summit 2025,
                            which was organised by CNN News18. During an interactive session with
                            Hon’ble Prime Minister Shri Narendra Modi, our students presented their
                            ideas, receiving appreciation and a personal invitation to share a
                            detailed implementation plan. RVCE was represented by a team of three
                            students from the B.E. Artificial Intelligence and Machine Learning
                            (AIML) Department, guided by Dr. B. Sathish Babu and mentored by
                            Dr. K.N. Subramanya, the Principal of RVCE.
                        </p>
                    </div>
                </section>


                {/* Section 4 */}
                <section className="sticky bg-white top-0 h-screen pink-grid-bg flex items-center justify-center text-4xl font-bold">
                    <div className="text-[#fc03a8] text-[150px] seasons top-8 left-8 absolute tracking-tight">
                        SOCIALS
                    </div>

                    {/* Top-right star */}
                    <img
                        src="/star.svg"
                        alt=""
                        className="absolute top-0 right-0 scale-50 transform origin-top-right block"
                    />

                    {/* Bottom-left star */}
                    <img
                        src="/star.svg"
                        alt=""
                        className="absolute bottom-0 left-0 scale-50 transform origin-bottom-left block"
                    />

                    <img src="/cards.svg" alt="" className="scale-75 mt-16" />
                </section>


                {/* Section 5 */}
                <section className="sticky top-0 h-screen bg-purple-400 flex items-center justify-center text-4xl font-bold">
                    Section 5
                </section>

            </div>
        </>
    );
}
