import React,{useState} from 'react';
import ReactMapGL from 'react-map-gl'

function Map(){
const [viewport, setViewport] = useState({
    latitude: 44.006474,
    longitude: -121.675681,
    width: "80%",
    height: "900px",
    zoom: 10
})

    return(
        <ReactMapGL
        {...viewport} 
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle = "mapbox://styles/geoseek/ck72ldwzh0hzx1isibg27neg4"
        onViewportChange = {viewport => {setViewport(viewport)}}
        >
            gems here
        </ReactMapGL>

        
    );
}

export default Map