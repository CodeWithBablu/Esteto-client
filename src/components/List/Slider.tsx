import '../../styles/ui/slider.scss'

import { ChevronDoubleUpIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useState } from 'react';

export default function Slider({ images }: { images: string[] }) {

  const [currImage, setCurrImage] = useState(-1);

  const changeSlide = (direction: string) => {
    direction == 'left' ? setCurrImage(prev => (prev > 0 ? prev - 1 : prev)) : setCurrImage(prev => (prev < images.length - 1 ? prev + 1 : prev));

  }

  return (
    <div className="slider h-max sm:h-[350px] flex flex-col sm:flex-row">

      {currImage !== -1 && (
        <div className='fullSlider flex items-center bg-gradient-radial from-indigo-900 backdrop-blur-2xl'>

          <div className=' flex justify-center items-center flex-1'>
            <ChevronLeftIcon onClick={() => changeSlide("left")} className={clsx(
              'arrow w-10 h-10 md:w-20 md:h-20 cursor-pointer',
              { 'opacity-30 pointer-events-none': currImage <= 0 }
            )} />
          </div>

          <div className='imgContainer p-2 md:py-10 rounded-xl flex-[10] h-max md:h-screen'>
            <img className='object-cover' src={images[currImage]} alt="preview" />
          </div>

          <div className=' flex justify-center items-center flex-1'>
            <ChevronRightIcon onClick={() => changeSlide("right")} className={clsx(
              'arrow w-10 h-10 sm:w-20 sm:h-20 cursor-pointer',
              { 'opacity-30 pointer-events-none': currImage >= (images.length - 1) }
            )} />
          </div>

          <XMarkIcon onClick={() => setCurrImage(-1)} className='absolute right-5 top-5 w-10 h-10 transition-all duration-300 ease-linear hover:scale-110 cursor-pointer' />

        </div>
      )}

      <div className="bigImage">
        <img src={images[0]} alt="preview" onClick={() => setCurrImage(0)} />
      </div>

      <div className="smallImages flex items-center sm:justify-center relative h-full">

        <div className={clsx(
          'flex flex-row sm:flex-col relative gap-5 overflow-scroll no-scrollbar',
          {
            'w-[90%] sm:w-full sm:h-80': (images.length > 3),
            'w-[90%] sm:w-full md:h-full': images && images.length <= 4,
          },
        )}>
          {images.slice(1).map((image, index) => (
            <img className='w- h-[50px] sm:min-w-[150px]' key={index} src={image} alt="preview" onClick={() => setCurrImage(index + 1)} />
          ))
          }
          <img src={images[0]} alt="preview" onClick={() => setCurrImage(0)} />
          <img src={images[0]} alt="preview" onClick={() => setCurrImage(0)} />
          <img src={images[0]} alt="preview" onClick={() => setCurrImage(0)} />

        </div>


        <div className={clsx(
          'absolute right-0 sm:right-auto sm:bottom-0 rotate-90 w-20 sm:rotate-0 sm:w-fit  bg-gradient-radial font-semibold from-blue-600 text-gray-200 backdrop-blur-2xl p-2 rounded-md flex items-center justify-center gap-3',
          {
            'hidden': images.length <= 3,
            'block': images.length > 3,
          }
        )}>
          <ChevronDoubleUpIcon className='w-6 animate-bounce ease-linear' />
          <span className='hidden sm:inline-block'>scroll up</span>
        </div>

      </div>


    </div>
  );
}