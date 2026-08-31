import React, { useState } from 'react';
import {
  Anchor,
  Avatar,
  Box,
  Button,
  Group,
  Text,
  Tooltip,
} from '@mantine/core';
import { signOut } from 'firebase/auth';
import {
  IconBriefcase,
  IconExternalLink,
  IconFolderCheck,
  IconLogout,
  IconServer,
  IconStar,
  IconUserCheck,
} from '@tabler/icons-react';
import { auth } from '../firebase';
import { usePortfolio } from '../context/PortfolioContext';
import { GradientBlobs } from '../components/GradientBlobs';
import { ProfileHeroEditor } from './components/ProfileHeroEditor';
import { ProjectsEditor } from './components/ProjectsEditor';
import { ExperienceEditor } from './components/ExperienceEditor';
import { SkillsRecommendationsEditor } from './components/SkillsRecommendationsEditor';
import { SystemStatusEditor } from './components/SystemStatusEditor';
import classes from './AdminDashboard.module.css';

type TabId = 'profile' | 'projects' | 'experience' | 'skills' | 'system';

interface NavItemConfig {
  id: TabId;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ size?: number }>;
  badgeCount?: number;
}

export const AdminDashboard: React.FC = () => {
  const { data, user } = usePortfolio();
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  const visibleProjectsCount = (data.projects || []).filter((p) => !p.hidden).length;
  const experienceCount = (data.experience || []).length;
  const totalSkillsCount = (data.skills?.technical || []).length + (data.skills?.soft || []).length;
  const recommendationsCount = (data.recommendations || []).filter((r) => !r.hidden).length;

  const navItems: NavItemConfig[] = [
    {
      id: 'profile',
      label: 'Profile & Hero Details',
      sublabel: 'Identity, tagline, bio & socials',
      icon: IconUserCheck,
    },
    {
      id: 'projects',
      label: 'Projects CMS',
      sublabel: 'Mobile & web applications',
      icon: IconFolderCheck,
      badgeCount: data.projects?.length || 0,
    },
    {
      id: 'experience',
      label: 'Experience & Education',
      sublabel: 'Work history & degrees',
      icon: IconBriefcase,
      badgeCount: (data.experience?.length || 0) + (data.education?.length || 0),
    },
    {
      id: 'skills',
      label: 'Skills & Recommendations',
      sublabel: 'Tech stack & testimonials',
      icon: IconStar,
    },
    {
      id: 'system',
      label: 'System & Data Sync',
      sublabel: 'Firestore state & JSON tools',
      icon: IconServer,
    },
  ];

  const handleSignOut = () => {
    signOut(auth);
  };

  const activeNavInfo = navItems.find((item) => item.id === activeTab) || navItems[0];

  return (
    <div className={classes.layout}>
      {/* Background Animated Blobs matching Portfolio Site */}
      <GradientBlobs />

      {/* Sidebar Navigation */}
      <aside className={classes.sidebar}>
        <div>
          <div className={classes.brandHeader}>
            <div className={classes.brandBadge}>MK</div>
            <div>
              <div className={classes.brandTitle}>Portfolio CMS</div>
              <div className={classes.brandSub}>Khdroo Live Node</div>
            </div>
          </div>

          <div className={classes.navSectionLabel}>Control Center</div>
          <div className={classes.navGroup}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`${classes.navItem} ${isActive ? classes.navItemActive : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <div className={classes.navItemIcon}>
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  {item.badgeCount !== undefined && (
                    <span className={classes.navItemBadge}>{item.badgeCount}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className={classes.sidebarFooter}>
          <Group gap="xs" wrap="nowrap">
            <Avatar size={38} radius="xl" color="brand" variant="filled">
              {user?.email ? user.email.slice(0, 2).toUpperCase() : 'AD'}
            </Avatar>
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Text size="xs" fw={700} truncate c="white">
                {user?.email || 'Administrator'}
              </Text>
              <Text size="10px" c="brand.2">
                Authorized Session
              </Text>
            </Box>
          </Group>

          <Group gap={6} mt="xs">
            <Anchor href="#" target="_blank" style={{ flex: 1 }}>
              <Button
                variant="gradient"
                gradient={{ from: '#2a70e4', to: '#1b65e2', deg: 120 }}
                size="xs"
                fullWidth
                rightSection={<IconExternalLink size={14} />}
              >
                Live Website
              </Button>
            </Anchor>
            <Tooltip label="Sign Out">
              <Button
                variant="subtle"
                color="red"
                size="xs"
                onClick={handleSignOut}
                style={{ padding: '0 10px' }}
              >
                <IconLogout size={16} />
              </Button>
            </Tooltip>
          </Group>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className={classes.mainContainer}>
        {/* Top Header Bar */}
        <header className={classes.topBar}>
          <div>
            <div className={classes.headerTitle}>{activeNavInfo.label}</div>
            <div className={classes.headerSub}>{activeNavInfo.sublabel}</div>
          </div>

          <Group gap="md">
            <div className={classes.statusBadgeSynced}>
              <span className={classes.pingWrapper}>
                <span className={classes.pingRing} />
                <span className={classes.pingDot} />
              </span>
              Live Synced (`Khdroo/content`)
            </div>
          </Group>
        </header>

        {/* Workspace Body */}
        <div className={classes.contentBody}>
          {/* Quick Metrics Grid */}
          <div className={classes.metricsGrid}>
            <div className={classes.metricCard}>
              <div>
                <div className={classes.metricValue}>{visibleProjectsCount}</div>
                <div className={classes.metricLabel}>Published Projects</div>
              </div>
              <div className={classes.metricIcon}>
                <IconFolderCheck size={26} />
              </div>
            </div>

            <div className={classes.metricCard}>
              <div>
                <div className={classes.metricValue}>{experienceCount}</div>
                <div className={classes.metricLabel}>Active Positions</div>
              </div>
              <div className={classes.metricIcon}>
                <IconBriefcase size={26} />
              </div>
            </div>

            <div className={classes.metricCard}>
              <div>
                <div className={classes.metricValue}>{totalSkillsCount}</div>
                <div className={classes.metricLabel}>Skills & Technologies</div>
              </div>
              <div className={classes.metricIcon}>
                <IconStar size={26} />
              </div>
            </div>

            <div className={classes.metricCard}>
              <div>
                <div className={classes.metricValue}>{recommendationsCount}</div>
                <div className={classes.metricLabel}>Client Testimonials</div>
              </div>
              <div className={classes.metricIcon}>
                <IconUserCheck size={26} />
              </div>
            </div>
          </div>

          {/* Active Tab Panel */}
          {activeTab === 'profile' && <ProfileHeroEditor />}
          {activeTab === 'projects' && <ProjectsEditor />}
          {activeTab === 'experience' && <ExperienceEditor />}
          {activeTab === 'skills' && <SkillsRecommendationsEditor />}
          {activeTab === 'system' && <SystemStatusEditor />}
        </div>
      </main>
    </div>
  );
};
