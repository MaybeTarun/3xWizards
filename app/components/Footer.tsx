import React from 'react';
import { BorderBeam } from "@/components/ui/border-beam";

const Footer = () => {
    return (
        <div className="flex flex-col  items-center mt-[10vh] mb-[10vh]">
            <div className="relative  flex h-[30vh] w-[90%] max-w-[1200px] flex-col items-center justify-center overflow-hidden rounded-lg border bg-gray-900 p-4 md:h-[40vh] md:p-8 md:shadow-xl">
                <span className="pointer-events-none whitespace-pre-wrap  bg-gradient-to-b from-white to-gray-900 bg-clip-text text-center text-lg font-medium leading-snug text-transparent sm:text-xl md:text-3xl lg:text-4xl dark:from-white dark:to-slate-900/10">
                    We are providing loans in crypto, join us...
                </span>
                <BorderBeam size={150} duration={12} delay={9} className="mt-4 sm:mt-6 md:mt-8"/>
            </div>
        </div>
    );
};

export default Footer;
