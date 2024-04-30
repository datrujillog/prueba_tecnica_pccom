/* eslint-disable no-undef */

import React, { useEffect } from 'react';
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
import swal from 'sweetalert2';

const JqgridDos = () => {

  useEffect(() => {
    jQuery(document).ready(function () {
      // var lastsel;
      jQuery("#rowed3").jqGrid({
        url: 'http://3.88.143.154:5000/api/user/get',
        // url: 'http://localhost:5000/api/user/get/',
        datatype: "json",
        colNames: ['id', 'Name', 'LastName', 'Email', 'Password', 'Phone', 'Address', 'City'],
        colModel: [
          { name: 'id', index: 'id', width: 50, editable: true, hidden: true, key: true, editrules: { edithidden: false } },
          { name: 'Name', index: 'Name', width: 280, editable: true },
          { name: 'LastName', index: 'LastName', width: 100, editable: true },
          { name: 'Email', index: 'Email', width: 250, sortable: false, editable: true }
          , { name: 'Password', index: 'Password', width: 100, editable: true }
          , { name: 'Phone', index: 'Phone', width: 100, editable: true }
          , { name: 'Address', index: 'Address', width: 100, editable: true }
          , { name: 'City', index: 'City', width: 100, editable: true }
        ],

        rowNum: 5,
        rowList: [5, 10, 20],
        pager: '#prowed3',
        sortname: 'Name',
        viewrecords: true,
        sortorder: "desc",
        loadui: "block",
        edit: true,
        height: '20000%',
        loadComplete: function (data) {
          if(data.rows.length === 0) 
          {
            swal.fire({
              title: 'No hay registros',
              text: 'Ningún registro coincide con la búsqueda',
              icon: 'info',
              confirmButtonText: 'Ok'
            });

            if(data && data.rows) {
              const users = data.rows;
              for (let i = 0; i < users.length; i++) {
                const user = users[i];
                jQuery("#rowed3").jqGrid('addRowData', user.id, user);
              }
            }
          
          }
        },
        // loadComplete: function (data) {
        //   if(data.rows.length === 0) alert('No hay registros en la base de datos');

        //   if (data && data.rows) {
        //     const users = data.rows;
        //     for (let i = 0; i < users.length; i++) {
        //       const user = users[i];
        //       jQuery("#rowed3").jqGrid('addRowData', user.id, user);
        //     }

        //   }
          
        // },       
        // editurl: 'http://localhost:5000',
        // editurl: 'http://localhost:5000',
        // editurl: 'http://localhost:5000/api/user/update',
        editurl: 'http://3.88.143.154:5000/api/user/update',
        caption: "Prueba Tecnica en PCCOM "
      });
      //Reload Grid
      jQuery("#rowed3").trigger('reloadGrid');

      jQuery("#rowed3").jqGrid('navGrid', '#prowed3', { edit: true, add: true, del: true, search: true, }, {}, {}, {}, {
        multipleSearch: true,
        reloadAfterSubmit: false, 
        closeAfterAdd: true,
        closeAfterEdit: false,
        closeOnEscape: true,
        savekey: [true, 13],
        caption: 'Buscar Informacion',
        bSubmit: 'Guardar',
        bCancel: 'Cancelar',
        bClose: 'Cerrar',
        center: true,
      });


    });

  }, []);



  return (
    <div className="container">
      {/* <h2 className=''>Ejemplo de jqGrid en React</h2> */}
      <div className="center">
        <table id="rowed3"></table>
      </div>
      <div id="prowed3"></div>
      <br />
      {/* <button className="btn" onClick={addNewRecord}>Agregar</button>
      <button className="btn" onClick={deleteRecord}>Eliminar</button>
      <button className="btn" onClick={reloadGrid}>Recargar</button> */}
    </div>
  );
}

export default JqgridDos;