import React from "react";

function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [memesData, setMemesData] = React.useState([])

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(res => setMemesData(res.data.memes))
    console.log("Fetched API")
  }, [])

  function handleChange(event) {
    setMeme((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function getMemeImage() {
    let randomMemeUrl = memesData[Math.floor(Math.random() * memesData.length)].url;
    setMeme((prev) => ({
      ...prev,
      randomImage: randomMemeUrl,
    }));
  }

  return (
    <div className="meme">
      <div className="meme--inputs">
        <input
          type="text"
          placeholder="Top Line"
          onChange={handleChange}
          name="topText"
          value={meme.topText}
        />
        <input
          type="text"
          placeholder="Bottom Line"
          onChange={handleChange}
          name="bottomText"
          value={meme.bottomText}
        />
      </div>
      <input
        onClick={getMemeImage}
        type="button"
        value="Get a new meme image"
      />
      <div className="meme--image_container">
        <img className="meme--image" src={meme.randomImage} alt="meme image"></img>
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
}

export default Meme;
