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
// import '../../plugins/jqgrid/plugins/jquery.searchFilter.js';
// import 'jqgrid'; // Importa jqGrid


// import 'jqgrid/css/ui.jqgrid-bootstrap4.css'; // Importa los estilos de jqGrid para Bootstrap 4
// import 'bootstrap/dist/css/bootstrap.min.css';



const JqGridComponent = () => {
    const [jqgridData, setjqGridData] = useState([]);

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
                colNames: ['Name', 'LastName', 'Email'],
                colModel: [
                    // { name: 'id', index: 'id', width: 55 },
                    // { name: 'invdate', index: 'invdate', width: 90, editable: true },
                    // { name: 'name', index: 'name', width: 100, editable: true },
                    // { name: 'amount', index: 'amount', width: 80, align: "right", editable: true },
                    // { name: 'tax', index: 'tax', width: 80, align: "right", editable: true },
                    // { name: 'total', index: 'total', width: 80, align: "right", editable: true },
                    // { name: 'note', index: 'note', width: 150, sortable: false, editable: true },
                    // { name: 'name', index: 'name', width: 500, editable: true },
                    { name: 'Name', index: 'Name', width: 400, editable: true},
                    { name: 'LastName', index: 'LastName', width: 100, editable: true },
                    { name: 'Email', index: 'Email', width: 150, sortable:false, editable: true}
                    // { name: 'email', index: 'email', width: 100, sortable:false, editable: true, edittype: 'email'}
                    
                    
                ],
                rowNum: 5,               // Número de filas por página
                rowList: [5, 10, 20],    // Opciones de número de filas por página
                pager: '#prowed3',        // Selector del paginador
                sortname: 'id',           // Columna por la que se ordenará
                viewrecords: true,       // Mostrar número de registros
                sortorder: "desc",
                onSelectRow: function (id) {
                    if (id && id !== lastsel) {
                        jQuery('#rowed3').jqGrid('restoreRow', lastsel);
                        jQuery('#rowed3').jqGrid('editRow', id, true);
                        lastsel = id;
                    }
                },
                editurl: 'http://localhost:5000/api/user/update',  // URL para editar
                // mtype: 'PUT',          
                caption: "Prueba Tecnica en PCCOM " // Título de la tabla
            });
        });
    }
        , []);

    return (
        <div>
            <h2>Ejemplo de jqGrid en React</h2>
            <table id="rowed3"></table>
            <div id="prowed3"></div>

        </div>
    );
}

export default JqGridComponent;
