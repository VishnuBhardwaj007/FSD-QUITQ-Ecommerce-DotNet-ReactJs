import React, { useState } from 'react';


import './BrandForm.css'

function BrandForm(props) {
  const [brandName, setBrandName] = useState('');
  const [brandLogo, setBrandLogo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); 
    const formData = new FormData();
    formData.append('brandName', brandName);
    formData.append('BrandLogoImg', brandLogo);

    try {
      const response = await fetch('https://localhost:7036/api/brands', {
        method: 'POST',
        
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        
        body: formData
      });
      
      if (response.ok) {
        // Brand successfully added
        props.onSubmit("refresh")
        console.log('Brand added successfully!');
      } else {
        // Handle error
        console.error('Failed to add brand');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='app'>
    {/* <form onSubmit={handleSubmit}>
      <div>
        <label>Brand Name:</label>
        <input 
          type="text" 
          value={brandName} 
          onChange={(e) => setBrandName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Brand Logo:</label>
        <input 
          type="file" 
          onChange={(e) => setBrandLogo(e.target.files[0])} 
          required 
        />
      </div>
      <button type="submit">Submit</button>
    </form> */}
    <form onSubmit={handleSubmit} className="form-container">
  <div>
    <label>Brand Name:</label>
    <input 
      type="text" 
      value={brandName} 
      onChange={(e) => setBrandName(e.target.value)} 
      required 
    />
  </div>
  <div>
    <label>Brand Logo:</label>
    <input 
      type="file" 
      onChange={(e) => setBrandLogo(e.target.files[0])} 
      required 
    />
  </div>
  <button type="submit">Submit</button>
</form>

    </div>
  );
}

export default BrandForm;
