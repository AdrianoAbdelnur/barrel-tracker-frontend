import * as XLSX from 'xlsx'
import React, { useRef } from 'react';
import './fileButton.css'

function FileButton({setFile}) {
    const hiddenFileInput = useRef(null);
    const handleClick = (e) => {
        hiddenFileInput.current.click()
    }

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: 'buffer' });

                const wbname = wb.SheetNames[0];

                const ws = wb.Sheets[wbname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data)

            };
            fileReader.onerror = ((error) => {
                reject(error)
            });
        });
        promise.then((d) => {
            setFile(d)
        })
    };


    return (
        <div>
            <button className='addPriceButton' onClick={handleClick}>
                Add Prices List
            </button>
            <input
                type='file'
                onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                }}
                ref={hiddenFileInput}
                style={{ display: "none" }}
                id='archivoInput'
            />

        </div>
    );
}

export default FileButton;