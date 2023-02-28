import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { Button, TextField, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { Link } from '@inertiajs/react';

const handleClick = (event, cellValues) => {
    console.log(cellValues.row);
};
  
const handleCellClick = (param, event) => {
  event.stopPropagation();
};
  
const handleRowClick = (param, event) => {
  event.stopPropagation();
};
  
const columnsGrid = [
  { field: 'nombre', headerName: 'Nombre',  width: 130},
  { field: 'apellido_paterno', headerName: 'Apellido Paterno', width: 130},
  { field: 'apellido_materno',headerName: 'Apellido Materno', width: 130},
  { field: 'curp',headerName: 'CURP', width: 130},
  //{ field: 'telefono',headerName: 'Telefono', width: 130},
  { field: 'celular',headerName: 'Celular', width: 130},
  { field: 'nombreGrupo',headerName: 'Grupo', width: 130},
  { field: 'nombreMunicipio',headerName: 'Municipio', width: 130},
  { field: 'poblado', headerName: 'Colonia', width: 130},
  {
    field: "Actions",
    renderCell: (cellValues) => {
      return (
        <div>
          {/*<Button
          className='px-2'
          variant="text"
          endIcon={<EditIcon />}
          onClick={(event) => {
            handleClick(event, cellValues);
          }}
          >
        </Button>*/}
          {
            <Link href={route('editCliente', cellValues.row.idCliente)}>
              <EditIcon />
            </Link>
          }
        </div>
      );
    }
  }
];

export const ListClientes = () => {
  let aux = []
  let aux1 = []
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listClientes, setlistClientes] = useState([])
  const [auxClient, setauxClient] = useState([])
  const [search, setsearch] = useState('')
  const [grupos, setGrupos] = useState([]);
  const [grupo, setgrupo] = useState(0)

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

  const handleTableRollback = () => {
    setlistClientes(auxClient)
    //console.log('rollback')
  }

  const handlegetClients = () => {
    axios.get('/clientes/list')
    .then(res => {
      //console.log(res.data)
      setlistClientes(res.data.clientes)
      setauxClient(res.data.clientes)
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
  }

  const handleFilterGrupo = () => {

    if(grupo > 0){
      let auxClientes = listClientes
      let filterTable = auxClientes.filter(clients => clients.grupo_id === grupo)
      console.log(filterTable)
      setlistClientes(filterTable)
      
    }
  }

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
      <div className='mt-5 grid lg:grid-cols-3 sm:grid-cols-1 gap-2'>
        <div className='flex justify-start'>
          <TextField label='Buscar' onChange={ (e) => setsearch(e.target.value)}/>
          {/*<Button variant="contained" onClick={handleSearchTable}>Buscar</Button>*/}
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
                getRowId={(row) => row.idCliente}
                rows={listClientes}
                columns={columnsGrid}
                checkboxSelection
                pageSize={25}
                onCellClick={handleCellClick}
                onRowClick={handleRowClick}
              />
            </div>
          </Paper>
        </div>
      </div>
    </div>
  )
}
