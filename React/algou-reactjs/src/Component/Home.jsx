import react from 'react';
function Home({className}) {
    return (
        <div className={className}>
        <div className="text-red-100 font-semibold text-2xl animated-entry flex justify-center items-center h-screen">
            Welcome to the Home Page!
        </div>
        </div>
    );
}
export default Home;