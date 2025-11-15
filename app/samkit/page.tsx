'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';

export default function HomePage() {

    return (
        <>
            <div className="w-full">

                {/* Section 1 */}
                <section className="sticky top-0 h-screen orange-glider-bg flex items-center justify-center text-4xl font-bold">

                </section>

                {/* Section 2 */}
                <section className="sticky top-0 h-screen squiggly-bg flex items-center justify-center text-4xl font-bold relative overflow-hidden">

                    {/* Yellow Star stays inside this section */}
                    <img
                        src="/yellow-star.png"
                        alt="star"
                        className="absolute bottom-20 right-28 scale-[3.3] animate-spin"
                        style={{ animationDuration: '12s' }}
                    />

                    {/* RVCE Layer */}
                    <img
                        src="/rvce-layer.png"
                        alt=""
                        className="w-full z-10"
                    />

                    <div className='absolute z-20  top-4 left-4 w-1/3'>
                        <p className='sora font-extrabold text-black text-[144px]'>ABOUT</p>
                        <p className='seasons text-black text-[144px] -my-8'>RVCE</p>
                        <p className='text-base text-gray-800 mt-20'>RV College of Engineering participated in the Rising Bharat Summit 2025, which was organised by CNN News18. During an interactive session with Hon’ble Prime Minister Shri Narendra Modi, our students presented their ideas, receiving a lot of praises.</p>
                    </div>
                </section>


                {/* Section 3 */}
                <section className="sticky top-0 h-screen squiggly-bg flex items-center justify-center text-4xl font-bold">

                    <div className='absolute z-20  top-4 right-8 w-2/5'>
                        <p className='sora font-extrabold text-black text-[144px]'>ABOUT</p>
                        <p className='seasons text-black text-[144px]'>8<sup>TH</sup> MILE</p>
                        <p className='text-base text-gray-800 mt-20'>RV College of Engineering participated in the Rising Bharat Summit 2025, which was organised by CNN News18. During an interactive session with Hon’ble Prime Minister Shri Narendra Modi, our students presented their ideas, receiving appreciation and a personal invitation to share a detailed implementation plan. RVCE was represented by a team of three students from the B.E. Artificial Intelligence and Machine Learning (AIML) Department, guided by Dr. B. Sathish Babu, Head of the Department also mentored by Dr. K.N. Subramanya, the Principal of RVCE.</p>
                    </div>
                </section>

                {/* Section 4 */}
                <section className="sticky top-0 h-screen bg-yellow-400 flex items-center justify-center text-4xl font-bold">
                    Section 4
                </section>

                {/* Section 5 */}
                <section className="sticky top-0 h-screen bg-purple-400 flex items-center justify-center text-4xl font-bold">
                    Section 5
                </section>

            </div>
        </>
    );
}
