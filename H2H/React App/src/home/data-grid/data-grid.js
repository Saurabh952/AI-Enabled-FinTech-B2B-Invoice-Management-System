import React, { useEffect, useState } from 'react'
import './data-grid.css'
import {DataGrid} from '@material-ui/data-grid'
import Navbar from '../navbar/navbar';
import axios from 'axios';

const columns=[
    {field:'id', headerName: 'Sl no', width: 80, headerClassName: 'header'},
    {field:'business_code', headerName: 'Business Code', width: 120, headerClassName: 'header'},
    {field:'cust_number', headerName: 'Customer Number', width: 120, headerClassName: 'header'},
    {field:'clear_date', headerName: 'Clear Date', width: 100, headerClassName: 'header'},
    {field:'buisness_year', headerName: 'Business Year', width: 120, headerClassName: 'header'},
    {field:'doc_id', headerName: 'Document Id', width: 130, headerClassName: 'header'},
    {field:'posting_date', headerName: 'Posting Date', width: 110, headerClassName: 'header'},
    {field:'document_create_date', headerName: 'Document Create Date', width: 130, headerClassName: 'header'},
    {field:'due_in_date', headerName: 'Due Date', width: 120, headerClassName: 'header'},
    {field:'invoice_currency', headerName: 'Invoice Currency', width: 120, headerClassName: 'header'},
    {field:'document_type', headerName: 'Document Type', width: 130, headerClassName: 'header'},
    {field:'posting_id', headerName: 'Posting Id', width: 110, headerClassName: 'header'},
    {field:'total_open_amount', headerName: 'Total Open Amount', width: 120, headerClassName: 'header'},
    {field:'baseline_create_date', headerName: 'Baseline Create Date', width: 120, headerClassName: 'header'},
    {field:'cust_payment_terms', headerName: 'Customer Payment Terms', width: 120, headerClassName: 'header'},
    {field:'invoice_id', headerName: 'Invoice Id', width: 120, headerClassName: 'header'},
    {field:'aging_bucket', headerName: 'Aging Bucket', width: 100, headerClassName: 'header'}
]

function Data(props) {

  const [data,setData]=useState([]);
  const [rowCount,setRowCount]=useState(0);
  const [state, setState] = useState({
    pageNo: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState([
    { field: '', sort: '' },
  ]);
  const [isFetching, setIsFetching]=useState(false);
  const [disabledEdit, setIsDisabledEdit]=useState(true);
  const [disabledDelete, setIsDisabledDelete]=useState(true);
  const [selectedData, setSelectedData]=useState([]);
  const [selectedPrediction, setSelectedPrediction]=useState([]);
  const [params ,setParams]=useState({
    id:'',
    doc:'',
    invoice:'',
    byear:''
  })
  const [editData,setEditData]=useState({
    invoice:'',
    cust_payment_terms: ''
  });

  useEffect(()=>{
      setData([]);
      setIsFetching(true);
      axios.get(`http://localhost:8080/H2H/display?page=${state.pageNo+1}&limit=${state.pageSize}&id=${params.id}&doc=${params.doc}&invoice=${params.invoice}&byear=${params.byear}&sort=${sortModel[0].field}&order=${sortModel[0].sort}`)
      .then(res=>{setData(res.data.data);setRowCount(res.data.count)})
      .finally(()=>{setIsFetching(false)})
  },[state,params,sortModel])

  function search(searchId){
    setData([]);
    if(searchId===''){
      setParams({
        id:'',
        doc:'',
        invoice:'',
        byear:''
      })
      setState({pageNo:0,pageSize:10})
    }
    else{
      setParams({
        id:searchId,
        doc:'',
        invoice:'',
        byear:''
      })
      setState({pageNo:0,pageSize:10})
    }
  }

  function onAdvanceSearch(doc_id,invoice_id,cust_no,business_year){
    setData([]);
    setIsFetching(true);
    setParams({id:cust_no,doc:doc_id,invoice: invoice_id,byear:business_year})
  }

  function onRefresh(){
    setData([]);
    setIsFetching(true);
    axios.get(`http://localhost:8080/H2H/display?page=${state.pageNo+1}&limit=${state.pageSize}&id=${params.id}&doc=${params.doc}&invoice=${params.invoice}&byear=${params.byear}&sort=${sortModel[0].field}&order=${sortModel[0].sort}`)
      .then(res=>{setData(res.data.data);setRowCount(res.data.count)})
      .finally(()=>{setIsFetching(false)})
  }

  function onSelection(row){
    setSelectedData(row);
    setSelectedPrediction(row.map(r=>data.filter(x=>x.id===r)[0]))
    if(row.length===1){
      setEditData({invoice:([...data].filter(x=>x.id===row[0])[0]).invoice_currency,cust_payment_terms:([...data].filter(x=>x.id===row[0])[0]).cust_payment_terms});
      setIsDisabledEdit(false);
      setIsDisabledDelete(false);
    }
    else if(row.length>1){
      setIsDisabledEdit(true);
      setIsDisabledDelete(false);
    }
    else{
      setIsDisabledEdit(true);
      setIsDisabledDelete(true);
      setSelectedPrediction([]);
    }
  }

  const handleSortModelChange = (newModel) => {
    if(newModel.length>0){
      if(newModel[0].field==='id'){
        setSortModel([
          { field: 'sl_no', sort: newModel[0].sort },
        ]);
      }
      else{
        setSortModel(newModel);
      }
    }
    else{
      setSortModel([
        { field: '', sort: '' },
      ]);
    }
  };

  return (
    <div>
    <Navbar search={search} advanceSearch={onAdvanceSearch} refresh={onRefresh} disabledEdit={disabledEdit} disabledDelete={disabledDelete} data={selectedData} editData={editData} predictData={selectedPrediction}/>
    <div style={{height:'381px',width:'100%'}} className='data-div'>
        <DataGrid
            rows={data}
            columns={columns}
            rowCount={rowCount}
            loading={isFetching}
            checkboxSelection={true}
            rowHeight={25}
            rowsPerPageOptions={[10, 20, 30]}
            page={state.pageNo}
            disableColumnMenu
            pagination
            {...state}
            paginationMode="server"
            onPageChange={(page) => setState((prev) => ({ ...prev, pageNo:page }))}
            onPageSizeChange={(newPageSize) => setState((prev) => ({ ...prev, pageSize:newPageSize }))}
            onSelectionModelChange={row=>onSelection(row)}
            onSortModelChange={handleSortModelChange}
            headerHeight={62}
            getRowClassName={(params) => 'row'}
        />
    </div>
    </div>
  )
}

export default Data;
