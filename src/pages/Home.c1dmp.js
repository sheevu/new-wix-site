// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixLocation from 'wix-location';

const HERO_BUTTON_IDS = {
    primary: '#heroPrimaryButton',
    secondary: '#heroSecondaryButton',
};

const STAT_ELEMENTS = [
    { id: '#statClients', value: 120, suffix: '+' },
    { id: '#statProjects', value: 320, suffix: '+' },
    { id: '#statAccuracy', value: 98, suffix: '%' },
];

$w.onReady(function () {
    setupHeroButtons();
    animateStatsOnLoad();
});

function getOptionalElement(selector) {
    try {
        const element = $w(selector);
        return element || null;
    } catch (error) {
        return null;
    }
}

function setupHeroButtons() {
    const primaryButton = getOptionalElement(HERO_BUTTON_IDS.primary);
    const secondaryButton = getOptionalElement(HERO_BUTTON_IDS.secondary);

    if (primaryButton) {
        primaryButton.label = 'Get a Demo';
        primaryButton.onClick(() => wixLocation.to('/pricing'));
    }

    if (secondaryButton) {
        secondaryButton.label = 'Explore AI Services';
        secondaryButton.onClick(() => wixLocation.to('/about'));
    }
}

function animateStatsOnLoad() {
    STAT_ELEMENTS.forEach((stat) => {
        const element = getOptionalElement(stat.id);
        if (!element || !('text' in element)) {
            return;
        }

        animateCount(element, stat.value, stat.suffix);
    });
}

function animateCount(element, targetValue, suffix) {
    const duration = 1200;
    const startTime = Date.now();
    const startValue = 0;

    const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        element.text = `${currentValue}${suffix}`;

        if (progress >= 1) {
            clearInterval(interval);
        }
    }, 40);
}
