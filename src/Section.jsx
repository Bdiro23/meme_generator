import './mims.css';
//import data from './data.js';
import React from "react";
import Navbar from './Navbar';

export default function Section() {
    const [meme, setMeme] = React.useState({
        imgUrl: "rickandmorty.jpg",
        toptext:"",
        bottomtext:""
    })
    const [allMemes, setAllMemes] = React.useState([]);

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => {
                console.log("Fetched memes data:", data);
                setAllMemes(data.data.memes);
            });
    }, []);

    const handleclick = () => {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        console.log(url);
       setMeme(prevMeme=>({...prevMeme, imgUrl: url}));
    }
    const handevent=(event)=>{
        const {name,value} = event.target;
        setMeme(prevText => ({...prevText, [name]:value}))
    }



    return(
        <>
            <Navbar/>
            <section>
                <div className='inputs'>
                    <div className='input'>
                        <span>Top text</span>
                        <input type="text" placeholder="Rick" onChange={handevent} value={meme.toptext} name="toptext"/>
                    </div>
                    <div className='input'>
                        <span>Bottom text</span>
                        <input type="text" placeholder='Morty' onChange={handevent} value={meme.bottomtext} name="bottomtext"/>
                    </div>
                </div>
                <input type='button' value='Get a new meme image' className="button" onClick={handleclick}/>
                <div className="imgp">
                    <div className='divtop'>{meme.toptext}</div>
                    <img src={meme.imgUrl} className="image" alt="Meme"/>
                    <div className='divbottom'>{meme.bottomtext}</div>
                </div>
            </section>
        </>
    )
}
