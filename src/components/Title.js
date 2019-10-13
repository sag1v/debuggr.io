import React from 'react';
import { Link } from "gatsby";

const Title = ({ children }) => (
    <Link to={`/`} className="main-title">
        {children}
    </Link>
);

export default Title;