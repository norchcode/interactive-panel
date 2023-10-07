import { Parallax, ParallaxLayer } from '@react-spring/parallax'

export default function MyComponent() {
  return (
    <Parallax pages={2} style={{ top: '0', left: '0' }}>
      <ParallaxLayer offset={0} speed={1}>
        <p>Parallax</p>
      </ParallaxLayer>
      <ParallaxLayer offset={1} speed={1}>
        <p>kfjkrknrfknrknfkn</p>
      </ParallaxLayer>
    </Parallax>
  )
}