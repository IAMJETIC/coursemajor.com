import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminUserEdit() {
    return (
        <div class="CourseSoldContainer">
            <h5>Admin User Edit</h5>
            <div class="GlobalScrollableTable">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>GOLDEN MAJOR</th>
                        <th>IS SELLER</th>
                        <th>IS ADMIN</th>
                        <th>ACTIONS</th>
                    </tr>
                    <tr>
                        <td>60819fe<Link to="#"></Link></td>
                        <td>JETIC</td>
                        <td>jet@gmail.com</td>
                        <td>
                            <label class="switch">
                                <input type="checkbox" />
                                <span class="slider"></span>
                            </label>
                        </td>
                        <td>
                            <label class="switch">
                                <input type="checkbox" />
                                <span class="slider"></span>
                            </label>
                        </td>
                        <td>
                            <label class="switch">
                                <input type="checkbox" />
                                <span class="slider"></span>
                            </label>
                        </td>
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