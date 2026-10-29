import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Search, Sparkles, Inbox, Bell } from 'lucide-react';
import MessageCard from '../components/MessageCard';
import LoadingScreen from '../components/LoadingScreen';
import ErrorState from '../components/ErrorState';
import ComicButton from '../components/ComicButton';
import './MessageGallerySection.css';

export default function MessageGallerySection({
  messages = [],
  isLoading = false,
  error = null,
  onRefresh,
  showNewBadge = false,
  newResponsesCount = 0,
  onDismissNewBadge,
  lastRefreshed = null,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter messages based on search query
  const filtered = messages.filter((msg) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const to = (msg.messageTo || '').toLowerCase();
    const by = (msg.messageBy || '').toLowerCase();
    const message = (msg.message || '').toLowerCase();
    return to.includes(q) || by.includes(q) || message.includes(q);
  });

  return (
    <section className="spider-gallery-section" id="gallery-anchor">
      <div className="spider-container">
        {/* Gallery Header Bar */}
        <div className="gallery-header-bar">
          <div>
            <div className="comic-tag">TRANSMISSION FEED</div>
            <h2 className="comic-title gallery-title">
              BIRTHDAY <span className="text-glitch">DISPATCHES</span>
            </h2>
            <p className="gallery-subtitle">
              Personalized transmissions intercepted from across every corner of the Spider-Verse.
            </p>
          </div>

          <div className="gallery-top-controls">
            {/* Search Input */}
            <div className="gallery-search-wrap">
              <Search size={18} className="gallery-search-icon" />
              <input
                type="text"
                placeholder="Search memories or senders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="gallery-search-input"
              />
            </div>

            {/* Manual Refresh Button */}
            {onRefresh && (
              <ComicButton
                variant="dark"
                size="sm"
                onClick={onRefresh}
                icon={<RefreshCw size={16} />}
                disabled={isLoading}
              >
                SYNC FEED
              </ComicButton>
            )}
          </div>
        </div>

        {/* Live Update Toast Notification */}
        <AnimatePresence>
          {showNewBadge && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              className="gallery-new-transmissions-banner"
            >
              <div className="new-banner-left">
                <Bell size={20} className="text-yellow" />
                <span className="new-banner-text">
                  <strong>NEW MEMORIES UNLOCKED!</strong>{' '}
                  {newResponsesCount} new transmission{newResponsesCount > 1 ? 's' : ''} just arrived from the form.
                </span>
              </div>
              <button
                type="button"
                onClick={onDismissNewBadge}
                className="new-banner-dismiss-btn"
              >
                DISMISS
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content States */}
        {isLoading && messages.length === 0 ? (
          <LoadingScreen message="INTERCEPTING MULTIVERSE RESPONSES..." />
        ) : error ? (
          <ErrorState message={error} onRetry={onRefresh} />
        ) : filtered.length === 0 ? (
          <div className="gallery-empty-state">
            <div className="empty-icon-box">
              <Inbox size={42} className="text-cyan" />
            </div>
            <h3 className="empty-title">NO DISPATCHES FOUND</h3>
            <p className="empty-text">
              {searchQuery
                ? 'No responses matched your search terms.'
                : 'No approved birthday responses have been submitted yet. Transmissions will appear here live as friends and family respond!'}
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="empty-clear-btn"
              >
                CLEAR SEARCH FILTER
              </button>
            )}
          </div>
        ) : (
          <div className="gallery-cards-grid">
            {filtered.map((response, idx) => (
              <MessageCard key={response.id} response={response} index={idx} />
            ))}
          </div>
        )}

        {/* Feed Metadata */}
        <div className="gallery-footer-meta">
          <span>{filtered.length} TRANSMISSION{filtered.length !== 1 ? 'S' : ''} READY</span>
          {lastRefreshed && (
            <span>LAST SYNCED: {lastRefreshed.toLocaleTimeString()}</span>
          )}
        </div>
      </div>
    </section>
  );
}
