import React from 'react';
import { useState, useEffect, } from "react";
import { ColorType, addColor, getColors, deleteColor} from "../services/ColorServices"


function Color(){

    const [colors, setColors] = useState<ColorType[]>([]);
    const [color, setColor] = useState<string>("")

    const addColorEvent = async () => {
        const newColor = await addColor(color);
        setColors([...colors, newColor]);
    }

    const deleteColorEvent = async (id:number) => {
        await deleteColor(id);
        setColors (colors.filter((color) => color.id !== id))
    }

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    }

    useEffect(() => {
        async function fetchData() {
            
            const colors = await getColors();
            setColors(colors);
        };
        fetchData();
    }, [])
    

    return (
        <div>
            <h1>Color Managment</h1>

                <span>Color:</span>
                <input type="text" 
                    placeholder='Type your new color' 
                    value={ color }
                    onChange= { changeInput }/>
                <button
                    disabled={ color.length === 0 }
                    onClick={ addColorEvent }
                >add</button>


                <ul>
                    { colors.map((color) => (

                        <li key={color.id} >
                            { color.descripcion }
                            
                            <button 
                                onClick={ () => deleteColorEvent(color.id) }>
                                    x
                            </button>
                            <button>
                                edit
                            </button>
                        </li>
                    ))}
                </ul>

        </div>
    );
};

export default Color;
