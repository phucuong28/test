import Header from './components/Header';
import Footer from './components/Footer';

const DefaultLayout = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex justify-center bg-[#1d1c1f]">
                <Header />
            </div>
            <div className="flex flex-col flex-1 items-center bg-[#2d2d2e]">{children}</div>
            <div className="flex justify-center bg-[#1d1c1f]">
                <Footer />
            </div>
        </div>
    );
};

export default DefaultLayout;
