import React, { useState, useEffect, useRef, useMemo} from 'react'
import * as THREE from "three"
import Card from './Card'

const torus = new THREE.TorusBufferGeometry(4, 1.2, 128, 128)

import {
  TitleContainer,
  TitleTop,
  TitleBottom,
} from './styles'

export default function Cards(props) {

  return (
    <Card/>
  );
}
