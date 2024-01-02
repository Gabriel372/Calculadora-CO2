import { PiPrinterDuotone } from "react-icons/pi";
import style from './GeneratePdf.module.css'
//instalador: npm install html2pdf.js

function GeneratePdf() {


function imprimirPagina()  {window.print() }

  return (
    <div className={style.PdfComp}>
      <button onClick={imprimirPagina} className={style.BtnPdf}><PiPrinterDuotone className={style.PrintIcon} /> </button> 
    </div>
  );
};

export default GeneratePdf;
