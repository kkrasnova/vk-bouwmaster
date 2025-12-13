"use client"

import { useEffect, useRef } from "react"

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: any
    scene: any
    renderer: any
    uniforms: { time: { value: number }; resolution: { value: any } }
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let cleanup: (() => void) | null = null

    import("three").then((THREE) => {
      if (!containerRef.current) return

      const container = containerRef.current

      const vertexShader = `
        void main() {
          gl_Position = vec4( position, 1.0 );
        }
      `

      const fragmentShader = `
        #define TWO_PI 6.2831853072
        #define PI 3.14159265359

        precision highp float;
        uniform vec2 resolution;
        uniform float time;

        void main(void) {
          vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
          float t = mod(time * 0.05, TWO_PI); // Одна волна за раз
          float lineWidth = 0.002;

          vec3 color = vec3(0.0);
          for(int j = 0; j < 3; j++){
            for(int i=0; i < 5; i++){
              color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
            }
          }
          
          gl_FragColor = vec4(color[0],color[1],color[2],1.0);
        }
      `

      const camera = new THREE.Camera()
      camera.position.z = 1

      const scene = new THREE.Scene()
      const geometry = new THREE.PlaneGeometry(2, 2)

      const uniforms = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() },
      }

      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      })

      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)

      container.appendChild(renderer.domElement)

      const onWindowResize = () => {
        const width = container.clientWidth
        const height = container.clientHeight
        renderer.setSize(width, height)
        uniforms.resolution.value.x = renderer.domElement.width
        uniforms.resolution.value.y = renderer.domElement.height
      }

      onWindowResize()
      window.addEventListener("resize", onWindowResize, false)

      let animationId: number = 0

      const animate = () => {
        animationId = requestAnimationFrame(animate)
        uniforms.time.value += 0.05
        renderer.render(scene, camera)
      }

      sceneRef.current = {
        camera,
        scene,
        renderer,
        uniforms,
        animationId: 0,
      }

      animate()

      cleanup = () => {
        window.removeEventListener("resize", onWindowResize)
        cancelAnimationFrame(animationId)

        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }

        renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    }).catch((error) => {
      console.error("Failed to load Three.js:", error)
    })

    return () => {
      if (cleanup) {
        cleanup()
      }
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)
        sceneRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-screen"
      style={{
        background: "#000",
        overflow: "hidden",
      }}
    />
  )
}
