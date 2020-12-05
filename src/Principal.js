import React from 'react'
import Cards from './Cards'
import Changas from './Changas'
import OficioUser from './OficioUser'
import "./Principal.css"
import SearchScreen from './SearchScreen'
import { useStateValue } from './StateProvider'
function Principal() {
    const [{oficioId, searchOficio}, dispatch] = useStateValue()
    return (
        <div className="principal">
            {oficioId && <OficioUser /> }
            {searchOficio && <SearchScreen />}
            {
                (!oficioId && !searchOficio) &&
                <>
                    <Changas />
                    <Cards />
                </>
            }
            
        </div>
    )
}

export default Principal
