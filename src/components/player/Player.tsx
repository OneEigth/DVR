import React from 'react';
import './style.css';

interface PlayerProps {
    source: any;
    type: 'mp4' | 'jpg';
    alt?: string;
}

const Player: React.FC<PlayerProps> = ({ source, type, alt = 'Media content' }) => {



    return (
        <div className="player">
            {type === 'mp4' ? (
                <video className="player-video" controls src={source} autoPlay>

                    Your browser does not support the video tag.
                </video>
            ) : (
                <img className="player-photo" src={source} alt={alt} />
            )}
        </div>
    );
};

export default Player;
