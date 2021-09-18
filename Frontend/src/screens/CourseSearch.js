import React, { useEffect, useState } from 'react';

export default function CourseSearch(props) {
    return (
        <section>

            <div className="category"> 
                <ul>
                    <h5>Categories:</h5>
                    
                    <li className="tableBackgroundStripes">
                        <div className="category">
                            <label for="sortSearch">Sort by:</label>
                            <select name="sortSearch" id="sortSearch">
                                <h5>Categories:</h5>
                                <option>Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Avg. Customer Review</option>
                            </select>
                        </div>
                    </li>
                    
                    <li>
                        <div className="category">      
                            <label for="ratingsSearch">Avg Customer review:</label>
                            <select name="ratingsSearch" id="ratingsSearch">
                                <h5>Categories:</h5>
                                <option>Four(4) Star & Up</option>
                                <option>Three(3) Star & Up</option>
                                <option>Two(2) Star & Up</option>
                                <option>One(1) Star & Up</option>
                            </select>
                        </div>
                    </li>
                    
                    <li className="tableBackgroundStripes">
                        <div className="category">
                            <label for="priceSearch">Choose a price:</label>
                            <select name="priceSearch" id="priceSearch">
                                <option>All</option> 
                                <option>Under $500</option> 
                                <option>$500 to $600</option>  
                                <option>$600 to $700</option> 
                                <option>$800 to 1000</option>
                                <option>$1000 & Above</option>
                    <option>Free</option>
                            </select>
                        </div>
                    </li>
                        
                    
                
                    <li>
                        <div className="category">  
                            <label for="categorySearch">Choose a category:</label>
                            <select name="categorySearch" id="categorySearch">
                                <h5>Categories:</h5>
                                <option>All</option>
                                <option>Real Estate</option>
                                <option>Stocks</option>
                                <option>CryptoCurrency</option>
                                <option>Marketing</option>
                                <option>Ecommerce</option>
                            </select>
                        </div>
                    </li>
                
                    
                        
                    </ul>
                </div>


                <div>

                <h1>Online Courses</h1>

                <div className="widget-container">
                    <div className="course-widget">
                        <div>
                            <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris"/>
                        </div>         
                        <h4>THE ASSET MANAGER</h4>
                        <p className="course-widget-details">Learn asset management from the firm hired by the top 4 investment banks to teach their new analysts.</p>              
                        <hr/>          
                        <div className="course-widget-end">
                            <h3>$749</h3>
                            <div>
                                <p className="course-widget-details">5 STARS</p>
                                <p>Star star star star</p>
                            </div>
                        </div>
                    </div>

                    <div className="course-widget">
                        <div>
                            <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris"/>
                        </div>  
                        <h4>THE ASSET MANAGER</h4>
                        <p className="course-widget-details">Learn asset management from the firm hired by the top 4 investment banks to teach their new analysts.</p>
                        <hr/>          
                        <div className="course-widget-end">
                            <h3>$749</h3>
                            <div>
                                <p className="course-widget-details">5 STARS</p>
                                <p>Star star star star</p>
                            </div>
                        </div>
                    </div>

                    <div className="course-widget">
                        <div>
                            <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris"/>
                        </div>                   
                        <h4>THE ASSET MANAGER</h4>
                        <p className="course-widget-details">Learn asset management from the firm hired by the top 4 investment banks to teach their new analysts.</p>                  
                        <hr/>          
                        <div className="course-widget-end">
                            <h3>$749</h3>
                            <div>
                                <p className="course-widget-details">5 STARS</p>
                                <p>Star star star star</p>
                            </div>
                        </div>
                    </div>

                    <div className="course-widget">
                        <div>
                            <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris"/>
                        </div>      
                        <h4>THE ASSET MANAGER</h4>
                        <p className="course-widget-details">Learn asset management from the firm hired by the top 4 investment banks to teach their new analysts.</p>     
                        <hr/>       
                        <div className="course-widget-end">
                            <h3>$749</h3>
                            <div>
                                <p className="course-widget-details">5 STARS</p>
                                <p>Star star star star</p>
                            </div>
                        </div>
                    </div>

                    <div className="course-widget">
                        <div>
                            <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris"/>
                        </div>  
                        <h4>THE ASSET MANAGER</h4>
                        <p className="course-widget-details">Learn asset management from the firm hired by the top 4 investment banks to teach their new analysts.</p>     
                        <hr/>              
                        <div className="course-widget-end">
                            <h3>$749</h3>
                            <div>
                                <p className="course-widget-details">5 STARS</p>
                                <p>Star star star star</p>
                            </div>
                        </div>
                    </div>

                </div>

                <hr/>
                <h3>Top Sellers</h3>

                <div className="top-sellers-container">

                <div className="top-sellers-widget">
                    <div>
                        <img src="https://storage.googleapis.com/fe-storage/2020/11/242aaa44-the-modeler-online-course.png" alt="Paris"/>
                    </div>
                    
                    <h4>THE ASSET MANAGER</h4>
                    <p className="top-sellers-widget-details">Learn asset management from the firm hired by the top.</p>
                    </div>
                </div>

                </div>
        </section>
    )
}