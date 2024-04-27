/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import 'jquery-ui/ui/widgets/accordion';
import jquery from 'jquery';

const JqGridComponent = () => {
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        initializeJqGrid();
    }, [pageNumber]);

    const initializeJqGrid = () => {
        jQuery(document).ready(function () {
            var lastsel;
            jQuery("#rowed3").jqGrid({
                url: `http://localhost:5000/api/user/get?page=${pageNumber}&limit=5`,
                datatype: "json",
                colNames: ['id', 'Name', 'LastName', 'Email'],
                colModel: [
                    { name: 'id', index: 'id', width: 50, editable: true, hidden: true, key: true, editrules: { edithidden: false } },
                    { name: 'Name', index: 'Name', width: 300, editable: true },
                    { name: 'LastName', index: 'LastName', width: 100, editable: true },
                    { name: 'Email', index: 'Email', width: 200, sortable: false, editable: true }
                ],
                rowNum: 5,
                rowList: [5, 10, 20],
                pager: '#prowed3',  //
                sortname: 'Name',
                viewrecords: true, // esta propiedad muestra el numero de registros 
                sortorder: "desc",
                onSelectRow: function (id) {
                    if (id && id !== lastsel) {
                        jQuery('#rowed3').jqGrid('restoreRow', lastsel);
                        jQuery('#rowed3').jqGrid('editRow', id, true);
                        lastsel = id;
                    }
                },
                editurl: 'http://localhost:5000/api/user/update',
                caption: "Prueba Tecnica en PCCOM "
            });
        });
    };

    const reloadGrid = () => {
      jQuery("#rowed3").jqGrid('setGridParam', { url: `http://localhost:5000/api/user/get?page=${pageNumber}&limit=5` });
        jQuery("#rowed3").trigger('reloadGrid');
    };

    const addNewRecord = () => {
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
                console.log('Registro agregado exitosamente');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const deleteRecord = () => {
        const selectedRowId = jQuery("#rowed3").jqGrid('getGridParam', 'selrow');
        if (!selectedRowId) {
            alert('Seleccione un registro para eliminar');
            return;
        }

        if (!window.confirm('¿Está seguro de que desea eliminar el registro seleccionado?')) return;

        const rowData = jQuery("#rowed3").jqGrid('getRowData', selectedRowId)
        axios.delete(`http://localhost:5000/api/user/delete/${rowData.id}`)
            .then(response => {
                console.log('Registro eliminado exitosamente');
                alert('Registro eliminado exitosamente');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const nextPage = () => {
        setPageNumber(pageNumber + 1);
    };

    const previousPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
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
            <button className="btn" onClick={previousPage}>Página anterior</button>
            <button className="btn" onClick={nextPage}>Siguiente página</button>
        </div>
    );
}

export default JqGridComponent;
