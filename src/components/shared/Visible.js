import React from 'react';
const Visible = ({when, children}) => {
    return when ? <Visible>(children)</Visible> : null
}
export default Visible;