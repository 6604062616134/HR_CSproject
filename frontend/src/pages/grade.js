import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

function Grade() {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-10">
                <h1 className="text-2xl font-bold mb-4">Grade</h1>
                <p>Grade page content goes here.</p>
            </div>
        </div>
    );
}   

export default Grade;