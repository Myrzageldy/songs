'use client';

import { useState, useRef } from 'react';
import styles from './Player.module.css';

const tracks = [
  { title: "Diet Mountain Dew", artist: "Lana Del Rey", src: "/music/Lana_Del_Rey_-_Diet_Mountain_Dew_47835058.mp3", duration: "3:45", image: "/images/lana-del rey.jpg", genre: "trip hop"},
  { title: "Goosebumps", artist: "Travis Scott", src: "/music/Travis_Scott_-_goosebumps_48248867.mp3", duration: "4:20", image: "/images/Travis-Scott.jpg", genre: "rap" },
  { title: "Jauap Bar Ma?", artist: "Sadradin", src: "/music/Sadraddin - Jauap bar ma.mp3", duration: "2:36", image: "/images/sadraddin-jauap-bar-ma.jpeg", genre: "Toi-Duman"},
  { title: "Maqta Qiz", artist: "Gassyr&Qanat", src: "/music/Gassyr_Qanat_-_Maqta_qyz_77129700.mp3", duration: "3:45", image: "/images/maqta.jpg", genre: "trip hop"},
  { title: "Unforgettable", artist: "PnB-Rock", src: "/music/PnB_Rock_-_Unforgettable_78103256.mp3", duration: "4:20", image: "/images/unforgettable.jpg", genre: "rap" },
  { title: "Сен менін адамымсың", artist: "Қайрат Нұртас", src: "/music/Қайрат Нұртас - Сен менің адамымсың (OST Брат или Брак 3).mp3", duration: "2:36", image: "/images/kajrat-nurtas-sen-menin-adamymsyn-ost-brat-ili-brak-3.jpeg", genre: "Toi-Duman"},
  { title: "Not Like Us", artist: "Kendrik Lamar", src: "/music/Kendrick_Lamar_-_Not_Like_Us_77782021.mp3", duration: "3:45", image: "/images/maxresdefault.jpg", genre: "trip hop"},
  { title: "Melodrama", artist: "Sadradin", src: "/music/Sadraddin - Melodrama.mp3", duration: "4:20", image: "/images/sadraddin-melodrama.jpeg", genre: "rap" },
  { title: "Uige", artist: "Sadradin", src: "/music/sadraddin_-_Uige_76101036.mp3", duration: "2:36", image: "/images/uige.jpg", genre: "Блюз "}
];

export default function Player() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGenre, setFilteredGenre] = useState('All');
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredGenre(e.target.value);
  };

  // This is a small comment to test commits
  const filteredTracks = tracks
    .filter(track => 
      (track.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      track.artist.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filteredGenre === 'All' || track.genre === filteredGenre)
    );

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <input
          type="text"
          placeholder="Искать трек..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={handleSearch}
        />
        <select className={styles.genreSelect} value={filteredGenre} onChange={handleFilter}>
          <option value="All">Все жанры</option>
          <option value="Pop">Поп</option>
          <option value="Rock">Рок</option>
          <option value="Hip-Hop">Хип-Хоп</option>
          <option value="Jazz">Джаз</option>
          <option value="Classical">Классика</option>
          <option value="Electronic">Электроника</option>
          <option value="Reggae">Регги</option>
          <option value="Blues">Блюз</option>
        </select>
      </div>

      <div className={styles.trackGrid}>
        {filteredTracks.map((track, index) => (
          <div key={index} className={styles.trackItem}>
            <img src={track.image} alt={track.artist} className={styles.artistImage} />
            <h2>{track.title}</h2>
            <p>{track.artist}</p>
            <button
              onClick={() => setCurrentTrackIndex(index)}
              className={styles.controlButton}
            >
              Выбрать
            </button>
          </div>
        ))}
      </div>

      <div className={styles.player}>
        <h2>{tracks[currentTrackIndex].title}</h2>
        <p>{tracks[currentTrackIndex].artist}</p>
        <audio ref={audioRef} src={tracks[currentTrackIndex].src} controls />
      </div>
    </div>
  );
}
