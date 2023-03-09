import React, { useEffect, useState, useRef } from 'react'
import Paper from '@mui/material/Paper';
import { Button, TextField, FormControl, Select, InputLabel, MenuItem, Modal, Box, Typography, Link, Tooltip } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import { DataGrid } from '@mui/x-data-grid';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { FormClientesRenovacion } from '@/Components/Clientes/FormClientesRenovacion';
import Swal from 'sweetalert2'

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
  const [minicipios, setminicipios] = useState([])
  const [clienteBuscar, setClienteBuscar] = useState('')
  const [clienteRenovacionSeleccionado, setClienteRenovacionSeleccionado] = useState({});
  const [onReload, setOnReload] = useState(false);
  const gridRef = useRef(null);
  const [listPagos, setListPagos] = useState([])
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null)
  
  const [open, setOpen] = useState(false);
  const handleOpen = (e, cliente) => {
    axios.post('/aplicar-pagos-get-by-client', {
      cliente
    })
    .then(res => {
      setClienteSeleccionado(cliente)
      setListPagos(res.data.datos)
      setOpen(true)

    })
    .catch( err => {
      console.log(err.response)
    })
  };
  const handleClose = () => {
    setOpen(false)
  };

  const handleDeletePago = (e, id) => {
    e.preventDefault()
    axios.post('/aplicar-pagos-delete', {
      id
    })
    .then(res => {
      handlegetClients()
      handleOpen(e, clienteSeleccionado)
      Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Pago eliminado exitosamente, lista actualizada',
          showConfirmButton: false,
          timer: 10000
      })
    })
    .catch( err => {
      console.log(err.response)
    })

  } 

  const [listGrupo, setlistGrupo] = useState({
    grupo: 0
  })

  const [listMunicipios, setlistMunicipios] = useState({
    municipio: 0
  })

    
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 390,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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
    props.formIsOpen(true)
  }
  
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
  
  const handlegetMunicipios = async () => {
    axios.get('/municipios/list')
    .then(res => {
      const dataMunicipios = res.data.listMunicipios 
      setminicipios(dataMunicipios)
    })
    .catch(err => {
      console.log(err.response)
    })
  }

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const reloadList = () => {
    setMostrarFormCliente(false)
    props.formIsOpen(false)
    setClienteRenovacionSeleccionado([])
    handlegetClients()
    handlelistGrupos()
  }

  const columnsGrid = [
    { field: 'credito', headerName: 'Credito',  width: 70},
    { field: 'cliente', headerName: 'Cliente',  width: 330},
    { field: 'capital', headerName: 'Capital',  width: 110},
    { field: 'pagoRegular', headerName: 'Pago regular',  width: 110},
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
    { field: 'nombreMunicipio', headerName: 'Municipio',  width: 130},
    { field: 'poblados', headerName: 'Poblados',  width: 130},
    {
      field: "Acciones",
      width: 130,
      renderCell: (cellValues) => {
        return (
          <Tooltip title="Lista de pagos" placement="top-start">
            <Link onClick={(e) => { handleOpen(e, cellValues.row.idCliente) }}>
              <LocalAtmIcon />
            </Link>
          </Tooltip>
        );
      }
    },
    
  ];

  
  const columnsGridPagos = [
    { field: 'id', headerName: 'Id. Pago',  width: 70},
    { field: 'fechaPago', headerName: 'Fecha pago',  width: 120},
    {
      field: "Acciones",
      width: 110,
      renderCell: (cellValues) => {
        return (
          <Tooltip title="Eliminar pago" placement="top-start">
            <Link onClick={(e) => { handleDeletePago(e, cellValues.row.id) }} >
              <LocalAtmIcon />
            </Link>
          </Tooltip>
        );
      }
    },
    
  ];

  const handleTableRollback = () => {
    setlistClientes(auxClient)
  }

  const handlegetClients = () => {
    let params = {
      grupo : listGrupo.grupo,
      municipio : listMunicipios.municipio,
      cliente : clienteBuscar,
    }
    
    axios.post('/creditos', params)
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
      const listGruposData = res.data.grupos
      setGrupos(listGruposData)
      aux = res.data.grupos
      aux1 = res.data.grupos
    })
    .catch(err => {
      console.log(err.response)
    })
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
    handlegetMunicipios()
  }, [])

  useEffect(() => {
    handleSearchTable()
  }, [search])

  useEffect(() => {
    handleFilterGrupo()
  }, [grupo])

  return (
    <div>
      {
        mostrarFormCliente ? 
          <FormClientesRenovacion closeForm={reloadList} cliente={clienteRenovacionSeleccionado} />
        : 
        <div>   
          <div className='mt-5 grid lg:grid-cols-6 md:grid-cols-1 gap-4'>
            <div className=''>
              <TextField label='Buscar' className='w-full' onChange={ (e) => setClienteBuscar(e.target.value)}/>
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
                        <MenuItem value={item.idGrupo} key={'grupo'+item.idGrupo}>{item.idGrupo}</MenuItem>
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
                <Button variant="outlined" type='button' onClick={handlegetClients}>Consultar Datos</Button>
              </div>
              <div className="pr-2">
                <Button variant="outlined" className='ml-2' type='button'>
                  <a href={route('formatoCobro',{...listGrupo, ...listMunicipios})} target="_blank" rel="noopener noreferrer">Crear Lista</a>
                </Button>
              </div>
            </div>
            <div className='flex justify-items-end'>
              <Button variant="outlined" endIcon={<UpdateIcon/>} className='mx-5' onClick={handlegetClients}>Actualizar</Button>
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

      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ height: 500 }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pagos realizados
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, height: '100%' }}>
            <DataGrid
              style={{ height: '80%' }}
              getRowId={(row) => row.id}
              rows={listPagos}
              columns={columnsGridPagos}
              rowsPerPage={15}
              hideFooterPagination={true}
              hideFooter={true}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
