// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

// stacked bar chart
const BarChartGeneroDos = ({ApexBarChartData}): React$Element<any> => {
    // default options
    const apexBarChartStackedOpts = {
        chart: {
            height: 380,
            type: 'bar',
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            show: false,
        },
        xaxis: {
            categories: ApexBarChartData.axial,
        },
        yaxis: {
            title: {
                text: undefined,
            },
        },
        colors: ['#C0E38E', '#5AC32D'],
        tooltip: {
            y: {
                formatter: function (val) {
                    return val;
                },
            },
        },
        fill: {
            opacity: 1,
        },
        states: {
            hover: {
                filter: 'none',
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
        },
        grid: {
            borderColor: '#f1f3fa',
        },
    };

    // chart data
    const apexBarChartStackedData = [
      {
        name: 'Femenino',
        data:ApexBarChartData.femenino,
    },
    {
        name: 'Masculino',
        data: ApexBarChartData.masculino,
    },
    ];
//console.log('ApexBarChartData',ApexBarChartData);
    return (
        <Card>
            <Card.Body>
            <h4 className="header-title mb-3">{ApexBarChartData.programa}</h4>
                <Chart
                    options={apexBarChartStackedOpts}
                    series={apexBarChartStackedData}
                    type="bar"
                    className="apex-charts"
                />
            </Card.Body>
        </Card>
    );
};

export default BarChartGeneroDos;
