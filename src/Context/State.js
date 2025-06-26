import { create } from 'zustand';


export const GlobalContext = create((set,get)=>{
        return{
            
            //global states
            user:null,
            rol:null,
            cancha:null,

            //Setters
            setUser:(state) => set({user:state}),
            setRol:(state) => set({rol:state}),
            setCancha:(state) => set({cancha:state})
        }
    })