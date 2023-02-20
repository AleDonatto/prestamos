import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import FileOpenIcon from '@mui/icons-material/FileOpen';

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
  { field: 'telefono',headerName: 'Telefono', width: 130},
  { field: 'celular',headerName: 'Celular', width: 130},
  { field: 'nombreGrupo',headerName: 'Grupo', width: 130},
  { field: 'municipio',headerName: 'Municipio', width: 130},
  {
    field: "Actions",
    renderCell: (cellValues) => {
      return (
        <Button
          className='px-2'
          variant="text"
          endIcon={<EditIcon />}
          onClick={(event) => {
            handleClick(event, cellValues);
          }}
        >
        </Button>
      );
    }
  }
];

export const ListClientes = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listClientes, setlistClientes] = useState([])
  const [auxClient, setauxClient] = useState([])
  const [search, setsearch] = useState('')

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
    console.log('rollback')
  }

  const handlegetClients = () => {
    axios.get('/clientes/list')
    .then(res => {
      console.log(res.data)
      setlistClientes(res.data.clientes)
      setauxClient(res.data.clientes)
    })
    .catch( err => {
      console.log(err.response)
    })
  }

  useEffect(() => {
    handlegetClients()
  }, [])

  useEffect(() => {
    handleSearchTable()
  }, [search])
  
    

  return (
    <div>
      <div className='mt-5 grid lg:grid-cols-2 sm:grid-cols-1 gap-4'>
        <div className='flex justify-start'>
          <TextField label='Buscar' onChange={ (e) => setsearch(e.target.value)}/>
          {/*<Button variant="contained" onClick={handleSearchTable}>Buscar</Button>*/}
        </div>
        <div className='flex justify-end px-5'>
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
                    rowsPerPage={25}
                    onCellClick={handleCellClick}
                    onRowClick={handleRowClick}
                  />
                  </div>
              
                  {/*<TableContainer>
                      <Table>
                          <TableHead>
                              <TableRow>
                              {columns.map((column) => (
                                  <TableCell
                                  key={column.id}
                                  align={column.align}
                                  className="font-bold"
                                  >
                                  {column.label}
                                  </TableCell>
                              ))}
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {listClientes
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row) => {
                                  return (
                                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                                      {columns.map((column) => {
                                      const value = row[column.id];
                                      return (
                                          <TableCell key={column.id} align={column.align}>
                                          {column.format && typeof value === 'number'
                                              ? column.format(value)
                                              : value}
                                          </TableCell>
                                      );
                                      })}
                                  </TableRow>
                                  );
                              })}
                          </TableBody>
                      </Table>
                  </TableContainer>
                  <TablePagination
                      rowsPerPageOptions={[5,10, 25, 100]}
                      component="div"
                      count={listClientes.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                          />*/}
              </Paper>
          </div>
      </div>
    </div>
  )
}
