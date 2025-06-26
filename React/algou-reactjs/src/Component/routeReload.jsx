import react from 'react'; 
import { useLocation } from 'react-router-dom';

const RouteReload =({children}) => {
    const location = useLocation();
    return (
        <div key={location.pathname}>
            {children}
        </div>
    );
}
export default RouteReload;