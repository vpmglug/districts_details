import React,{useEffect,useState} from 'react'
import NavbarForapp from "./NavbarForapp"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import NewSearch from './NewSearch';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import datafile from "./overall.csv";
import Papa from "papaparse";
import OverallTable from './OverallTable';
const DistrictUI = () => {
    const [groupedArray,setGroupedArray] = useState([])
    const [newGroupedArray,setnewGroupedArray] = useState([])
    const [stateArray,setStateArray] = useState([])
    const [stateforSelect,setStateforSelect] =useState([{}])
    const [stateName,setStateName]=useState("")
    const [particularStateDatas,setParticularStateDatas]= useState([{}])
    const [particularStateDistricts,setParticularStateDistricts]= useState([{}])
    const [districtName,setDistrictName]=useState("")
    const [overallFilterData,setOverallFilterData]=useState([{}])
    const [hideTable,setHideTable]=useState(true)
    const [isLoading,setIsLoading]=useState(false)
    const [disableBtn,setDisableBtn]=useState(true)

    var seenNames = {};
    var yes={}
    useEffect(() => {
        changeHandler1()
    }, [])
    useEffect(() => {
        setnewGroupedArray(groupedArray.reduce((state,current) => {
            let {State, District,Area} = current;
            let company = state[State] || (state[State] = {});
            let yearObj = company[District] || (company[District] = {});
            let monthArr = yearObj[Area] || (yearObj[Area] = []);
            monthArr.push(current);
            return state;
         }, {}))
    }, [groupedArray])
    useEffect(() => {
    setStateArray(Object.keys(newGroupedArray));
    }, [newGroupedArray])
    const changeHandler1 = () => {
        Papa.parse(datafile , {
          header: true,
          download: true,
          skipEmptyLines: true,
          delimiter:",",
          complete: function (results) {
            console.log(results.data)
            setGroupedArray(results.data)
            yes=results.data
          },
        });
      };
      useEffect(() => {
        setStateforSelect(stateArray.map((item) => {
            return { value: item, label: item };
          })
        )
      }, [stateArray])

      useEffect(() => {
        if(districtName === ""){
          setDisableBtn(true)
        }else{
        setDisableBtn(false)
        }
      }, [districtName])
      
      const handleStateChanges=(e)=>{
        setStateName(e.value)
        let newStateName=e.value
        const found=[];
        function fnd(da) { 
         for (const el of Object.values(da)){
          if (el?.State === newStateName) found.push(el);
          if (typeof el==='object' && el !== null) fnd(el);
         }
        }
        fnd(groupedArray);
        setParticularStateDatas(found);
        console.log(found)
        const uniqueIds = [];
        const getDistrictValues = found.filter(element => {
            const isDuplicate = uniqueIds.includes(element.District);
            if (!isDuplicate) {
              uniqueIds.push(element.District);
              return true;
            }
            return false;
          });
          console.log(getDistrictValues,"pp")
          setParticularStateDistricts(getDistrictValues.map((item) => {
            return { value: item.District, label: item.District };
          })
        )
      }

      const handleDistrictChanges=(e)=>{
        setDistrictName(e.value)
        console.log(e.value,"llll")
      }

      const handleSubmit=(e)=>{
        e.preventDefault()
        setHideTable(false)
        console.log(particularStateDatas.filter( i => (i.District === districtName) ),"ppppp")
        setOverallFilterData(particularStateDatas.filter( i => (i.District === districtName) ))
      }
  return (
    <div>
        <NavbarForapp/>
        <div className='bodycontent mt-5'>
            <div className='d-flex justify-content-center'>
                <div className='d-flex flex-column'>
                    <h1>District area details-2022</h1>
                </div>
            </div>
            <Container className='mt-5'>
                <Row className="justify-content-md-center">
                    <Col md="4">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicState">
                                <Form.Label>State</Form.Label>
                                <NewSearch option={stateforSelect} onStateChange={handleStateChanges}/>
                                <Form.Text className="text-muted">
                                Select the state from the dropdown
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formBasicDistrict">
                                <Form.Label>District</Form.Label>
                                <NewSearch option={particularStateDistricts} onStateChange={handleDistrictChanges} />
                                <Form.Text className="text-muted">
                                Select the District from the dropdown
                                </Form.Text>
                            </Form.Group>
                            <div className='d-flex justify-content-center'>
                            <Button variant="primary" className='' type="submit" disabled={disableBtn} onClick={handleSubmit}>
                                {isLoading ? 'Searching…' : 'Search'}
                            </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
            {!hideTable &&
            <OverallTable data={overallFilterData}/>
            }
        </div>
    </div>
  )
}

export default DistrictUI
