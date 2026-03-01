import './Allstyle.css'
import { BsCpu } from "react-icons/bs";
import { BsCpuFill } from "react-icons/bs";



    function Containers({name="Data", icon: Icon}){
        return(
            <>
            <div className="Containerdiv">
               {Icon && <Icon className='iconforthecontainerr'/>} 
                <div className='valuediv'>
                <h1 className="Reponsevalue">91</h1>
            <h3 className="Nameofthecontainer">{name}</h3>  
            </div>
            
        </div>
        
        </>
    )
}

export default Containers;