import React from 'react';
import { useState, useEffect, } from "react";
import { ColorType, addColor, getColors, deleteColor, updateColor, updateColorType} from "../services/ColorServices"


function Color(){

    const [colors, setColors] = useState<ColorType[]>([]);
    const [color, setColor] = useState<string>("")
    const [updatedDescription, setUpdatedDescription] = useState("");


    const addColorEvent = async () => {
        const newColor = await addColor(color);
        setColors([...colors, newColor]);
    }

    const deleteColorEvent = async (id:number) => {
        await deleteColor(id);
        setColors (colors.filter((color) => color.id !== id))
    }

    async function handleUpdateColor(id: number) {
        const updatedColor = { descripcion: updatedDescription };
        const updated = await updateColor(id, updatedColor);
        setColors(colors.map((color) => (color.id === id ? updated : color)));
        setUpdatedDescription(""); // Restablecer el campo de entrada
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


//Funciones para aparecer y desaparecer botones EDIT
    // Aparecer y desaparecer los botones UPDATE Y CANCEL
    const [visible, setVisible] = useState(false)
    const handleClick = () => {
        setVisible(true);
    }
    const handleHide = () => {
        setVisible(false);
    }
    const handleBoth = () =>{
        handleClick();
        handleHideAdd();
    }

    //Aparecer y desaparecer el boton Add
    const [visibleAdd, setVisibleAdd] = useState(true)
    const handleClickAdd = () => {
        setVisibleAdd(true);
    }
    const handleHideAdd = () => {
        setVisibleAdd(false);
    }
    const handleBothReverse = () =>{
        handleHide();
        handleClickAdd();
    }



    return (
        <div>
            <h1>Color Managment</h1>

                <div style={{display:'flex'}}>
                    <span>Color:</span>
                    <input type="text" 
                        placeholder='Crea un nuevo color' 
                        value={ color }
                        onChange= { changeInput }/>


                    { visibleAdd && <div>
                        <button
                            id='add'
                            disabled={ color.length === 0 }
                            onClick={ addColorEvent }
                            
                        >add</button>
                    </div>}

                    { visible && <div style={{display:'block'}}>

                        <button
                            onClick={ handleBothReverse }
                        >Update</button>
                        <button
                            onClick={ handleBothReverse }
                        >cancel</button>
                    </div>}
                </div>

                <span>Update</span>
                <input
                    type="text"
                    placeholder='Edita un color existente'
                    value={updatedDescription}
                    onChange={(event) => setUpdatedDescription(event.target.value)}
                />
                <ul>
                    { colors.map((color) => (

                        <li key={color.id} >
                            { color.descripcion }
                            
                            <button 
                                onClick={ () => deleteColorEvent(color.id) }>
                                    x
                            </button>

                            <button
                                id='editColor'
                                onClick={handleBoth}>
                                    edit
                            </button>

                            <button 
                                onClick={() => handleUpdateColor(color.id)}>
                                    Update
                            </button>

                        </li>
                    ))}
                </ul>
                
        </div>
    );
};

export default Color;
