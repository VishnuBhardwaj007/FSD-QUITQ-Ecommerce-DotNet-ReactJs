import { useState,useEffect,useContext } from "react";
import { UserContext } from "../User/UserContext";
import "./Room.css"
import login_required from "./login_required.png"

import user_logo from "./user1.jpg";
import Filters from "../Components/Filter";
import ProductGrid from "../Components/ProductGrid";
import { useLocation } from "react-router-dom";
import { render } from "@testing-library/react";

function Room(props){
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [productNames, setProductNames] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(true);
    const [filterData, setFilterData] = useState(null);

    const handleFilterSubmit = (data) => {
        setFilterData(data);
      };
    // useEffect(() => {
    //     console.log('Room component re-rendered!');
    //     console.log(inputValue);
    //     console.log(isSearchActive);
    // });
    useEffect(() => {
        console.log('Room component re-rendered!');
        console.log(filterData);
    });
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://localhost:7036/api/products/');  
            const data = await response.json();
            setProductNames(data.map(product => product.productName));  
        };
        fetchProducts();
    }, []);
    const updateSuggestions = (input) => {
        setInputValue(input);
        if (input.length > 0) {
            const filteredSuggestions = productNames.filter(name =>
                name.toLowerCase().includes(input.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };
    const handleSelectSuggestion = (suggestion) => {
        setInputValue(suggestion); // Update the input field with the selected suggestion
        setSuggestions([]); // Clear suggestions
    };
    const location = useLocation();
    var subCategoryId = location.state?.subCategoryId;
    
    if (subCategoryId == undefined) {
        
        subCategoryId=0;
      }
   
    const { productToDisplay, setProductsToDisplay } = useContext(UserContext);
//     function handleSearch(){
//         setIsSearchActive(true);
    
//   }
  
      
      
    return (
        <>
            <div className="main_room">
                <div className="room_left" >
                    
                    <div className="room_lined">
                        
                        <Filters onSubmit={handleFilterSubmit}/>
                        
    
                    </div>
                    
                    
                    
                </div>
                <div className="room_right">
                    
                    
                    <div className="question_head">
                       
                          
                        
                        <input className="textarea" placeholder="Search Products"  value={inputValue}
                                onChange={(e) => updateSuggestions(e.target.value)}></input>
                        
                        {/* <button className="cart" onClick={handleSearch}>Search</button> */}
                        
                        
                    </div>
                    {suggestions.length > 0 && (
                            <ul className="autocomplete-suggestions">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSelectSuggestion(suggestion)}
                                    >
                                        {suggestion}
                                        
                                    </li>
                                ))}
                            </ul>
                        )}

                    <ProductGrid subCategoryId={subCategoryId} searchQuery={inputValue} isSearchActive={isSearchActive} filterData={filterData}/>
                    
                
                
        
                </div>
                 
            </div>
            </>
    )
}
export default Room;