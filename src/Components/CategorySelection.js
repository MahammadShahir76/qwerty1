import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
function CategorySelection() {
    return (
        <div>
            <Link to="/PlumberInterest">Plumber</Link><br/>
            <Link to="/PlumberInterest">Electricians</Link><br/>
            <Link to="/PlumberInterest">Mechanics</Link><br/>
        </div>
    );
}

export default CategorySelection