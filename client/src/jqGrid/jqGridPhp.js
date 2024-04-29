/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// importar css
import './JqGridComponent.css'
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

// 3.84.247.50
// http://3.84.247.50/

const JqGridPhp = () => {

    useEffect(() => {
        // Inicializar jqGrid
        jQuery(document).ready(function () {
            var lastsel;
            jQuery("#rowed3").jqGrid({
                url: 'http://localhost:8000/list',
                datatype: "json",
                colNames: ['id', 'Name', 'LastName', 'Email', 'password', 'phone', 'address', 'city'],
                colModel: [
                    { name: 'id', index: 'id', width: 50, editable: true, hidden: true, key: true, editrules: { edithidden: false } },
                    { name: 'Name', index: 'Name', width: 200, editable: true },
                    { name: 'LastName', index: 'LastName', width: 100, editable: true },
                    { name: 'email', index: 'Email', width: 200, sortable: false, editable: true },
                    { name: 'password', index: 'password', width: 200, sortable: false, editable: true },
                    { name: 'phone', index: 'phone', width: 200, sortable: false, editable: true },
                    { name: 'address', index: 'address', width: 200, sortable: false, editable: true },
                    { name: 'city', index: 'city', width: 200, sortable: false, editable: true }
                ],
                rowNum: 10,               // Número de filas por página
                rowList: [10, 20, 30],    // Opciones de número de filas por página
                pager: '#prowed3',        // Selector del paginador
                sortname: 'Name',           // Columna por la que se ordenará
                viewrecords: true,       // Mostrar número de registros
                sortorder: "desc",
                oonSelectRow: function (id) {
                    if (id && id !== lastsel) {
                        jQuery('#rowed3').jqGrid('restoreRow', lastsel);
                        jQuery('#rowed3').jqGrid('editRow', id, true);
                        lastsel = id;
                        var rowData = jQuery('#rowed3').getRowData(id);
                        axios.get('http://localhost:8000/update', {
                            params: rowData
                        })
                            .then(function (response) {
                                // manejar la respuesta del servidor
                            })
                            .catch(function (error) {
                                // manejar el error
                            });
                    }
                },
                editurl: 'http://localhost:8000/update',
                type: 'GET',
                caption: "Prueba Tecnica en PCCOM "
            });

        });
    }, []);

    const reloadGrid = () => {
        jQuery("#rowed3").trigger('reloadGrid'); // Esto recarga la tabla
    };


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


    // crear boton para eliminar registro
    const deleteRecord = () => {
        const selectedRowId = jQuery("#rowed3").jqGrid('getGridParam', 'selrow');
        if (!selectedRowId) {
            alert('Seleccione un registro para eliminar');
            return;
        }

        if (!window.confirm('¿Está seguro de que desea eliminar el registro seleccionado?')) return;

        const rowData = jQuery("#rowed3").jqGrid('getRowData', selectedRowId)
        // axios.delete(`http://localhost:5000/api/user/delete/${rowData.id}`)
        axios.get(`http://localhost:8000/delete/${rowData.id}`)
            .then(response => {
                console.log('Registro eliminado exitosamente');
                alert('Registro eliminado exitosamente');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };




    return (
        <div>
            <h2>Ejemplo de jqGrid en React</h2>
            <table id="rowed3"></table>
            <div id="prowed3"></div>
            <br />
            <button className='btn' onClick={addNewRecord}>Agregar</button>

            <button className='btn' onClick={deleteRecord}>Eliminar</button>
            <button className="btn" onClick={reloadGrid}>Recargar</button>



        </div>
    );
}

export default JqGridPhp;
