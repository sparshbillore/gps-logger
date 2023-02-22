import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import moment from 'moment/moment'
import Spinner from './Spinner';

function ListItem({ item }) {
  const newTimestampFormat = "DD-MM-YYYY HH:mm";
  const  newTimeStamp = moment(item.timestamp).format(newTimestampFormat);

  if(!item){
    <Spinner />
  }

  return (
    <div className='ticket'>
      <div>{item.device_id}</div>
      <div>{item.device_type}</div>
      <div>{newTimeStamp}</div>
      <div>{item.location}</div>
      {/* <div className={`status status-${item.status}`}>{item.status}</div> */}
      <Link to={`/details/${item.device_id}`} >
        <FaArrowRight />
      </Link>
    </div>
  )
}

export default ListItem