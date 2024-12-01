import React from 'react'
import { Bitmoji } from './Bitmoji'
import './bits.css'
import { useEffect } from 'react';
import { useState } from 'react';
const Bitmojees = ({indes,printUrl}) => {
  const bitmojees = Bitmoji;
  return (
    <div style={{backgroundColor: 'transparent',padding:'10px'}} className='bits'>
      {bitmojees ? 
        <div className='bit-image'>
          {bitmojees.map((bit, index) => (
            <div key={index} className='bit-images'>
              <img src={Object.values(bit)[0]} onClick={()=>printUrl(Object.values(bit)[0],index)} style={{backgroundColor: 'transparent',border:'none',borderRadius:indes===index?'35px':'25px',boxShadow:indes===index?'1px 1px 14px black':'',cursor:'pointer',height:indes===index?'60px':'',transition:'all 0.2s ease-in-out'}} />
            </div>
          ))}
        </div>
      : ''}
    </div>
  );
}

export default Bitmojees;
