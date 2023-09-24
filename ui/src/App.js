import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import Detail from './pages/Detail';
import DefaultLayout from './layouts/DefaultLayout';
import Stream from './pages/Stream';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <DefaultLayout>
                            <Home />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/:path"
                    element={
                        <DefaultLayout>
                            <SearchResult />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/the-loai/:path"
                    element={
                        <DefaultLayout>
                            <SearchResult />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/quoc-gia/:path"
                    element={
                        <DefaultLayout>
                            <SearchResult />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <DefaultLayout>
                            <SearchResult />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/filter"
                    element={
                        <DefaultLayout>
                            <SearchResult />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/phim/:slug"
                    element={
                        <DefaultLayout>
                            <Detail />
                        </DefaultLayout>
                    }
                />
                <Route
                    path="/phim/:slug1/:slug2"
                    element={
                        <DefaultLayout>
                            <Stream />
                        </DefaultLayout>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
