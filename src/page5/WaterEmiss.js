import { useLocation } from "react-router-dom"

function WaterEmiss() {
const {state} = useLocation();
const { Boxwater } = state || {};    
    
console.log(Boxwater);    

return <div>
<h2>Emissões de água</h2>


</div>
}

export default WaterEmiss