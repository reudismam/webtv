import { Icon } from '@material-ui/core';
import Head from 'next/head'
import { useContext, useEffect } from 'react'
import { HomeContext } from '../context/HomeContext';
import styles from '../styles/Home.module.css'
import {AiFillPlayCircle, AiFillPauseCircle} from 'react-icons/ai';
import {ImVolumeMute} from 'react-icons/im';
import {GoUnmute} from 'react-icons/go';
import { converter } from '../utils/converter';

export default function Home() {
  const {
    videoRef,
    video,
    isPlaying,
    volume,
    isMute,
    currentTime,
    totalTime,
    toonglePlayPause,
    configVolume,
    toongleMute,
    configTime
  } = useContext(HomeContext);

  return (
    <>
    <Head>
    <title>Aplicação de Áudio</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
    <div className={styles.container}>
      <div className={styles.video}>
        <video className={styles.conteudo} src={video} ref={videoRef}></video>
        <div className={styles.controles}>
            <div>

            </div>
            <div className={styles.playButton}>
              { isPlaying ?
                (<AiFillPauseCircle className={styles.play} onClick={toonglePlayPause}></AiFillPauseCircle>)
                :
                (<AiFillPlayCircle className={styles.play} onClick={toonglePlayPause}></AiFillPlayCircle>)
              }
              <div>
                {
                  converter(currentTime)
                }
                <input 
                  className={styles.time}
                  type="range" 
                  value={currentTime}
                  onChange={e => configTime(Number(e.target.value))}
                  />
                {
                  converter(totalTime)
                }
              </div>
            </div>
            <div className={styles.volumeControl}>
                {
                  isMute ?
                  (<ImVolumeMute className={styles.play} onClick={toongleMute}></ImVolumeMute>)
                  :
                  (<GoUnmute className={styles.play} onClick={toongleMute}></GoUnmute>)
                  
                }
                <input
                  type="range" 
                  min={0} 
                  max={1} 
                  step="0.01"
                  value={volume} 
                  onChange={e => configVolume(Number(e.target.value))}
                  ></input>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
