import React,{memo} from 'react';
import { Row, Card,Tab,Nav,Col } from 'react-bootstrap';
import classnames from 'classnames';
//import BarChart from '../estadisticas/BarChart';
//import BarChartVertical from '../estadisticas/BarChartVertical';
import Chart from 'react-apexcharts';
//import DonutChart from '../estadisticas/DonutChart';
const GraficaInscritos = ({barChartData}) => {
    // default options

// chart data

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
  colors: ['#C0E38E', '#5AC32D', '#3DAC4C', '#6c757d', '#ffbc00', '#39afd1'],
  stroke: {
      show: true,
      width: 1,
      colors: ['#fff'],
  },

  xaxis: {
      categories: barChartData.labels1,
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
const apexBarChartOpts2 = {
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
    categories: barChartData.labels2,
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
colors: ['#727cf5', '#0acf97', '#fa5c7c', '#6c757d', '#39afd1'],
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
// chart data
const apexBarChartData = barChartData.ChartUno.apexBarChartData1;
const apexBarChartData2 = barChartData.ChartUno.apexBarChartData2;
console.log(barChartData.ChartUno)

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
                    <Row>
                       <Col xl={6}>
                        <h4 className="header-title mb-3">{barChartData?.labels1}</h4>
                        <Chart options={apexBarChartOpts} series={apexBarChartData} type="bar" className="apex-charts" />
                        </Col>
                        <Col xl={6}>
                        <h4 className="header-title mb-3">{barChartData?.labels2}</h4>
                        <Chart options={apexBarChartOpts2} series={apexBarChartData2} type="bar" className="apex-charts" />
                       </Col>
                   </Row>

                      </Tab.Pane>
              </Tab.Content>
              <Tab.Content className="px-4 pb-4 pt-0 mx-auto">
                    <Tab.Pane eventKey={'2'}  id={'2'} key={'2'} >
                    <Row>
                       <Col xl={6}>
                        <h4 className="header-title mb-3">I Semestre</h4>

                        </Col>
                        <Col xl={6}>
                        <h4 className="header-title mb-3">II Semestre</h4>

                       </Col>
                   </Row>
                      </Tab.Pane>
              </Tab.Content>
              <Tab.Content className="px-4 pb-4 pt-0 mx-auto">
                    <Tab.Pane eventKey={'3'}  id={'3'} key={'3'} >
                    <h4 className="header-title mb-3">{barChartData?.labels2}</h4>

                      </Tab.Pane>
              </Tab.Content>
            </Tab.Container>

          </Card.Body>
        </Card>
      </Row>
    </>
    );
};
export default memo(GraficaInscritos);
