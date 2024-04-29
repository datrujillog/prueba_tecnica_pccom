import './App.css';
import Header from './jqGrid/header';
import Jqgrid from './jqGrid/jqgrid';
import JqGridComponent from './jqGrid/JqGridComponent';
import JqGridPhp from './jqGrid/jqGridPhp';
import Paginate from './jqGrid/paginate';

function App() {
  return (
    <div className="App">
      {/* <Jqgrid /> */}

      {/* <JqGridComponent /> */}
      <Header />
      <Jqgrid />
      {/* <Paginate /> */}
      {/* <JqGridPhp /> */}
      
    </div>
  );
}

export default App;
