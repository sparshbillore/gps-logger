import { Link } from 'react-router-dom'
import moment from 'moment/moment'

function ListItemTwo({ item }) {
  const newTimestampFormat = "DD-MM-YYYY HH:mm";
  const  newTimeStamp = moment(item.timestamp).format(newTimestampFormat);
  return (
    <div className='device-detail-list'>
      <div>{newTimeStamp}</div>
      <div>{item.location}</div>
    </div>
  )
}

export default ListItemTwo