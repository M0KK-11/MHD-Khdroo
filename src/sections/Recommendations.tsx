import React from 'react';
import { Rating, Text, Avatar } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconQuote, IconCircleCheckFilled } from '@tabler/icons-react';
import { Section } from '../components/Section';
import { usePortfolio } from '../context/PortfolioContext';
import { EASE_OUT } from '../motion';
import classes from './Recommendations.module.css';

export const Recommendations: React.FC = () => {
  const { data } = usePortfolio();
  const visibleRecs = (data.recommendations || []).filter((r) => !r.hidden);

  if (visibleRecs.length === 0) return null;

  return (
    <Section
      id="recommendations"
      title="Recommendations & Feedback"
      subtitle="Endorsements and feedback from team leads, clients, and collaborators"
    >
      <div className={classes.grid}>
        {visibleRecs.map((rec, index) => {
          const initials = rec.author
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

          return (
            <motion.div
              key={rec.id || index}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: EASE_OUT }}
            >
              <div className={classes.card}>
                <div className={classes.cardGlow} />
                <IconQuote size={88} className={classes.quoteBackground} />

                <div>
                  <div className={classes.headerRow}>
                    <div className={classes.ratingWrapper}>
                      <Rating value={rec.rating} readOnly size="sm" />
                    </div>
                    <span className={classes.verifiedBadge}>
                      <IconCircleCheckFilled size={12} /> Verified Feedback
                    </span>
                  </div>

                  <Text className={classes.quoteText}>
                    &ldquo;{rec.text}&rdquo;
                  </Text>
                </div>

                <div className={classes.authorRow}>
                  <div className={classes.avatarRing}>
                    {rec.avatarUrl ? (
                      <img
                        src={rec.avatarUrl}
                        alt={rec.author}
                        className={classes.authorAvatar}
                      />
                    ) : (
                      <Avatar
                        radius="xl"
                        size={44}
                        color="blue"
                        style={{ width: '100%', height: '100%', fontSize: '14px', fontWeight: 700 }}
                      >
                        {initials}
                      </Avatar>
                    )}
                  </div>

                  <div className={classes.authorMeta}>
                    <span className={classes.authorName}>{rec.author}</span>
                    <span className={classes.authorRole}>
                      {rec.role} {rec.company && <>· <span className={classes.companyTag}>{rec.company}</span></>}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};
