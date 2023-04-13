import React,{memo} from 'react';
import { Row, Card,Tab,Nav,Col } from 'react-bootstrap';
import classnames from 'classnames';
//import BarChart from '../estadisticas/BarChart';
//import BarChartVertical from '../estadisticas/BarChartVertical';
import Chart from 'react-apexcharts';
//import DonutChart from '../estadisticas/DonutChart';
const GraficaFecha = ({barChartData}) => {
console.log(barChartData)    // default options
const apexDonutOpts = {
    chart: {
        height: 320,
        type: 'pie',
    },
    labels: barChartData.labels,
    colors: ['#C0E38E', '#5AC32D', '#3DAC4C', '#6c757d', '#ffbc00', '#39afd1'],
    legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: -10,
    },
    responsive: [
        {
            breakpoint: 600,
            options: {
                chart: {
                    height: 240,
                },
                legend: {
                    show: false,
                },
            },
        },
    ],
};
const apexDonutOpts2 = {
  chart: {
      height: 320,
      type: 'pie',
  },
  labels: barChartData.labels,
  colors: ['#C0E38E', '#5AC32D', '#3DAC4C', '#6c757d', '#ffbc00', '#39afd1'],
  legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      verticalAlign: 'middle',
      floating: false,
      fontSize: '14px',
      offsetX: 0,
      offsetY: -10,
  },
  responsive: [
      {
          breakpoint: 600,
          options: {
              chart: {
                  height: 240,
              },
              legend: {
                  show: false,
              },
          },
      },
  ],
};
// chart data
const apexDonutData1 = barChartData.apexDonutData1;
const apexDonutData2 = barChartData.apexDonutData2;

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
  colors: ['#39afd1', '#ffbc00', '#6c757d','#C0E38E', '#5AC32D', '#3DAC4C'],
  stroke: {
      show: true,
      width: 1,
      colors: ['#fff'],
  },

  xaxis: {
      categories: barChartData.axial,
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
const apexBarChartData = barChartData.apexBarChartData;

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
      categories: barChartData.axial,
      labels: {
          formatter: function (val) {
              return val + 'K';
          },
      },
  },
  yaxis: {
      title: {
          text: undefined,
      },
  },
  colors: ['#C0E38E', '#5AC32D', '#3DAC4C', '#6c757d', '#ffbc00', '#39afd1'],
  tooltip: {
      y: {
          formatter: function (val) {
              return val + 'K';
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

return (
    <>
          <Row>
        <Card>
          <Card.Body>
            <Tab.Container defaultActiveKey="1">
              <Nav variant="tabs" className="nav-bordered" as="ul">
                    <Nav.Item as="li" key={'1'}>
                      <Nav.Link href="#" eventKey={'1'} >
                        <i className={classnames('d-md-none', 'd-block', 'me-1')}></i>
                        <span className="d-none d-md-block">Vertical</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" key={'2'}>
                      <Nav.Link href="#" eventKey={'2'} >
                        <i className={classnames('d-md-none', 'd-block', 'me-1')}></i>
                        <span className="d-none d-md-block">Dona</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" key={'3'}>
                      <Nav.Link href="#" eventKey={'3'} >
                        <i className={classnames('d-md-none', 'd-block', 'me-1')}></i>
                        <span className="d-none d-md-block">Horizontal</span>
                      </Nav.Link>
                    </Nav.Item>
              </Nav>
              <Tab.Content className="px-4 pb-4 pt-0 mx-auto">
                    <Tab.Pane eventKey={'1'}  id={'1'} key={'1'}>
                      <br/>
                    <h4 className="header-title mb-3">{barChartData?.programa}</h4>
                      <Chart options={apexBarChartOpts} series={apexBarChartData} type="bar" className="apex-charts" />
                      </Tab.Pane>
              </Tab.Content>
              <Tab.Content className="px-4 pb-4 pt-0 mx-auto">
                    <Tab.Pane eventKey={'2'}  id={'2'} key={'2'} >
                    <Row>
                       <Col xl={6}>
                        <h4 className="header-title mb-3">I Semestre</h4>
                        <Chart options={apexDonutOpts} series={apexDonutData1} type="pie" height={320} className="apex-charts" />
                        </Col>
                        <Col xl={6}>
                        <h4 className="header-title mb-3">II Semestre</h4>
                        <Chart options={apexDonutOpts2} series={apexDonutData2} type="donut" height={320} className="apex-charts" />

                       </Col>
                   </Row>
                      </Tab.Pane>
              </Tab.Content>
              <Tab.Content className="px-4 pb-4 pt-0 mx-auto">
                    <Tab.Pane eventKey={'3'}  id={'3'} key={'3'} >
                    <h4 className="header-title mb-3">{barChartData?.programa}</h4>
                     <Chart
                    options={apexBarChartStackedOpts}
                    series={apexBarChartData}
                    type="bar"
                    className="apex-charts"
                />
                      </Tab.Pane>
              </Tab.Content>
            </Tab.Container>

          </Card.Body>
        </Card>
      </Row>
    </>
    );
};
export default memo(GraficaFecha);
