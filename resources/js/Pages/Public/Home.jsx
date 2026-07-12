import React from 'react';
import { Head } from '@inertiajs/react';
import Reveal from '@/Components/Reveal';
import PublicLayout from '@/Layouts/PublicLayout';
import HeroSection from '@/Components/Public/HeroSection';
import AboutSection from '@/Components/Public/AboutSection';
import AteliersSection from '@/Components/Public/AteliersSection';
import ProgrammeSection from '@/Components/Public/ProgrammeSection';
import TimelineSection from '@/Components/Public/TimelineSection';
import PartenairesSection from '@/Components/Public/PartenairesSection';
import PricingSection from '@/Components/Public/PricingSection';
import DownloadsSection from '@/Components/Public/DownloadsSection';
import FaqSection from '@/Components/Public/FaqSection';
import ContactSection from '@/Components/Public/ContactSection';
import ScrollToTop from '@/Components/Public/ScrollToTop';


export default function Home({ faqs, timelineEvents, speakers, programSessions }) {
    return (
        <PublicLayout>
            <Head title="Accueil" />

            <Reveal>
            <HeroSection />
            </Reveal>

            <Reveal delay={200}>
            <AboutSection />
            </Reveal>

            <Reveal delay={200}>
            <AteliersSection />
            </Reveal>

            <Reveal delay={200}>
            <ProgrammeSection speakers={speakers} programSessions={programSessions} />
            </Reveal>

            <Reveal delay={200}>
            <TimelineSection timelineEvents={timelineEvents} />
            </Reveal>

            <Reveal delay={200}>
            <PricingSection />
            </Reveal>

            <Reveal delay={200}>
            <PartenairesSection />
            </Reveal>

            <Reveal delay={200}>
            <DownloadsSection />
            </Reveal>

            <Reveal delay={200}>
            <FaqSection faqs={faqs} />
            </Reveal>


            <ContactSection />
            <ScrollToTop />
        </PublicLayout>
    );
}
