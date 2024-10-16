import React, { useState } from 'react';
import { Button, Row, Col } from 'antd';
import './style/Basemaps.css';
import 'leaflet/dist/leaflet.css';

interface BasemapProps {
  basemap: 'osm' | 'hot' | 'dark' | 'cycle';
  onChange: (bm: 'osm' | 'hot' | 'dark' | 'cycle') => void;
}

const Basemap: React.FC<BasemapProps> = ({ onChange }) => {
  const [basemapsOpen, setBasemapsOpen] = useState(false);
  const [activeBm, setActiveBm] = useState<'osm' | 'hot' | 'dark' | 'cycle'>('dark'); // Изменено здесь

  const onBmClick = (bm: 'osm' | 'hot' | 'dark' | 'cycle') => { // Изменено здесь
    setActiveBm(bm);
    onChange(bm);
  }

  const onBmBtnClick = () => {
    setBasemapsOpen(!basemapsOpen);
  }

  return (
      <div className="basemaps-container">
        <Button
            icon="appstore"
            className="basemap-open-btn"
            onClick={onBmBtnClick} />
        {basemapsOpen &&
            <div className="basemaps-select">
              <div className="basemaps-title">Базовые карты</div>
              <Row>
                <Col span={12} onClick={() => onBmClick("osm")}>
                  <img
                      src="/images/osm.png"
                      className={activeBm === 'osm' ? "active" : ""}
                      alt="osm"
                  />
                  <p className="basemaps-image-title">OSM</p>
                </Col>
                <Col span={12} onClick={() => onBmClick("hot")}>
                  <img
                      src="/images/hot.png"
                      className={activeBm === 'hot' ? "active" : ""}
                      alt="hot"
                  />
                  <p className="basemaps-image-title">HOT</p>
                </Col>
              </Row>
              <Row>
                <Col span={12} onClick={() => onBmClick("dark")}>
                  <img
                      src="/images/dark.png"
                      className={activeBm === 'dark' ? "active" : ""}
                      alt="dark"
                  />
                  <p className="basemaps-image-title">DARK</p>
                </Col>
                <Col span={12} onClick={() => onBmClick("cycle")}>
                  <img
                      src="/images/cycle.png"
                      className={activeBm === 'cycle' ? "active" : ""}
                      alt="cycle"
                  />
                  <p className="basemaps-image-title">CYCLE</p>
                </Col>
              </Row>
            </div>
        }
      </div>
  );
};

export default Basemap;
