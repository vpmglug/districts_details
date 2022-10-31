import React, { useState, useEffect, useMemo } from 'react'
import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
const OverallTable = (props) => {
    const [userData, setUserData] = useState([{}]);
    const columnsData = useMemo(() => props.data, [props.data])
    const options = {
        custom: true,
        totalSize: columnsData.length
      };
    const columns = [
        {
          dataField: "State",
          text: "State",
          sort: true,
          align: 'center',
          headerAlign: 'center'
        },
        {
          dataField: "District",
          text: "District",
          sort: true,
          align: 'center',
          headerAlign: 'center'
        },
           {
          dataField: "State",
          text: "State",
          sort: true,
          hidden: true,
          align: 'center',
          headerAlign: 'center'
        },
        {
          dataField: "Area",
          text: "Area",
          sort: true,
          align: 'center',
          headerAlign: 'center'
        },
        {
          dataField: "Pincode",
          text: "Pincode",
          sort: true,
          align: 'center',
          headerAlign: 'center'
        }
      ];
    
  return (
    <div>
        <Container className='mt-5'>
            <Row className="justify-content-md-center">
                <Col md="10">
                    <PaginationProvider
                      pagination={paginationFactory(options)}
                    >
                      {
                        ({
                          paginationProps,
                          paginationTableProps
                        }) => (
                          <div>
                            <div className="table-responsive mb-4">
                              <BootstrapTable
                                keyField="State"
                                data={columnsData}
                                columns={columns}
                                hover
                                headerWrapperClasses="tableheader"
                                {...paginationTableProps}
                              />
                            </div>
                            <PaginationListStandalone
                              {...paginationProps}
                            />
                          </div>
                        )
                      }
                    </PaginationProvider>
                </Col>
            </Row>
        </Container>   
    </div>
  )
}

export default OverallTable