import React from "react";
import './styles.scss';

function DayNightSwitch({ checked, onChange }) {

    return (
        <div className="wrapper">
            <div className="toggle">
                <input
                    className="toggle-input"
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
                <div className="toggle-bg" />
                <div className="toggle-switch">
                    <div className="toggle-switch-figure" />
                    <div className="toggle-switch-figureAlt" />
                </div>
            </div>
        </div>
    );
}

export default DayNightSwitch;