import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
    return (
        <div>
            <BrowserRouter basename='quiz-web-app'>
                <Routes>
                    <Route index element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
