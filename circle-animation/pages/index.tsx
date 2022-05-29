import { useRef, useEffect, CSSProperties, useState } from 'react';
import type { NextPage } from 'next';
import anime from 'animejs';

import styles from './index.module.scss';

const calculateXPosition = (rotation: number): number => {
  return Math.cos((rotation * Math.PI) / 180) * 250;
};

const calculateYPosition = (rotation: number): number => {
  return Math.sin((rotation * Math.PI) / 180) * 250;
};

const Circle = (props: { style?: CSSProperties }): JSX.Element => {
  return <div className={`${styles.circle}`} style={props.style}></div>;
};

const Home: NextPage = () => {
  const [rotation, setRotation] = useState(0);
  const timeline = useRef<anime.AnimeInstance | null>(null);

  const circles = [];

  useEffect(() => {
    let newRotation = { rotation };
    timeline.current = anime({
      targets: newRotation,
      rotation: [0, 359],
      duration: 3000,
      loop: true,
      round: 1,
      easing: 'linear',
      direction: 'reverse',
      update: () => setRotation(newRotation.rotation),
    });
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.circleBase}></div>
      <div className={styles.gridLine}></div>
      <div className={styles.gridLine} style={{ rotate: '22.5deg' }}></div>
      <div className={styles.gridLine} style={{ rotate: '45deg' }}></div>
      <div className={styles.gridLine} style={{ rotate: '67.5deg' }}></div>
      <div className={styles.gridLine} style={{ rotate: '90deg' }}></div>
      <div className={styles.gridLine} style={{ rotate: '112.5deg' }}></div>
      <div className={styles.gridLine} style={{ rotate: '135deg' }}></div>
      <div className={styles.gridLine} style={{ rotate: '157.5deg' }}></div>

      <Circle
        style={{
          transform: `translateX(250px)`,
          rotate: `${rotation}deg`,
          backgroundColor: 'blue',
        }}
      />

      {(() => {
        for (let i = 0; i < 8; i++) {
          circles.push(
            <Circle
              style={{
                transform: `translateX(${calculateXPosition(rotation + 22.5 * i)}px)`,
                rotate: `${22.5 * i}deg`,
              }}
            />
          );
        }
        return circles;
      })()}
    </div>
  );
};

export default Home;
