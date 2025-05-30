import React, { useState } from "react";
import { Pause, Play, Rewind, FastForward } from "lucide-react";

const tracks = [
  {
    title: "Пісня 1",
    artist: "Виконавець 1",
    src: "/audio/track1.mp3",
    image: "/images/band1.jpg",
    video: "https://www.youtube.com/embed/example1",
    description: "Цитата або опис з книги.",
  },
  {
    title: "Пісня 2",
    artist: "Виконавець 2",
    src: "/audio/track2.mp3",
    image: "/images/band2.jpg",
    video: "https://www.youtube.com/embed/example2",
    description: "Інша цікава деталь.",
  },
];

export default function App() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = document.getElementById("audio");
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeTrack = (direction) => {
    const nextIndex =
      direction === "next"
        ? (currentTrack + 1) % tracks.length
        : (currentTrack - 1 + tracks.length) % tracks.length;
    setCurrentTrack(nextIndex);
    setIsPlaying(false);
    setTimeout(() => {
      document.getElementById("audio").play();
      setIsPlaying(true);
    }, 100);
  };

  const track = tracks[currentTrack];

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>Меломанський Плеєр</h1>
      <h2>
        {track.artist} — {track.title}
      </h2>
      <img src={track.image} alt="Band" width={200} />
      <p>{track.description}</p>

      <audio id="audio" src={track.src} controls style={{ margin: "20px 0" }} />

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => changeTrack("prev")}><Rewind /></button>
        <button onClick={togglePlay}>{isPlaying ? <Pause /> : <Play />}</button>
        <button onClick={() => changeTrack("next")}><FastForward /></button>
      </div>

      <iframe
        width="300"
        height="170"
        src={track.video}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube"
        style={{ marginTop: 20 }}
      />
    </div>
  );
}