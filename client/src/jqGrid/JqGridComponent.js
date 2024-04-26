/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import jquery from 'jquery';




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
                        lastsel = id;
                    }
                },
                editurl: 'http://localhost:5000/api/user/update',   
                // editurl: 'http://localhost:5000/api/user/create',   
                // //eliminar
                // elimturl: 'http://localhost:5000/api/user/delete',  
                caption: "Prueba Tecnica en PCCOM " 
            });
            // jQuery("#rowed3").jqGrid('navGrid', '#prowed3', { edit: true, add: true, del: true });



            // Agregar botón de crear registra fuera del jqGrid
            
           
            





        });









    }, []);


    const addNewRecord = () => {
        // Obtener los datos del nuevo registro
        const rowData = jQuery("#rowed3").jqGrid('editGridRow', 'new', {
            editurl: 'http://localhost:5000/api/user/create',
            height: 280,
            reloadAfterSubmit: false,
            closeAfterAdd: true,
            closeAfterEdit: true,
            closeOnEscape: true,
            savekey: [true, 13],
            caption: 'Agregar Registro',
            bSubmit: 'Guardar',
            bCancel: 'Cancelar',
            bClose: 'Cerrar',
            saveData: 'Data has been changed! Save changes?'
        });
    
        // Verificar la operación
    
        // Enviar los datos al servidor solo si la operación es "add" o "edit"
       
            axios.post('http://localhost:5000/api/user/create', rowData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                // Manejar la respuesta si es necesario
                console.log('Registro agregado exitosamente');
            })
            .catch(error => {
                // Manejar cualquier error de la solicitud
                console.error('Error:', error);
            });
        
    };
    
    

    return (
        <div>
            <h2>Ejemplo de jqGrid en React</h2>
            <table id="rowed3"></table>
            <div id="prowed3"></div>
            {/* <button onClick={() => { 
                 jQuery("#rowed3").jqGrid('editGridRow', "new", {height:280,reloadAfterSubmit:false}); 
                jQuery("#rowed3").jqGrid('editGridRow', 'new', {height:280,closeAfterAdd:true, closeAfterEdit:true, closeOnEscape:true, savekey: [true,13]}); 
                }}>Agregar</button> */}
            <button  onClick={addNewRecord}>Agregar</button>


        </div>
    );
}

export default JqGridComponent;


                // { name: 'id', index: 'id', width: 50, editable: true, hidden: true, key: true, editrules: { edithidden: false } },













                 // Agregar botón de actualización fuera del jqGrid
    //     jQuery("#rowed3").jqGrid('navGrid', '#prowed3', {
    //         edit: false,
    //         add: false,
    //         del: false
    //     }, {}, {}, {}, {
    //         // Custom update function
    //         onClickButton: function () {
    //             var selectedRowId = jQuery("#rowed3").jqGrid('getGridParam', 'selrow');
    //             var rowData = jQuery("#rowed3").jqGrid('getRowData', selectedRowId);
                
    //             // Aquí debes enviar la solicitud PUT al servidor para actualizar el registro
    //             jQuery.ajax({
    //                 mtype: "PUT",
    //                 url: "http://localhost:5000/api/user/update",
    //                 data: JSON.stringify(rowData), // Envía los datos del registro seleccionado al servidor
    //                 contentType: "application/json; charset=utf-8",
    //                 dataType: "json",
    //                 success: function (response) {
    //                     // Manejar la respuesta del servidor si es necesario
    //                     console.log("Registro actualizado exitosamente");
    //                 },
    //                 error: function (xhr, status, error) {
    //                     // Manejar cualquier error de la solicitud
    //                     console.error("Error al actualizar el registro:", error);
    //                 }
    //             });
    //         },
    //         position: "right",
    //         // Agregar botón de actualización
    //         caption: "", // Caption vacío para que no aparezca ningún texto en el botón
    //         buttonicon: "ui-icon-refresh", // Ícono del botón (puedes cambiarlo por otro si lo deseas)
    //         title: "Actualizar Registro", // Título del botón
    //         id: "customUpdateButton" // ID único del botón para referenciarlo si es necesario
    //     });
    // });