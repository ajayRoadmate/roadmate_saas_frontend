'use client'

import Header from "@/components/Frontend/Header/Header";
import Footer from "@/components/Frontend/Footer/Footer"; 
import Sidebar from "@/components/Frontend/Sidebar/Sidebar";

import styles from './dashboardLayout.module.css';
import DialogueBox from "@/components/Frontend/SharedComponents/DialogueBox/DialogueBox";

import { Manrope } from 'next/font/google';

const manrope = Manrope({
  weight: ['400', '500', '700'], 
  subsets: ['latin'],
});


export default function RootLayout({ children }) {


  return (

    <div className={`${styles.mainWrapper} ${manrope.className}`} >
      <div className={`${styles.topSection} `} >
        <Header />
      </div>
      <div className={`${styles.subSection}  `} >
        <div className={`${styles.leftSection}  `} >
          <Sidebar />
        </div>
        <div className={`${styles.rightSection} `} >
          <div className={`${styles.contentSection} `} >
            { children }
          </div>
        </div>
      </div>
    </div>  

  );
}
