import React, { useEffect, useState, useRef } from 'react'
import Paper from '@mui/material/Paper';
import { Button, TextField, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import { DataGrid } from '@mui/x-data-grid';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { FormClientesRenovacion } from '@/Components/Clientes/FormClientesRenovacion';

export const ListClientesCreditos = (props) => {
  let aux = []
  let aux1 = []
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listClientes, setlistClientes] = useState([])
  const [auxClient, setauxClient] = useState([])
  const [search, setsearch] = useState('')
  const [grupos, setGrupos] = useState([]);
  const [grupo, setgrupo] = useState(0)
  const [mostrarFormCliente, setMostrarFormCliente] = useState(false)
  
  const [clienteRenovacionSeleccionado, setClienteRenovacionSeleccionado] = useState({});
  const [onReload, setOnReload] = useState(false);
    
  const gridRef = useRef(null);

  useEffect(() => {
    setOnReload(props.onReload);
    if (props.onReload != onReload) {
      reloadList()
      setOnReload(props.onReload)
    }  
  }, [props.onReload]);

  const irAFormRenovacion = (e, item) => {
    setClienteRenovacionSeleccionado(item)
    setMostrarFormCliente(true)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchTable = () => {
    handleTableRollback()

    if(search != ''){
      let aux = listClientes

      let searchClients = aux.filter( clients => (clients.nombre||'').toLowerCase().match(search.toLowerCase())
      || (clients.apellido_paterno||'').toLowerCase().match(search.toLowerCase())
      || (clients.apellido_materno||'').toLowerCase().match(search.toLowerCase())
      || (clients.nombreGrupo||'').toLowerCase().match(search.toLowerCase())
      || (clients.municipio||'').toLowerCase().match(search.toLowerCase())
      || (clients.curp||'').toLowerCase().match(search.toLowerCase())
      )
      setlistClientes(searchClients)
    }
  }

  const handleClick = (event, cellValues) => {
      console.log(cellValues.row);
  };

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const reloadList = () => {
    setMostrarFormCliente(false)
    setClienteRenovacionSeleccionado([])
    handlegetClients()
    handlelistGrupos()
  }

  const columnsGrid = [
    { field: 'credito', headerName: 'Credito',  width: 130},
    { field: 'cliente', headerName: 'Cliente',  width: 330},
    { field: 'capital', headerName: 'Capital',  width: 130},
    { field: 'pagoRegular', headerName: 'Pago regular',  width: 130},
    {
      field: "Pagos",
      width: 130,
      renderCell: (cellValues) => {
        let btnRenovacion = cellValues.row.plazosPagados >= 10 ? <Button size="small" variant="contained"  onClick={(e) => { irAFormRenovacion(e, cellValues.row) }}>R</Button> : null;  
        return (
          <div>
            { btnRenovacion } <span> { cellValues.row.pagos } </span> 
          </div>
        );
      }
    },
    { field: 'poblados', headerName: 'Poblados',  width: 230},
  ];
  const handleTableRollback = () => {
    setlistClientes(auxClient)
  }

  const handlegetClients = () => {
    axios.post('/creditos', {grupo})
    .then(res => {
      setlistClientes(res.data.datos)
      setauxClient(res.data.datos)
    })
    .catch( err => {
      console.log(err.response)
    })
  }

  const handlelistGrupos = async () => {
    await axios.get('/grupos/list')
    .then(res => {
      //console.log(res.data)
      const listGruposData = res.data.grupos
      setGrupos(listGruposData)
      aux = res.data.grupos
      aux1 = res.data.grupos
    })
    .catch(err => {
      console.log(err.response)
    })
  }

  const handleSelectGrupo = (e) => {
    setgrupo(e.target.value);
    handlegetClients()
    
  }

  const handleFilterGrupo = () => {
    handlegetClients()
  }

  const handleCheckSelection = (data) => {
    props.getCheckedData( listClientes.filter( cliente =>  data.includes(cliente.credito) ) );
  };


  useEffect(() => {
    handlegetClients()
    handlelistGrupos()
  }, [])

  useEffect(() => {
    handleSearchTable()
  }, [search])

  useEffect(() => {
    //handleTableRollback()
    handleFilterGrupo()
  }, [grupo])

  return (
    <div>

      {
        mostrarFormCliente ? 
          <FormClientesRenovacion closeForm={reloadList} cliente={clienteRenovacionSeleccionado} />
        : 
        <div>   
          <div className='mt-5 grid lg:grid-cols-3 sm:grid-cols-1 gap-2'>
            <div className='flex justify-start'>
              <TextField label='Cliente' onChange={ (e) => setsearch(e.target.value)}/>
            </div>
            <div className='flex justify-start'>
              <div className=''>
                <FormControl className='w-40'>
                  <InputLabel id="grupo">Grupo</InputLabel>
                  <Select name='grupo' defaultValue={0} label="Grupo" onChange={handleSelectGrupo}>
                    <MenuItem value={0}>
                      <em>Seleccione</em>
                    </MenuItem>
                    {
                      grupos.map((item, index) => (
                        <MenuItem value={item.idGrupo} key={'grupo'+item.idGrupo}>{item.nombreGrupo}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </div>
              <div className='ml-5 mt-2'>
                <Button variant="outlined" type='button' onClick={handleTableRollback}>Restaurar</Button>
              </div>
            </div>
            <div className='flex justify-end'>
              {/*<Button variant="outlined" endIcon={<RefreshIcon/>} className='mx-5' onClick={handleTableRollback}>Revertir</Button>*/}
              <Button variant="outlined" endIcon={<UpdateIcon/>} className='mx-5' onClick={handlegetClients}>Actualizar</Button>
              <a href={route('formatoCobro')} target="_blank" rel="noopener noreferrer"className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
                <FileOpenIcon/>
              </a>
            </div>
          </div>
          <div className='mt-10 grid lg:grid-cols-1 sm:grid-cols-1 gap-4'>
            <div >
              <Paper>
                <div style={{ height: 500, width: "100%" }}>
                  <DataGrid
                    getRowId={(row) => row.credito}
                    rows={listClientes}
                    columns={columnsGrid}
                    checkboxSelection
                    rowsPerPage={25}
                    onCellClick={handleCellClick}
                    onRowClick={handleRowClick}
                    onSelectionModelChange={handleCheckSelection}
                    ref={gridRef}
                  />
                </div>
              </Paper>
            </div>
          </div>
        </div>
        
      }


    </div>
  )
}
