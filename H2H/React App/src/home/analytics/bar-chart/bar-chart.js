import React from 'react'
import {Bar} from 'react-chartjs-2';
import './bar-chart.css'
import 'chart.js/auto';

function BarChart(props) {

    function getOccurrence(array, value) {
        return array.filter((v) => (v.business_name === value)).length;
    }

    function getTotal(array, value){
        var sum=0;
        array.forEach((v)=>{
            if(v.business_name===value){
            sum+=v.total_open_amount;
            }
        })
        return sum;
    }

    const datas={
        labels:[...new Set(props.data.map(r=>r.business_name))],
        datasets:[
            {
                label: 'No of Customers',
                data: [...new Set(props.data.map(r=>r.business_name))].map(r=>getOccurrence(props.data,r)),
                backgroundColor: ['rgba(255, 176, 193,0.9)']
            },
            {
                label: 'Total Open Amount',
                data: [...new Set(props.data.map(r=>r.business_name))].map(r=>getTotal(props.data,r)),
                backgroundColor: ['rgba(144, 199, 236, 0.9)']
            }
        ]
    }

  return (
    <div className='chart'>
        <Bar data={datas}/>
    </div>
  )
}

export default BarChart;