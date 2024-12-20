'use client'

import React, { useEffect } from 'react'
import styles from './PageOne.module.css';
import Link from 'next/link';
import SimpleTable from '../../SharedComponents/SimpleTable/SimpleTable';
import PageOneLogic from './PageOneLogic';
import Table from '../../SharedComponents/Table/Table';
import SearchBar from '../../SharedComponents/SearchBar/SearchBar';

export default function PageOne() {

  // const {pageOneState, testEndpoint_onSuccess} = PageOneLogic();

  return (

    <div className={`${styles.mainWrapper} p-5`} > 
      <div className='mb-5'>
        hello page one
      </div>
      <Link href={'pageTwo'}>go to page two</Link>
    </div>

  )

}
