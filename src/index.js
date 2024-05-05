import React from "react";
import App from "./components/app";
import { createRoot } from 'react-dom/client';


const root = document.getElementById('root');
const div = createRoot(root); 
div.render(<App/>);