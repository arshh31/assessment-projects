import React from 'react'
import MultiProgressBar from './MultiProgressBar'
import "./MultiProgressBar.css"
import {useState,useEffect} from "react"

const MultiProgressBarApp = () => {
    const [value,setValue] = useState(0)

    useEffect (()=>{
        setInterval(()=>{
            setValue((val)=>val+1);
        },100)
    
    },[])
  return (
    <div className='app'>
        <span>Progress bar</span>
        <MultiProgressBar value={value}/>
    </div>
  )
}

export default MultiProgressBarApp
