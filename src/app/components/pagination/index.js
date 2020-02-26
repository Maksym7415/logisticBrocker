import React, { useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

const array = [
  1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26, 27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]

const Pagination = () => {
  let [offset, setOffset] = useState(0)
  const [items, setItems] = useState(array.slice(offset, 10))
  let [hasMore] = useState(true)

  const fetchMoreData = () => {
    setTimeout(() => {
      setOffset(offset += 10)
      console.log(offset)
      setItems((prevState) => [...prevState, ...array.slice(offset, offset + 10)])
    }, 500)
  }

  return (
    <div className='main'>
    {console.log(items)}
      <div id="scrollableDiv" >
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
          >
          {items.map((i, index) => (
            <div className='map' key={index}>
              {i}
            </div>
          ))}
        </InfiniteScroll>
      </div>
   </div>
  )
}

export default Pagination