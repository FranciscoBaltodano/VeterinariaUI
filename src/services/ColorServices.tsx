import axios from "axios";

export interface ColorType {
    id: number;
    descripcion: string;
}

export interface updateColorType {
    descripcion: string;
}

const URI = "http://127.0.0.1:8000"

export async function getColors(): Promise<ColorType[]>{

    const response = await axios.get<ColorType[]>(
        `${URI}/api/colores`
    )
    return response.data;
}

export async function addColor(color: string): Promise<ColorType> {
    const response = await axios.post<ColorType>(
        `${URI}/api/colores`, 
        { descripcion: color } //body o payload
    )
    return response.data;
    
}

export async function deleteColor(id: number): Promise<void> {
    await axios.delete<void>(
        `${URI}/api/colores/${id}`, 
    )
}

// export async function updateColor(id: number): Promise<ColorType> {
//     const response = await axios.put<ColorType>(
//         `${URI}/api/colores/${id}`, 
//     )
//     return response.data;
// }

export async function updateColor(id: number, color: updateColorType): Promise<ColorType> {
    const response = await axios.put<ColorType>(
        `${URI}/api/colores/${id}`,
        color
    );
    return response.data;
}