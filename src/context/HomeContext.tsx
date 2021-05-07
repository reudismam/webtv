import { createContext, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";

interface HomeData {
    videoRef: MutableRefObject<HTMLVideoElement>;
    video: string;
    isPlaying: boolean;
    volume: number;
    isMute: boolean;
    currentTime: number;
    totalTime: number;
    toonglePlayPause: () => void;
    configVolume: (volume: number) => void;
    toongleMute: () => void;
    configTime: (time: number) => void;
}

export const HomeContext = createContext({} as HomeData);

interface HomeContextProviderProps {
    children: ReactNode;
}

export const HomeContextProvider = ({children}: HomeContextProviderProps) => {
    const [video, setVideo] = useState<string>();
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);
    const [volume, setVolume] = useState<number>(1);
    const [isMute, setIsMute] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>();

    useEffect(() => {
        configVideo("../videos/video.mp4");
    }, []);

    const configTime = (time: number) => {
        const video = videoRef.current;
        video.currentTime = time;
        setCurrentTime(time);
    }

    const configVideo = (videoUrl: string) => {
        setVideo(videoUrl);

        const video = videoRef.current;

        video.onloadeddata = () => {
            setTotalTime(video.duration);
            setCurrentTime(0);
        }
    }

    const configVolume = (volume: number) => {
        setVolume(volume);
        videoRef.current.volume = volume;
    }

    const toongleMute = () => {
        const updatedMute = !isMute;
        setIsMute(updatedMute);
        videoRef.current.muted = updatedMute;
    }

    const toonglePlayPause = () => {
        if (isPlaying) {
            pause();
        }
        else {
            play();
        }
        setIsPlaying(!isPlaying);
    }


  
    const play = () => {
        const video = videoRef.current;
        video.play();
    }

    const pause = () => {
        const video = videoRef.current;
        video.pause();
    }

    
    return (
        <HomeContext.Provider value={
            {
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
            }
        }>
            {
                children
            }
        </HomeContext.Provider>
    );
}