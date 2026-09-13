import React, { useState } from 'react';
import { Group, Stack, Textarea, TextInput, Text, Title, Badge, Notification } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconMail, IconMapPin, IconPhone, IconSend, IconCopy, IconCheck, IconBrandWhatsapp } from '@tabler/icons-react';
import { Section } from '../components/Section';
import { usePortfolio } from '../context/PortfolioContext';
import { EASE_OUT } from '../motion';
import classes from './Contact.module.css';

export function Contact() {
  const { data } = usePortfolio();
  const siteConfig = data.siteConfig;
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    if (!siteConfig.email) return;
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <Section id="contact" title="Get in Touch" subtitle="Let&apos;s build something exceptional together. Feel free to reach out via email or message.">
      <Stack gap="xl">
        {/* Contact Cards Grid */}
        <div className={classes.cardGrid}>
          {siteConfig.email && (
            <div className={classes.contactCard} onClick={handleCopyEmail}>
              <div className={classes.contactIcon}>
                <IconMail size={22} />
              </div>
              <Stack gap={2} style={{ flex: 1 }}>
                <Group justify="space-between" align="center">
                  <Text className={classes.contactTitle}>Email Address</Text>
                  <Badge size="xs" color="blue" variant="subtle">
                    {copied ? 'Copied!' : 'Click to Copy'}
                  </Badge>
                </Group>
                <Text className={classes.contactValue}>{siteConfig.email}</Text>
              </Stack>
            </div>
          )}

          {siteConfig.phone && (
            <a
              href={`https://wa.me/${siteConfig.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.contactCard}
            >
              <div className={classes.contactIcon} style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                <IconBrandWhatsapp size={22} />
              </div>
              <Stack gap={2}>
                <Text className={classes.contactTitle}>Direct WhatsApp</Text>
                <Text className={classes.contactValue}>{siteConfig.phone}</Text>
              </Stack>
            </a>
          )}

          {siteConfig.location && (
            <div className={classes.contactCard} style={{ cursor: 'default' }}>
              <div className={classes.contactIcon}>
                <IconMapPin size={22} />
              </div>
              <Stack gap={2}>
                <Text className={classes.contactTitle}>Location</Text>
                <Text className={classes.contactValue}>{siteConfig.location}</Text>
              </Stack>
            </div>
          )}
        </div>

        {submitted && (
          <Notification icon={<IconCheck size={18} />} color="blue" title="Message Sent Successfully!" onClose={() => setSubmitted(false)}>
            Thank you for reaching out! Your message has been received.
          </Notification>
        )}

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className={classes.form}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <Stack gap="md">
            <Title order={4} c="white" mb={4}>
              Send a Direct Message
            </Title>
            <Group grow>
              <TextInput label="Your Name" placeholder="e.g. John Doe" required />
              <TextInput label="Email Address" placeholder="you@example.com" type="email" required />
            </Group>
            <TextInput label="Subject" placeholder="Project Inquiry / Job Opportunity" />
            <Textarea label="Message" placeholder="Tell me about your project or role details..." minRows={4} required />
            <Group justify="flex-start" mt="xs">
              <motion.button
                type="submit"
                className={classes.submitButton}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Send Message
                <IconSend size={16} />
              </motion.button>
            </Group>
          </Stack>
        </motion.form>
      </Stack>
    </Section>
  );
}
