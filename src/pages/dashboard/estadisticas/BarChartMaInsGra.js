// @flow
import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';

// simple bar chart
const BarChart = ({ApexBarChartData}): React$Element<any> => {
    // default options
    const apexBarChartOpts = {
        chart: {
            height: 380,
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff'],
            },
        },
        colors: ['#C0E38E', '#5AC32D', '#3DAC4C', '#6c757d'],
        stroke: {
            show: true,
            width: 1,
            colors: ['#fff'],
        },

        xaxis: {
            categories: ApexBarChartData?.axial,
        },
        legend: {
            offsetY: -10,
        },
        states: {
            hover: {
                filter: 'none',
            },
        },
        grid: {
            borderColor: '#f1f3fa',
        },
    };

    // chart data
    const apexBarChartData = [
      {
        name: 'graduados',
        data:ApexBarChartData?.graduados,
    },
    {
        name: 'inscritos',
        data: ApexBarChartData?.inscritos,
    },
    {
        name: 'admitidos',
        data:ApexBarChartData?.admitidos,
    },
    {
        name: 'matriculados',
        data: ApexBarChartData?.admitidos,
    },
    ];

    return (
        <Card>
            <Card.Body>
              <h4 className="header-title mb-3">{ApexBarChartData?.programa}</h4>
                <Chart options={apexBarChartOpts} series={apexBarChartData} type="bar" className="apex-charts" />
            </Card.Body>
        </Card>
    );
};

export default BarChart;
