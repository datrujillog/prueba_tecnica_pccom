import React, { useEffect } from 'react';
import $ from 'jquery';
import { DataGrid } from 'react-data-grid';

function Jqgrid() {
  useEffect(() => {
    // Datos de ejemplo para la tabla
    const mydata = [
      { id: 1, name: 'John', age: 30, city: 'New York' },
      { id: 2, name: 'Jane', age: 25, city: 'Los Angeles' },
      { id: 3, name: 'Bob', age: 35, city: 'Chicago' }
    ];
  
    // Inicializar jqGrid utilizando window.$
    window.$('#jqGrid').jqGrid({
      data: mydata,
      datatype: 'local',
      colModel: [
        { label: 'ID', name: 'id', width: 75, key: true },
        { label: 'Name', name: 'name', width: 150 },
        { label: 'Age', name: 'age', width: 100 },
        { label: 'City', name: 'city', width: 150 }
      ],
      viewrecords: true,
      width: 700,
      height: 300,
      rowNum: 10,
      pager: '#jqGridPager'
    });
  }, []);
  // Ejecutar solo una vez, equivalente a componentDidMount en clases

  return (
    <div>
      <h2>Ejemplo de jqGrid en React</h2>
      <table id="jqGrid"></table>
      <div id="jqGridPager"></div>
    </div>
  );
}

export default Jqgrid;

