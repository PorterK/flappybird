import React from 'react';

import { useRecoilValue } from 'recoil';

import birdState from '../atoms/bird';

import './index.css'

export default function Bird() {
  const bird = useRecoilValue(birdState);

  return (
    <div className={`bird ${bird.animation}`} />
  )
}