import React, { useState, useEffect, useRef } from 'react'
import * as PIXI from 'pixi.js'

import {
  Container
} from './styles'

export default function Background() {

  const [topIndex, setTopIndex] = useState(0)

  const containerRef = useRef()
  const appRef = useRef()

  useEffect(() => {

    // pixi init
    const app = new PIXI.Application({        
        antialias: true,    
        transparent: false,
        resolution: 1,
    });
    // app.renderer.view.style.position = "absolute"
    // app.renderer.view.style.display = "block"
    app.renderer.autoResize = true
    appRef.current = app
    containerRef.current.appendChild(app.view)
    app.resizeTo = containerRef.current

    const graphics = new PIXI.Graphics();

    // Rectangle
    graphics.beginFill(0xDE3249);
    graphics.drawRect(50, 50, 100, 100);
    graphics.endFill();

    app.stage.addChild(graphics);

}, []); 

  return (
    <Container ref={containerRef}>
    
    </Container>
  );
}
