import React, { useEffect, useState, useRef } from 'react'
import Paper from '@mui/material/Paper';
import { Button, TextField, FormControl, Select, InputLabel, MenuItem, Modal, Box, Typography, Link, Tooltip } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import { DataGrid } from '@mui/x-data-grid';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
  const [mostrarApartado, setMostrarApartado] = useState('main')
  const [open, setOpen] = useState(false);
  const [idPagoSeleccionado, setIdPagoSeleccionado] = useState(null);
  const [nipValidar, setNipValidar] = useState('');
  
  const handleOpen = (e, cliente) => {
    axios.get('/mostrar-control-pago/' +  cliente)
    .then(res => {
      console.log("Mostrar control de pagos")
      setClienteSeleccionado(cliente)
      handleClienteSelection(cliente)
      setListPagos(res.data)
      setMostrarApartado('payments')
      props.apartadoActual('payments')
    })
    .catch( err => {
      console.log(err.response)
    })
  };
  const handleClose = () => {
    setOpen(false)
  };

  const handleDeletePago = (e, id) => {
    if(e != null){
      e.preventDefault()
    }
    setOpen(false)
    axios.delete('/control-pagos-delete/' + id)
    .then(res => {
      handlegetClients()
      handleOpen(e, clienteSeleccionado)
      
      Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Pago eliminado exitosamente, lista actualizada',
          showConfirmButton: false,
          timer: 3000
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
    height: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    setOnReload(props.onReload);
    if (props.onReload != onReload) {
      console.log('Reload')
      reloadList()
      setOnReload(props.onReload)
    }  
  }, [props.onReload]);

  const irAFormRenovacion = (e, item) => {
    setClienteRenovacionSeleccionado(item)
    // setMostrarFormCliente(true)
    setMostrarApartado('form')
    props.apartadoActual('form')
    
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
    console.log('mostrarApartado')
    console.log(mostrarApartado)
    if(mostrarApartado != 'payments') {
      handlegetClients()
      setClienteRenovacionSeleccionado([])
      handlelistGrupos()
      props.formIsOpen(false)
      setMostrarApartado('main')
      props.apartadoActual('main')
    } else {
      console.log('clienteSeleccionado')
      console.log(clienteSeleccionado)
      handleOpen(null, clienteSeleccionado)
    }
  }

  const backPage = () => {
      handlegetClients()
      setClienteRenovacionSeleccionado([])
      handlelistGrupos()
      props.formIsOpen(false)
      setMostrarApartado('main')
      props.apartadoActual('main')
  }


  const openPayments = () => {
    props.formIsOpen(true)
    setMostrarApartado('main')
    props.apartadoActual('main')
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
        let btnRenovacion = cellValues.row.plazosPagados >= 10 ? <Button size="small" type='button' variant='contained' onClick={(e) => { irAFormRenovacion(e, cellValues.row) }}>R</Button> : null;  
        return (
          <div>
            { btnRenovacion } <span> { cellValues.row.pagos } </span> 
          </div>
        );
      }
    },
    { field: 'nombreGrupo', headerName: 'Grupo',  width: 130},
    { field: 'nombreMunicipio', headerName: 'Municipio',  width: 130},
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
              <DeleteIcon />
            </Link>
          </Tooltip>
        );
      }
    },
    
  ];

  const handleOpenModal = (e, idPago) => {
    setIdPagoSeleccionado(idPago)
    setOpen(true)

    //handleDeletePago(e, pago.id)
  }

  const validarNIP = () => {
    console.log(nipValidar)
    if(nipValidar == 1234) {
      handleDeletePago(null, idPagoSeleccionado)
    } else {
      setOpen(false)
      Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'El NIP es erroneo',
          showConfirmButton: false,
          timer: 3000
      })
    }
  }

  const handleTableRollback = () => {
    setlistClientes(auxClient)
  }

  const handlegetClients = () => {
    let params = {
      grupo : listGrupo.grupo,
      municipio : listMunicipios.municipio,
      cliente : clienteBuscar,
      mostrarCarteraFinalizada : props.mostrarFinalizados,
    }
    
    axios.post('/control-pagos-lista', params)
    .then(res => {
      setlistClientes(res.data.datos)
      setauxClient(res.data.datos)
    })
    .catch( err => {
      console.log(err.response)
    })
  
  }

  const descargarReporte = () => {
    axios.post('/aplicar-pagos-pdf', {datos : listClientes}, { 
      headers: { 'Content-Type': 'multipart/form-data' },
      'responseType': 'blob' 
    })
    .then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporeteAplicacionPagos.pdf');
      document.body.appendChild(link);
      link.click();
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
    // props.getCheckedData( listClientes.filter( cliente =>  data.includes(cliente.credito) ) );
    props.getCheckedData( data );
  };

  const handleClienteSelection = (data) => {
    props.getCheckedData( [data] );
  };

  const setClasesPagos = (status) => {
    let styleGeneral = " border-2 border-black text-center align-middle h-48 pt-5"
    if(status == 'vencido') {
      return 'bg-rose-500 ' + styleGeneral
    } else if (status == 'pendiente') {
      return 'bg-sky-50 ' + styleGeneral
    } else {
      return 'bg-green-500 ' + styleGeneral
    }
  } 

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
    <div className='pb-5'>

      {
        mostrarApartado == 'form' ? 
          <FormClientesRenovacion closeForm={reloadList} cliente={clienteRenovacionSeleccionado} />
        : null
      }

      {
        mostrarApartado == 'main' ? 
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
                <Tooltip title="Descargar reporte" placement="top-start">
                  <Button variant="outlined" endIcon={<UpdateIcon/>} className='mx-5' onClick={descargarReporte}>Descargar reporte</Button>
                </Tooltip>
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
                    getRowId={(row) => row.idCliente}
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
        : null
      }

      { 
        mostrarApartado == 'payments' 
        ?
          <div>
            <div className='mb-5'>
              <Button onClick={backPage}>Regresar</Button>
            </div>
            <div className="grid grid-cols-14 ">
              { listPagos?.map( (pago)  => <div className={setClasesPagos(pago.status_pago)} > <div style={{ left: 'calc(50% - 0.5rem)', lineHeight: '1', paddingTop: '0.5rem', position: 'relative', transform: 'rotate(182deg)', whiteSpace: 'nowrap', writingMode: 'vertical-rl', bottom: '1px !important' }} >{pago.fechaSemana}</div> { pago.status_pago == 'pagado' ? <Link> <DeleteIcon onClick={(e) => {handleOpenModal(e, pago.id)}} /> </Link> : null } </div>) }
            </div>
            
          </div>
        : null
      }

      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ height: 500 }}
        className="mt-5 p-5"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Se requiere NIP de autorización para eliminar el pago. 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, height: '100%' }}>
            <TextField className='w-full' onChange={(val) => {setNipValidar(val.target.value)} }></TextField>
            <Button type='button' variant='contained' onClick={validarNIP}> Eliminar pago </Button>
          </Typography>
        </Box>
      </Modal>

    </div>
  )
}
