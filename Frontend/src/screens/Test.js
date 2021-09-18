import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ReactPlayer from 'react-player';

export default function Test(props) {
    const [image, setImage] = useState();
    const [data1, setData] = useState();

    const upload = async (e) => {
        e.preventDefault();
        
        let formData = new FormData();
        formData.append("video", image);
        
        const config = {headers: { 'content-type': 'multipart/form-data' }}

        const { data } = await Axios.post(`http://localhost:5000/api/playlist/test/`, formData, config)

        //setData(data);
        console.log(data);
    }

    const get = async (e) => {
        e.preventDefault();
        
        const { data } = await Axios.get(`http://localhost:5000/api/playlist/test/`)

        //setData(data);
        console.log(data);
    }

    const delete1 = async (e) => {
        e.preventDefault();
        
        const { data } = await Axios.delete(`/api/playlist/test/`)

        //setData(data);
        console.log(data);
    }

    useEffect(() => {
    }, []);
    
    return (      
        <div>
            <form onSubmit={upload}>  
                <input 
                    type="file" 
                    //accept=".jpg" 
                    onChange={e => setImage(e.target.files[0])}
                    />
                <button type="submit">Click</button>
            </form>
            
            <button onClick={get}>Get</button>
            
            <button onClick={delete1}>Detete</button>

            {//The image is routed through the backend and the key finds it which is a26a1627c3b5852424ec5b84e34c305b
            }
            <img src="http://localhost:5000/api/playlist/video/9dc234e15a287662a337a8a2858532f3"/>

            <ReactPlayer 
                controls 
                url={`/api/playlist/video/9dc234e15a287662a337a8a2858532f3`}
                //url='https://www.youtube.com/watch?v=TRCDsB9i3bI&t=27646s' 
                //width='100%'
                //height='100%'
            />
        </div>
    );
}