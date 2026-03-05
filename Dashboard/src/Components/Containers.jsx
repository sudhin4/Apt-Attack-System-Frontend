import { useState } from 'react';
import './Allstyle.css'
import { BsCpu } from "react-icons/bs";
import { BsCpuFill } from "react-icons/bs";



    function Containers({name="Data", icon: Icon, value="0", color=true }){

        

        return(
            <>
            <div className={color?"Containerdiv boxgreen" :"Containerdiv boxred"}>
               {Icon && <Icon className='iconforthecontainerr'/>} 
                <div className='valuediv'>
                <h1 className="Reponsevalue">{value}</h1>
            <h3 className="Nameofthecontainer">{name}</h3>  
            </div>
            
        </div>
        
        </>
    )
}

export default Containers;