import React, { useState, useEffect } from "react";
import Card from './Card';
import Button from './Button';
import Search from './Search';
const CardList = ({data}) => {
const limit = 10;
const defaultDataset = data.slice(0, limit);
const [offset, setOffset] = useState(0);
const [searchTerm, setSearchTerm] = useState("");
const [filteredData, setFilteredData] = useState(data);
const [products, setProducts] = useState(defaultDataset);
const filterTags = (term) => {
  setSearchTerm(term); 

  if (term) {
    const filtered = data.filter((product) =>
      product.tags.some((tag) => tag.title.toLowerCase()===term.toLowerCase())
    );
    setFilteredData(filtered);
    setOffset(0); 
  } else {
    setFilteredData(data);
  }
};
const handlePagination = (direction) => {
  setOffset((prevOffset) => {
    let newOffset = direction === "next" ? prevOffset + limit : prevOffset - limit;
    return Math.max(0, Math.min(newOffset, filteredData.length - limit));
  });
};
useEffect(() => {
  setProducts(filteredData.slice(offset, offset + limit));
}, [offset, limit, filteredData]);

const isFirstPage = offset === 0;
const isLastPage = offset + limit >= filteredData.length;

  return (
    <div className="cf pa2">
    <Search handleSearch={filterTags}/>
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      
      <div className="flex items-center justify-center pa4">
        <Button id="prev" text="Previous" handleClick={() => handlePagination("prev")} disabled={isFirstPage}/>
        <span className="ph3">{`${offset + 1}-${Math.min(offset + limit, filteredData.length)} of ${filteredData.length}`}</span>
        <Button id="next" text="Next" handleClick={() => handlePagination("next")} disabled={isLastPage}/>
      </div>
    </div>
  )
}

export default CardList;