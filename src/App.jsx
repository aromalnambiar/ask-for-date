import { useState, useEffect, useRef } from "react";
import gif1 from "../src/assets/gif1.gif";
import gif2 from "../src/assets/gif2.gif";
import gif6 from "../src/assets/gif6.gif";
import bgaudio from "../src/assets/bg-audio.mp3";
import mainSong from "../src/assets/song.mp3";
import { motion } from "framer-motion";
import "../src/index.css"; // Import the CSS file for heart animations

const pickupLines = [
  "Are you a magician? Because whenever I look at you, everyone else disappears 💫",
  "Do you have a map? I keep getting lost in your eyes 🗺️",
  "Is your name Google? Because you've got everything I've been searching for 🔍",
  "Are you a camera? Because every time I look at you, I smile 📸",
  "Do you believe in love at first sight, or should I walk by again? 👣",
  "Are you made of copper and tellurium? Because you're Cu-Te 🧪",
  "Is your name Wi-Fi? Because I'm really feeling a connection 📶",
  "Are you a parking ticket? Because you've got FINE written all over you 🎫",
  "Do you like science? Because I've got my ion you ⚛️",
  "Are you French? Because Eiffel for you 🗼",
  "Is your name Spotify? Because you're the hottest single around 🎵",
  "Are you a bank loan? Because you've got my interest 💰",
  "Do you like Star Wars? Because Yoda one for me 🌟",
  "Are you a campfire? Because you are hot and I want s'more 🔥",
  "Is this the Hogwarts Express? Because Platform 9 and 3/4 isn't the only thing that's magical here ⚡",
  "Are you a cat? Because you're purr-fect 😺",
  "Do you have a pencil? Because I want to erase your past and write our future ✏️",
  "Are you a time traveler? Because I see you in my future 🕰️",
  "Is your name Ariel? Because we mermaid for each other 🧜‍♀️",
  "Do you like math? Because I can add up all the reasons why you're amazing ➕",
  "Are you a keyboard? Because you're just my type ⌨️",
  "Is your name Autumn? Because you make me fall for you 🍂",
  "Do you have a Band-Aid? Because I scraped my knee falling for you 🩹",
  "Are you a dictionary? Because you add meaning to my life 📚",
  "Is your name Winter? Because you'll be snowone else for me ❄️",
  "Do you have a sunburn, or are you always this hot? 🌞",
  "Are you a rainbow? Because you brighten up my day 🌈",
  "Is your name Summer? Because you make me melt ☀️",
  "Do you have a name, or can I call you mine? 💝",
  "Are you a photographer? Because I can picture us together 📷",
  "Is your dad a boxer? Because you're a knockout! 🥊",
  "Do you like coffee? Because I like you a latte ☕",
  "Are you a gardener? Because you've planted yourself in my heart 🌱",
  "Is your name Gravity? Because I keep falling for you 🌍",
  "Do you have a map? Because I just keep getting lost in your smile 🗺️",
  "Are you a musician? Because you make my heart sing 🎵",
  "Is your name Art? Because you're a masterpiece 🎨",
  "Do you like science? Because we have great chemistry 🧪",
  "Are you a star? Because you light up my world ⭐",
  "Is your name Moon? Because you're out of this world 🌙",
  // Add 60 more of your favorite pickup lines here!
];

const themes = {
  romantic: {
    primary: "bg-pink-300",
    secondary: "from-rose-400 to-red-400",
    text: "text-pink-600",
    border: "border-rose-500",
    title: "Romantic Hearts",
    emoji: "💝",
  },
  gaming: {
    primary: "bg-purple-300",
    secondary: "from-indigo-400 to-purple-400",
    text: "text-purple-600",
    border: "border-purple-500",
    title: "Pixel Love",
    emoji: "🎮",
  },
  anime: {
    primary: "bg-blue-300",
    secondary: "from-blue-400 to-cyan-400",
    text: "text-blue-600",
    border: "border-blue-500",
    title: "Kawaii Love",
    emoji: "💫",
  },
};

function App() {
  const [yesButtonClicked, setYesButtonClicked] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState({
    position: "static",
  });
  // const [yesButtonScale, setYesButtonScale] = useState(1);
  const [currentPickupLine, setCurrentPickupLine] = useState("");
  const [showPickupLine, setShowPickupLine] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("romantic");

  // Function to handle heart popping animation
  useEffect(() => {
    const loveInterval = setInterval(() => {
      const r_size = Math.floor(Math.random() * 65) + 10;
      const r_left = Math.floor(Math.random() * 100) + 1;
      const r_bg = Math.floor(Math.random() * 25) + 100;
      const r_time = Math.floor(Math.random() * 5) + 5;

      const heart = document.createElement("div");
      heart.className = "heart";
      heart.style.width = `${r_size}px`;
      heart.style.height = `${r_size}px`;
      heart.style.left = `${r_left}%`;
      heart.style.background = `rgba(255,${r_bg - 25},${r_bg},1)`;
      heart.style.animation = `love ${r_time}s ease`;

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, r_time * 1000); // Remove the heart after the animation duration
    }, 500);

    return () => clearInterval(loveInterval);
  }, []);

  const handleNoButtonHover = () => {
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 250);
    setNoButtonStyle({
      ...noButtonStyle,
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
    });
    // setYesButtonScale(1.5);
  };

  const handleNoButtonLeave = () => {
    // setYesButtonScale(1);
  };

  const handleYesButtonClick = () => {
    setYesButtonClicked(true);
    const audio = new Audio(bgaudio);
    audio.play();
  };

  const handleNoButtonTouch = () => {
    handleNoButtonHover();
  };

  const generatePickupLine = () => {
    const randomIndex = Math.floor(Math.random() * pickupLines.length);
    setCurrentPickupLine(pickupLines[randomIndex]);
    setShowPickupLine(true);
  };

  const audioPlayedRef = useRef(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (yesButtonClicked) return;

    const handleMouseMove = () => {
      if (!audioPlayedRef.current) {
        audioRef.current = new Audio(mainSong);
        audioRef.current.play().catch((err) => {
          console.warn("Autoplay blocked:", err);
        });
        audioPlayedRef.current = true;
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [yesButtonClicked]);

  useEffect(() => {
    if (yesButtonClicked && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [yesButtonClicked]);

  return (
    <div
      className={`flex flex-col justify-center items-center min-h-screen ${themes[currentTheme].primary} p-4 overflow-y-scroll`}>
      <div className="fixed top-4 right-4 z-50">
        <select
          value={currentTheme}
          onChange={(e) => setCurrentTheme(e.target.value)}
          className="px-4 py-2 rounded-full bg-white shadow-lg border-2 border-opacity-50 cursor-pointer hover:scale-105 transition-transform">
          {Object.entries(themes).map(([key, theme]) => (
            <option key={key} value={key}>
              {theme.emoji} {theme.title}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-2xl mx-auto overflow-y-scroll">
        {/* Pickup Line Generator First */}
        {!yesButtonClicked && (
          <motion.div
            className="mb-8 text-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}>
            <div className="flex flex-col items-center gap-3">
              <button
                onClick={generatePickupLine}
                className={`bg-gradient-to-r ${themes[currentTheme].secondary} 
                  text-white px-6 py-3 rounded-full hover:scale-105 
                  transition-all duration-300 font-semibold group relative`}>
                Try a Pickup Line 💘
                <span
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                  w-max opacity-0 group-hover:opacity-100 transition-opacity
                  text-sm text-pink-700 bg-white px-2 py-1 rounded-md shadow-sm">
                  Need a sweet line to win their heart? Click here! 💝
                </span>
              </button>

              {showPickupLine && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mt-7 p-4 bg-white rounded-lg shadow-lg 
                    text-pink-600 text-lg font-medium max-w-md mx-auto relative">
                  {currentPickupLine}
                  <motion.div
                    className="absolute -right-4 -top-4 bg-pink-100 rounded-full p-2 
                      shadow-md text-sm text-pink-600 font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}>
                    Try another one! 💝
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Main Question */}
        {yesButtonClicked ? (
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl justify-center font-bold font-mono text-pink-600 text-center subpixel-antialiased mb-8">
            Yayyy! Let&apos;s give the stars something to gossip about 🌌😉
          </h1>
        ) : (
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl justify-center font-bold font-mono text-pink-600 text-center subpixel-antialiased mb-8">
            Wanna go out and make the universe jealous?
          </h1>
        )}
      </div>

      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <motion.div
          className="w-full relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}>
          {yesButtonClicked ? (
            <>
              <motion.img
                className="z-20 absolute w-full max-w-xl mx-auto left-0 right-0"
                src={gif6}
                alt="confetti"
              />
              <motion.img
                className="z-10 relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto"
                src={gif2}
                alt="gif2"
              />
            </>
          ) : (
            <motion.img
              className="w-64 sm:w-72 md:w-80 lg:w-96 mx-auto"
              src={gif1}
              alt="gif1"
            />
          )}
        </motion.div>

        <div className="flex flex-row gap-4 mt-8 w-full justify-center">
          <button
            className={`bg-gradient-to-r ${themes[currentTheme].secondary} 
              text-white px-16 py-3 rounded-full hover:scale-105 
              transition-all duration-300 font-semibold group relative text-[30px] w-auto `}
            id="yesButton"
            onClick={handleYesButtonClick}
            // style={{ transform: `scale(${yesButtonScale})` }}
          >
            {yesButtonClicked ? "Let's plan a date <3" : "YES"}
          </button>

          {yesButtonClicked ? null : (
            <button
              id="noButton"
              className={`bg-gradient-to-r ${themes[currentTheme].secondary} 
                text-white  px-16 py-3 rounded-full hover:scale-105 
                transition-all duration-300 font-semibold group relative text-[30px]  w-auto `}
              style={noButtonStyle}
              onMouseOver={handleNoButtonHover}
              onMouseLeave={handleNoButtonLeave}
              onTouchStart={handleNoButtonTouch}>
              NO
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
