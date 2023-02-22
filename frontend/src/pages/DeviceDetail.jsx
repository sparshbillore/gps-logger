import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetails } from "../features/gpsData/deviceDetailSlice";
import Spinner from "../components/Spinner";
import moment from "moment/moment";
import BackButton from "../components/BackButton";
import ListItemTwo from "../components/ListItemtwo";
import PieChart from "../components/PieChart";

function DeviceDetail() {
  const dispatch = useDispatch();
  const { deviceId } = useParams();

  const newTimestampFormat = "DD-MM-YYYY HH:mm";

  const deviceDetails = useSelector((state) => state.deviceDetails);

  const Details = deviceDetails.Details || {};
  const {
    device_Id = "",
    deviceType = "",
    deviceTimestampLocation = [],
    percentagePerLocation = [],
  } = Details;

  useEffect(() => {
    dispatch(getDetails(deviceId));
  }, [dispatch, deviceId]);

  if (!deviceDetails?.Details) {
    <Spinner />;
  }

  return (
    <div className="container">
      <BackButton />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '16px'}}>

      <div style={{fontSize: '32px', fontWeight: 'bold'}}>{deviceId}</div>
      <div style={{fontSize: '24px', fontWeight: 'bold'}}>{deviceType}</div>
      </div>
      <div className="device-detail-list-container">
        <div className="tickets">
          <div className="device-detail-list-heading">
            <div>Latest Timestamp</div>
            <div>Latest Location</div>
            <div></div>
          </div>
          {deviceTimestampLocation.map((item) => {
            let newTimeStamp = moment(item.timestamp).format(
              newTimestampFormat
            );
            return <ListItemTwo key={newTimeStamp} item={item} />;
          })}
        </div>
        <div>
          <PieChart
            text="% Time spent on each Location"
            dataPoints={percentagePerLocation}
          />
        </div>
      </div>
    </div>
  );
}

export default DeviceDetail;
