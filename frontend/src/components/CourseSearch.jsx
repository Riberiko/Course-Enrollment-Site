/*
  Name: Rob Tai, Michael Lezon, Riberiko Niyomwungere, David Ortega
  Date: 12.12.23
  This is react js file for search bar
*/



import React, { useState } from "react";

const SearchBar = ({ items, categories, setList, isTransaction, layout, setLayout }) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [orderBy, setOrderBy] = useState("default");

  const handleSearch = () => {
    // Implement your search logic based on the query, filter, and orderBy options
    const filteredAndOrderedItems = items
      .filter((item) => {
        console.log(item)
        if (filter === "all") {
          return (!isTransaction) ? item.description.includes(query) : item.confirmation_number.includes(query);
        } else {
          // Customize this based on your filter criteria
          return item.code_type === filter && item.description.includes(query);
        }
      })
      .sort((a, b) => {
        if (orderBy === "default") {
          return 0; // No sorting
        } else if (orderBy === "asc") {
          return  a.description.localeCompare(b.description);
        } else if (orderBy === "desc") {
          return b.description.localeCompare(a.description);
        }
      });

    // Use the filteredAndOrderedItems as needed
    setList(filteredAndOrderedItems);
  };

  return (
    <div className="search">
        <label id="toggleview" onClick={() => setLayout(!layout)}>Toggle View</label>
        <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {!isTransaction && <option value="all">All Categories</option>}
            {
                categories.map((cat, id) => <option key={id} value={cat}>{cat}</option>)
            }
        </select>
        <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
            <option value="default">Default Order</option>
            <option value="asc">Ascending Order</option>
            <option value="desc">Descending Order</option>
        </select>
        <input type="button" onClick={handleSearch} value='Search' />
    </div>
  );
};

export default SearchBar;
