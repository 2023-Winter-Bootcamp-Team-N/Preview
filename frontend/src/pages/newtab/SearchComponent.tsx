import React, { useState, useEffect } from 'react';
import './SearchComponent.css';
interface SearchComponentProps {
  selectedCategory: string | null;
}
const SearchComponent: React.FC<SearchComponentProps> = ({ selectedCategory }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  useEffect(() => {
    setIsSearchVisible(!!selectedCategory); }, [selectedCategory]);
  return (
    <div className={`search-container ${isSearchVisible ? 'visible' : ''}`} >
      <input
        type="text"
        placeholder="유튜브 제목"
        className="w-full h-full p-4 border-none outline-none bg-slate-300"
      />
    </div>
  );
};
export default SearchComponent;