import React, { useContext } from 'react'
import { WordleContext } from '../../App'
import Grid from '../Grid/Grid'
import Keyboard from '../Keyboard/Keyboard'

export default function Board() {
    const {word} = useContext(WordleContext)
    return (
        <div className="flex flex-col justify-center items-center" >
            
            <Grid/>
            <Keyboard/>
         

        
            
        </div>
    )
}
