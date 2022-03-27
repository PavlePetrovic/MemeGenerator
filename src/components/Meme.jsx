import React from 'react';

function Meme(){

    // Postavljamo stejt za pozivanje slika iz baze
    const [allMemeImgs, setAllMemeImgs] = React.useState({});
    
    // Postavljamo globalni stejt gde skladistimo tekst slike, i njen link
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    });
    
    // Pozivamo API sa 100 najpopularnijih mimova i postavljamo njegov data u nas allMemeImgs state
    React.useEffect( () => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemeImgs(data.data.memes))
        .catch(err => console.error(`Imamo gresku: ${err}`))
    }, [])

    // Funckija za izvlacenje random linka slike iz baze
    function randomMemeImg(){
        let img = allMemeImgs[Math.floor(Math.random() * allMemeImgs.length)].url
        setMeme(prevState => {
            return {
                ...prevState,
                randomImage: img
            }
        })
    }

    // Funkcija koja omogucava live promenu naseg stejta, odnosno teksta slika
    function handleText(event){
        const {name, value} = event.target;
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value
            }
        })
    }

    return(
        <div className="memeForm">
            <div className="inputDiv">
                <input 
                    type="text" 
                    placeholder="Top text" 
                    className="firstPhrase" 
                    name="topText" 
                    value={meme.topText} 
                    onChange={handleText} 
                />
                <input 
                    type="text" 
                    placeholder="Bottom text" 
                    className="secondPhrase" 
                    name="bottomText" 
                    value={meme.bottomText} 
                    onChange={handleText} 
                />
            </div>
            <div className="btnDiv">
                <button onClick={randomMemeImg}>Get a new meme image 🖼</button>
            </div>

            <div className="meme">
                <img 
                    src={meme.randomImage} 
                    className="memePicture" 
                />
                <h2 className="memeText top">{meme.topText}</h2>
                <h2 className="memeText bottom">{meme.bottomText}</h2>
            </div>
        </div>
    )
}

export default Meme

