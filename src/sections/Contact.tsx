import { Group, Stack, Textarea, TextInput } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconMail, IconMapPin, IconPhone, IconSend } from '@tabler/icons-react';
import { Section } from '../components/Section';
import { usePortfolio } from '../context/PortfolioContext';
import { EASE_OUT } from '../motion';
import classes from './Contact.module.css';

export function Contact() {
  const { data } = usePortfolio();
  const siteConfig = data.siteConfig;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Thank you for reaching out! Your message has been submitted.');
  };

  return (
    <Section id="contact" title="Get in touch">
      <Stack gap="xl">
        <Group gap={32} wrap="wrap">
          {siteConfig.email && (
            <a href={`mailto:${siteConfig.email}`} className={classes.contactItem}>
              <IconMail size={16} stroke={1.5} />
              {siteConfig.email}
            </a>
          )}
          {siteConfig.phone && (
            <a href={`tel:${siteConfig.phone}`} className={classes.contactItem}>
              <IconPhone size={16} stroke={1.5} />
              {siteConfig.phone}
            </a>
          )}
          {siteConfig.location && (
            <span className={classes.contactItem}>
              <IconMapPin size={16} stroke={1.5} />
              {siteConfig.location}
            </span>
          )}
        </Group>

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          className={classes.form}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <Stack gap="md">
            <Group grow>
              <TextInput label="Name" placeholder="Your name" required />
              <TextInput label="Email" placeholder="you@example.com" type="email" required />
            </Group>
            <TextInput label="Subject" placeholder="Subject" />
            <Textarea label="Message" placeholder="Your message" minRows={4} required />
            <Group justify="flex-start">
              <motion.button
                type="submit"
                className={classes.submitButton}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Send message
                <IconSend size={16} />
              </motion.button>
            </Group>
          </Stack>
        </motion.form>
      </Stack>
    </Section>
  );
}
