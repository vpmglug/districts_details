import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const NewSearch = (props) => (
  <Select options={props.option} onChange={props.onStateChange} />
)
export default NewSearch