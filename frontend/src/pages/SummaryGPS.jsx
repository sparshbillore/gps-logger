import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDevices } from '../features/gpsData/gpsSummarySlice'
import Paginator from '../components/Paginator'
import SortFeature from '../components/SortFeature'
import Spinner from '../components/Spinner'
import ListItem from '../components/ListItem'

import Search from '../components/Search'

function SummaryGPS() {
  const { deviceList } = useSelector((state) => state.gps)
  const [query, setQuery] = useState('')
  const [page , setPage] = useState(1)
  const [sortBy, setSortBy] = useState('')
  const [sortOrder, setOrderSort] = useState('')

  const dispatch = useDispatch()

  const { totalPages } = useSelector((state) =>  state.gps)

  
  const onPreviousClick = () => {
    if(page>1){
      setPage(page - 1);
      dispatch(getDevices({ query, page: page - 1, sortBy, sortOrder }));
    }
  };

  const onNextClick = () => {
    if (page < totalPages) {
      setPage(page + 1);
      dispatch(getDevices({ query, page: page + 1, sortBy, sortOrder }));
    }
  };

  const onSetSort = ( value ) => {
    setSortBy(value)
  }

  const onSetOrder = ( value ) => {
    setOrderSort(value)
  }
  // NOTE: only need one useEffect here


  useEffect(() => {
    dispatch(getDevices({query,page,sortBy, sortOrder}))
  }, [dispatch ,query, sortBy, sortOrder])

  
  return (
    <>
      <section className='container'>
        <div className="summary-container">
        <div className="summary-container">

      <h1>GPS Summary</h1>
        <div  className="summary-container-page">
        <input
            className="search"
            placeholder="Search By Device Id/Type"
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
            <div className='page-container' >
              <SortFeature onSetSort={onSetSort} onSetOrder={onSetOrder} />
              <Paginator page_no={page} onPreviousClick={onPreviousClick} onNextClick={onNextClick} />
            </div>
        </div>
      </div>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>DeviceId</div>
          <div>Device Type</div>
          <div>Latest Timestamp</div>
          <div>Latest Location</div>
          <div></div>
        </div>
         { deviceList ? deviceList.map((item) => (
          <ListItem key={item.id} item={item} />
        )) : <Spinner/>} 
        
      </div>
      </div>
      </section>
    </>
  )
}


export default SummaryGPS