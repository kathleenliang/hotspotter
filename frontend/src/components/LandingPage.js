import React from 'react';
import ContentCard from './ContentCard';

const LandingPage = () => {
    const images = {
        'eligibility': './CheckmarkIcon.png',
        'clinic': './LocationIcon.png',
        'submit': './AddLocation.png'
    }
    const titles = {
        'eligibility': 'Check eligibility',
        'clinic': 'Find a clinic',
        'submit': 'Submit a location'
    };
    const subtitles = {
        'eligibility': 'Find out if you’re eligible for the vaccine yet.',
        'clinic': 'Find a nearby clinic to get your vaccine.',
        'submit': 'Know of a vaccine location? Submit one to help others.'
    };
    const actions = {
        'eligibility': 'Check my eligibility',
        'clinic': 'Find a clinic',
        'submit': 'Submit a location'
    };
    const links = {
        'eligibility': '/eligibility',
        'clinic': '/clinics',
        'submit': '/submit'
    }

    return (
        <div>
            <div class="main-text">
                A centralized platform for vaccine seekers in Ontario hotspots
            </div>
            <div class="cc-row">
                <ContentCard title={titles.eligibility} subtitle={subtitles.eligibility} action={actions.eligibility} link={links.eligibility} image={images.eligibility}/>
                <ContentCard title={titles.clinic} subtitle={subtitles.clinic} action={actions.clinic} link={links.clinic} image={images.clinic} />
                <ContentCard title={titles.submit} subtitle={subtitles.submit} action={actions.submit} link={links.submit} image={images.submit} />
            </div>
        </div>
    );
    
};

export default LandingPage;