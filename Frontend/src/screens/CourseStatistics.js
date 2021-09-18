import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseStatistics() {
    return (
        <div>
            <div class="Seller-courses">
                <h2>Course</h2>
                <button class="GlobalButton">CREATE COURSE</button>
            </div>

            <br />

            <div class="SellerCourseStatistics">

                <table>
                    <tr>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>RATINGS</th>
                        <th>AMOUNT SOLD</th>
                        <th>ACTIONS</th>
                    </tr>
                    <tr>
                        <td><Link to="#">JETIC</Link></td>
                        <td>$5000</td>
                        <td>REAL ESTATE</td>
                        <td><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i></td>
                        <td>5000</td>
                        <td>
                            <i class="bi bi-pencil"></i>
                            <i class="bi bi-trash"></i>
                        </td>
                    </tr>
                </table>

            </div>
        </div>
    );
}