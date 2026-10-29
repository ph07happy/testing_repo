import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Grid,
  Lock,
  UserCheck,
  Calendar,
  Share2,
  Sparkles,
} from 'lucide-react';
import PhotoGallery from '../components/PhotoGallery';
import ComicButton from '../components/ComicButton';
import LoadingScreen from '../components/LoadingScreen';
import { getMessageRoutePath } from '../utils/routeUtils';
import './BirthdayMessagePage.css';

export default function BirthdayMessagePage({
  revealState,
  messagesState,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isUnlocked } = revealState;
  const { getMessageById, getAdjacent, isLoading, messages } = messagesState;

  // Scroll to top when response changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  // STRICT ACCESS CONTROL: Before the birthday, manual route access is blocked
  if (!isUnlocked) {
    return (
      <div className="spider-container message-page-root">
        <div className="message-locked-card">
          <div className="comic-badge-sfx red">CLASSIFIED TRANSMISSION</div>
          <div className="message-locked-icon">
            <Lock size={44} className="text-red" />
          </div>
          <h2 className="comic-title message-locked-title">
            TRANSMISSION IS ENCRYPTED
          </h2>
          <p className="message-locked-text">
            This birthday dispatch is sealed until the birthday countdown reaches zero. You cannot bypass the universe timer!
          </p>
          <Link to="/">
            <ComicButton variant="cyan" size="md" icon={<ArrowLeft size={18} />}>
              BACK TO COUNTDOWN
            </ComicButton>
          </Link>
        </div>
      </div>
    );
  }

  // Loading state if messages list is currently being fetched
  if (isLoading && messages.length === 0) {
    return <LoadingScreen message="DECRYPTING MULTIVERSE DISPATCH..." />;
  }

  // Lookup response by unique stable ID
  const response = getMessageById(id);

  // Response Not Found State
  if (!response) {
    return (
      <div className="spider-container message-page-root">
        <div className="message-not-found-card">
          <span className="comic-badge-sfx yellow">TIMELINE GLITCH // 404</span>
          <h2 className="comic-title not-found-title">DISPATCH NOT FOUND</h2>
          <p className="not-found-text">
            No transmission matching ID <strong>"{id}"</strong> exists in this dimension. It may have slipped through a temporal rift or hasn't arrived yet.
          </p>
          <Link to="/gallery">
            <ComicButton variant="cyan" size="md" icon={<Grid size={18} />}>
              BROWSE ALL DISPATCHES
            </ComicButton>
          </Link>
        </div>
      </div>
    );
  }

  const { messageTo, messageBy, message, pictures = [] } = response;
  const displayMessage = message || messageBy;
  const { previous, next, currentIndex, total } = getAdjacent(id);

  return (
    <div className="spider-container message-page-root">
      {/* Top Navigation & Breadcrumbs */}
      <div className="message-top-nav-bar">
        <Link to="/gallery" className="back-gallery-link">
          <ArrowLeft size={18} />
          <span>ALL DISPATCHES</span>
        </Link>

        <div className="message-dispatch-meta">
          <span className="dispatch-id-pill">ID: {response.id}</span>
          <span className="dispatch-counter-pill">
            {currentIndex + 1} OF {total}
          </span>
        </div>
      </div>

      {/* Main Comic Transmission Article */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="message-comic-panel-card"
      >
        {/* Recipient & Sender Strip */}
        <div className="message-header-strip">
          <div className="message-parties-column">
            <div className="message-to-badge">
              <span className="meta-label">TO:</span>
              <h1 className="message-recipient-name text-glitch">
                {messageTo || 'Birthday Star'}
              </h1>
            </div>

            {messageBy && (
              <div className="message-by-badge">
                <span className="meta-label-by">FROM:</span>
                <span className="message-sender-name">{messageBy}</span>
              </div>
            )}
          </div>

          <div className="message-badge-wrap">
            <span className="comic-badge-sfx cyan">VERIFIED MEMORY</span>
          </div>
        </div>

        {/* Message Content: Submitted message field */}
        <div className="message-body-container">
          <div className="message-text-quote-box">
            <p className="message-body-text">{displayMessage}</p>
            {messageBy && (
              <div className="message-signature-strip">
                <span className="signature-dash">—</span>
                <span className="signature-name">{messageBy}</span>
              </div>
            )}
          </div>
        </div>

        {/* Responsive Photo Gallery: ONE response = ALL photos displayed on this single page */}
        {pictures && pictures.length > 0 ? (
          <div className="message-photos-section">
            <div className="section-label-bar">
              <span className="comic-tag">ATTACHED ARTIFACTS ({pictures.length})</span>
            </div>
            <PhotoGallery pictures={pictures} recipientName={messageTo} />
          </div>
        ) : (
          <div className="message-no-photos-note">
            <span>Text-only transmission recorded in Earth-1610 archives.</span>
          </div>
        )}
      </motion.article>

      {/* PREVIOUS & NEXT NAVIGATION BUTTONS (Navigates between entire responses) */}
      <nav className="message-pagination-controls" aria-label="Adjacent dispatches">
        {previous ? (
          <button
            type="button"
            onClick={() => navigate(getMessageRoutePath(previous.id))}
            className="pagination-btn prev-btn"
          >
            <ArrowLeft size={20} className="nav-arrow" />
            <div className="pagination-text-group">
              <span className="pagination-dir">PREVIOUS MESSAGE</span>
              <span className="pagination-target-name">{previous.messageTo}</span>
            </div>
          </button>
        ) : (
          <div className="pagination-btn disabled" aria-disabled="true">
            <ArrowLeft size={20} className="nav-arrow" />
            <div className="pagination-text-group">
              <span className="pagination-dir">PREVIOUS MESSAGE</span>
              <span className="pagination-target-name">START OF TRANSMISSIONS</span>
            </div>
          </div>
        )}

        <Link to="/gallery" className="pagination-gallery-shortcut">
          <Grid size={20} />
          <span className="shortcut-label">GALLERY</span>
        </Link>

        {next ? (
          <button
            type="button"
            onClick={() => navigate(getMessageRoutePath(next.id))}
            className="pagination-btn next-btn"
          >
            <div className="pagination-text-group text-right">
              <span className="pagination-dir">NEXT MESSAGE</span>
              <span className="pagination-target-name">{next.messageTo}</span>
            </div>
            <ArrowRight size={20} className="nav-arrow" />
          </button>
        ) : (
          <div className="pagination-btn disabled" aria-disabled="true">
            <div className="pagination-text-group text-right">
              <span className="pagination-dir">NEXT MESSAGE</span>
              <span className="pagination-target-name">END OF TRANSMISSIONS</span>
            </div>
            <ArrowRight size={20} className="nav-arrow" />
          </div>
        )}
      </nav>
    </div>
  );
}
