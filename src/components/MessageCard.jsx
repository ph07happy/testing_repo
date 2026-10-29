import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Image as ImageIcon, ArrowUpRight, MessageSquareQuote } from 'lucide-react';
import { getMessageRoutePath } from '../utils/routeUtils';
import { getFallbackImageSvg } from '../services/imageService';
import './MessageCard.css';

export default function MessageCard({ response, index = 0 }) {
  const [imgError, setImgError] = useState(false);
  const { id, messageTo, messageBy, message, pictures = [] } = response;

  const displayMessage = message || messageBy || 'A heartfelt message from the multiverse...';
  const hasPictures = pictures.length > 0;
  const primaryPicture = hasPictures ? pictures[0] : null;
  const extraPicturesCount = pictures.length - 1;

  // Derive accent color rotation for comic variety
  const accents = ['cyan', 'red', 'yellow', 'pink'];
  const accent = accents[index % accents.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6, rotate: index % 2 === 0 ? 1 : -1 }}
      className={`message-card-panel accent-${accent}`}
    >
      <Link to={getMessageRoutePath(id)} className="message-card-link">
        {/* Photo Thumbnail Section */}
        {hasPictures ? (
          <div className="card-media-wrapper">
            <img
              src={imgError ? getFallbackImageSvg() : primaryPicture.url}
              alt={primaryPicture.alt || `Memory for ${messageTo}`}
              onError={() => setImgError(true)}
              loading="lazy"
              className="card-media-img"
            />
            <div className="card-media-overlay" />
            
            {/* Multiple Photos Badge */}
            {extraPicturesCount > 0 && (
              <span className="card-extra-badge">
                <ImageIcon size={14} /> +{extraPicturesCount} MORE
              </span>
            )}
          </div>
        ) : (
          <div className="card-no-media-banner">
            <MessageSquareQuote size={24} className="text-cyan" />
            <span className="no-media-label">COMIC DISPATCH</span>
          </div>
        )}

        {/* Card Body */}
        <div className="card-content-body">
          <div className="card-recipient-header">
            <span className="card-to-label">TO:</span>
            <span className="card-recipient-name">{messageTo || 'Birthday Star'}</span>
          </div>

          {messageBy && (
            <div className="card-sender-badge">
              <span className="card-by-label">BY:</span>
              <span className="card-sender-name">{messageBy}</span>
            </div>
          )}

          <p className="card-message-snippet">
            {displayMessage}
          </p>

          {/* Footer Callout */}
          <div className="card-footer-strip">
            <span className="card-read-label">
              READ FULL DISPATCH <ArrowUpRight size={16} />
            </span>
          </div>
        </div>

        <div className="card-halftone-overlay" />
      </Link>
    </motion.div>
  );
}
