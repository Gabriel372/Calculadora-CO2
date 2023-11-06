import style from './Spinner.module.css'
import {ImSpinner9} from 'react-icons/im'
// import {ImSpinner3} from 'react-icons/im'
// import {CgSpinnerTwo} from 'react-icons/cg'
// import {ImSpinner2} from 'react-icons/im' 

function Spinner() {
return<div className={style.container}>
<ImSpinner9 className={style.spinner}/>
</div>
}

export default Spinner

