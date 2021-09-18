import React from 'react';
import { Link } from 'react-router-dom';

export default function PurchaseHistory() {
    return (
        <div class="CourseSoldContainer">
            <h5>Purchase History</h5>

            <div class="GlobalScrollableTable">
                <table>
                    <tr>
                        <th>PAYMENT ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>ACTIONS</th>
                    </tr>
                    <tr>
                        <td><Link to="#"></Link></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </div>
    );
}