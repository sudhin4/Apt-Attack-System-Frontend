import './Allstyle.css'

function Buttons({fname = "Start", color}){
    return(
        <>
        <button className={`buttontag ${color}`}>{fname}</button>
        
        </>
    )
}

export default Buttons;