import { useLocation } from "react-router-dom"


function WasteGen() {
const {state} = useLocation();
const { Boxresidue } = state || {};    
        
console.log(Boxresidue); 
    

return <div>
<h2>Resíduos gerados</h2>


</div>
}
    
export default WasteGen