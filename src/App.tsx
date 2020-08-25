import React from 'react';
import './App.css';
import TopBar from "./TopBar/TopBar";
import SideBar from "./SideBar/SideBar";

function App() {
    return (
        <div className="App">
            <TopBar isAdmin/>
            <SideBar isAdmin/>
        </div>
    );
}

export default App;
