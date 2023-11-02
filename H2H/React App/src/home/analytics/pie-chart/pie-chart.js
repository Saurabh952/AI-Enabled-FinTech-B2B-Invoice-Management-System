import React from 'react'
import './pie-chart.css'
import {Pie} from 'react-chartjs-2';
import 'chart.js/auto';

function PieChart(props) {

    const color={
        'USD':'rgba(255, 176, 193,0.9)',
        'CAD':'rgba(144, 199, 236, 0.9)',
        'INR':'rgba(183, 244, 216, 0.9)'
    }

    function getOccurrence(array, value) {
        return array.filter((v) => (v.invoice_currency === value)).length;
    }

    const datas={
        labels:[props.selected],
        datasets:[
            {
                data: [getOccurrence(props.data,props.selected)],
                backgroundColor: [color[props.selected]]
            }
        ]
    }

  return (
    <div className='pie-chart'>
        {props.data && props.data.length>0 ? <Pie data={datas}/>:<p>Loading...</p>}
    </div>
  )
}

export default PieChart;