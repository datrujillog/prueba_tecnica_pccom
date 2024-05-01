/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
// import axios from 'axios';
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
// import jquery from 'jquery';
import swal from 'sweetalert2';

const Php = () => {

  useEffect(() => {
    jQuery(document).ready(function () {
      jQuery("#rowed3").jqGrid({
        url: 'http://localhost:8000/list',
        datatype: "json",
        colNames: ['id', 'Name', 'LastName', 'Email', 'Password', 'Phone', 'Address', 'City'],
        colModel: [
          { name: 'id', index: 'id', width: 50, editable: true, hidden: true, key: true, editrules: { edithidden: false } },
          { name: 'Name', index: 'Name', width: 280, editable: true },
          { name: 'LastName', index: 'LastName', width: 100, editable: true },
          { name: 'email', index: 'Email', width: 250, sortable: false, editable: true }
          , { name: 'password', index: 'Password', width: 100, editable: true }
          , { name: 'phone', index: 'Phone', width: 100, editable: true }
          , { name: 'address', index: 'Address', width: 100, editable: true }
          , { name: 'city', index: 'City', width: 100, editable: true }
        ],
        rowNum: 5,
        rowList: [5, 10, 20],
        pager: '#prowed3',
        sortname: 'Name',
        viewrecords: true,
        sortorder: "asc",
        loadui: "block",
        edit: true,
        height: '20000%',
        loadComplete: function (data) {
          console.log('Data',data);
          console.log('rows',data.rows);
          if (data.records === 0) {
            swal.fire({
              title: 'No hay registros',
              text: 'No hay registros en la base de datos',
              icon: 'warning',
              confirmButtonText: 'Ok'
            });
          }
       
        },
        editurl: 'http://localhost:8000/data', 
        caption: "Prueba Tecnica en PCCOM "
      });
      jQuery("#rowed3").jqGrid('navGrid', '#prowed3', { edit: true, add: true, del: true, search: true, }, {}, {}, {}, {
        multipleSearch: true,
        bSubmit: 'Guardar',
        bCancel: 'Cancelar',
        bClose: 'Cerrar',
        center: true,
      });
    });

  }, []);

  return (
    <div className="container">
      <h2 className=''>Ejemplo de jqGrid en React PHP</h2>
      <div className="center">
        <table id="rowed3"></table>
      </div>
      <div id="prowed3"></div>
      <br />

    </div>
  );
}

export default Php;