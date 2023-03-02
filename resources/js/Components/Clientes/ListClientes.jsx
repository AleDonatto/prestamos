import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { Button, TextField, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { Link } from '@inertiajs/react';
import Swal from 'sweetalert2'

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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listClientes, setlistClientes] = useState([])
  const [auxClient, setauxClient] = useState([])
  const [search, setsearch] = useState('')
  const [grupos, setGrupos] = useState([]);
  const [minicipios, setminicipios] = useState([])

  const [listGrupo, setlistGrupo] = useState({
    grupo: 0
  })

  const [listMunicipios, setlistMunicipios] = useState({
    municipio: 0
  })

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
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
    })
    .catch(err => {
      console.log(err.response)
    })
  }

  const handlegetMunicipios = async () => {
    axios.get('/municipios/list')
    .then(res => {
      console.log(res.data)
      const dataMunicipios = res.data.listMunicipios 
      setminicipios(dataMunicipios)
    })
    .catch(err => {
      console.log(err.response)
    })
  }

  const handleConstClients = async () => {
    const data = {
      grupo: listGrupo.grupo,
      municipio: listMunicipios.municipio
    }

    if(listGrupo.grupo === 0 && listMunicipios.municipio === 0){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Seleccione Grupo y/o Municipio',
        showConfirmButton: true,
        timer: 10000
      })
    }else{
      axios.post('/clientes/params', data)
      .then(res => {
        console.log(res.data)
        setlistClientes(res.data.listClients)
      })
      .catch(err => {
        console.log(err.response)
      })
    }
  }

  const handleCreateList = () => {
    const data = {
      grupo: listGrupo.grupo,
      municipio: listMunicipios.municipio
    }

    axios.post('formatos/pagos', data)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err.response)
    })
  }


  useEffect(() => {
    handlegetClients()
    handlelistGrupos()
    handlegetMunicipios()
  }, [])

  useEffect(() => {
    handleSearchTable()
  }, [search])

  
  return (
    <div>
      <div className='mt-5 grid lg:grid-cols-6 md:grid-cols-1 gap-4'>
        <div className=''>
          <TextField label='Buscar' className='w-full' onChange={ (e) => setsearch(e.target.value)}/>
        </div>
        <div className='col-span-2 flex'>
          <div className='pr-2'>
            <FormControl className='w-48'>
              <InputLabel id="grupo">Grupo</InputLabel>
              <Select name='grupo' defaultValue={0} label="Grupo" onChange={(e) => {
                setlistGrupo({
                  ...listGrupo,
                  [e.target.name]: e.target.value
                }) 
              }}>
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
          <div className='pr-2'>
            <FormControl className='w-48'>
              <InputLabel id="municipio">Municipio</InputLabel>
              <Select name='municipio' defaultValue={0} label="Municipio" onChange={(e) => {
                setlistMunicipios({
                  ...listMunicipios,
                  [e.target.name]: e.target.value
                })
              }}>
                <MenuItem value={0}>
                  <em>Seleccione</em>
                </MenuItem>
                {
                  minicipios.map((item, index) => (
                    <MenuItem value={item.idMunicipio} key={'municipio'+item.idMunicipio}>{item.nombreMunicipio}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
        </div>
        <div className='col-span-2 flex mt-2'>
          <div className='pr-2'>
            <Button variant="outlined" type='button' onClick={handleConstClients}>Consultar Datos</Button>
          </div>
          <div className="pr-2">
            <Button variant="outlined" className='ml-2' type='button'>
              <a href={route('formatoCobro',{...listGrupo, ...listMunicipios})} target="_blank" rel="noopener noreferrer">Crear Lista</a>
            </Button>
          </div>
        </div>
        <div className='flex justify-items-end'>
          {/*<Button variant="outlined" endIcon={<RefreshIcon/>} className='mx-5' onClick={handleTableRollback}>Revertir</Button>*/}
          <Button variant="outlined" endIcon={<UpdateIcon/>} className='mx-5' onClick={handlegetClients}>Actualizar</Button>
        </div>
      </div>

      <div className='mt-10 grid lg:grid-cols-1 sm:grid-cols-1 gap-4'>
        <div>
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
