'use client';
import { motion } from "framer-motion"

import styles from './Content.module.css';
import ContentLogic from "./ContentLogic";

export default function Content() {

    const {testVar, componentState, toggleState, count} = ContentLogic();

  return (
    <div className={`${styles.mainWrapper} border`} >

        <motion.div 
            animate={{ height: count? '5rem' : '10rem' }} 
            className={`${styles.contentSub} border`}
            initial={false}
        >
            hello page one
        </motion.div>

        <div onClick={toggleState} className="btn btn-primary">
            toggle
        </div>

    </div>
  );
}

