/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
// importar css
// import './JqGridComponent.css'
import 'jqgrid/css/ui.jqgrid.css';
import 'jquery-ui/themes/base/all.css';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/ui/widgets/dialog';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/selectable';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/autocomplete';
//searchFilter
import 'jquery-ui/ui/widgets/accordion';




const JqGridComponent = () => {
    // const [jqgridData, setjqGridData] = useState([]);

    //traer los dastos del api y setearlos en el estado
    //     useEffect(() => {
    //         fetch('http://localhost:5000/api/user/get')
    //             .then(response => response.json())
    //             .then(data => {
    //                 setjqGridData(data);
    //             });
    //     }, []);




    // console.log('DATA  <>',jqgridData);


    useEffect(() => {
        // Datos de prueba para la tabla


        // Inicializar jqGrid
        jQuery(document).ready(function () {
            var lastsel;
            jQuery("#rowed3").jqGrid({
                url: 'http://localhost:5000/api/user/get/',
                datatype: "json",
                colNames: ['id','Name', 'LastName', 'Email'],
                colModel: [
                    { name: 'id', index: 'id', width: 50, editable: true, hidden: true, key: true, editrules: { edithidden: false } },
                    { name: 'Name', index: 'Name', width: 400, editable: true },
                    { name: 'LastName', index: 'LastName', width: 100, editable: true },
                    { name: 'Email', index: 'Email', width: 150, sortable: false, editable: true }
                ],
                rowNum: 10,               // Número de filas por página
                rowList: [10, 20, 30],    // Opciones de número de filas por página
                pager: '#prowed3',        // Selector del paginador
                sortname: 'Name',           // Columna por la que se ordenará
                viewrecords: true,       // Mostrar número de registros
                sortorder: "desc",
                onSelectRow: function (id) {
                    if (id && id !== lastsel) {
                        jQuery('#rowed3').jqGrid('restoreRow', lastsel);
                        jQuery('#rowed3').jqGrid('editRow', id, true);
                        // lastsel = id;
                    }
                },
                editurl: 'http://localhost:5000/api/user/update',  
                // addturl: 'http://localhost:5000/api/user/create',  
                caption: "Prueba Tecnica en PCCOM " 
            });
            // jQuery("#rowed3").jqGrid('navGrid', '#prowed3', { edit: true, add: true, del: true });
        });



    }, []);

    return (
        <div>
            <h2>Ejemplo de jqGrid en React</h2>
            <table id="rowed3"></table>
            <div id="prowed3"></div>
            <button onClick={() => { 
                // jQuery("#rowed3").jqGrid('editGridRow', "new", {height:280,reloadAfterSubmit:false}); 
                jQuery("#rowed3").jqGrid('editGridRow', 'new', {height:280,closeAfterAdd:true, closeAfterEdit:true, closeOnEscape:true, savekey: [true,13]}); 
                }}>Agregar</button>

        </div>
    );
}

export default JqGridComponent;


                // { name: 'id', index: 'id', width: 50, editable: true, hidden: true, key: true, editrules: { edithidden: false } },
