import { motion } from 'framer-motion';
import classes from './GradientBlobs.module.css';

export function GradientBlobs() {
  return (
    <div className={classes.wrapper} aria-hidden="true">
      <motion.div
        className={`${classes.blob} ${classes.blobOne}`}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`${classes.blob} ${classes.blobTwo}`}
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className={`${classes.blob} ${classes.blobThree}`}
        animate={{
          x: [0, 30, -40, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className={classes.grid} />
    </div>
  );
}
