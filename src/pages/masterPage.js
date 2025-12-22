// API Reference: https://www.wix.com/velo/reference/api-overview/introduction
// “Hello, World!” Example: https://learn-code.wix.com/en/article/hello-world

import wixWindow from 'wix-window';
import wixLocation from 'wix-location';

const OPTIONAL_ELEMENT_IDS = {
    backToTopButton: '#backToTopButton',
    footerYearText: '#footerYearText',
    footerCopyrightText: '#footerCopyrightText',
    navMenu: '#siteMenu',
    mobileMenuButton: '#mobileMenuButton',
    mobileMenuBox: '#mobileMenuBox',
};

$w.onReady(function () {
    setFooterYear();
    setupBackToTop();
    setupMobileMenuToggle();
    highlightActiveMenu();
});

function getOptionalElement(selector) {
    try {
        const element = $w(selector);
        return element || null;
    } catch (error) {
        return null;
    }
}

function setFooterYear() {
    const yearText = getOptionalElement(OPTIONAL_ELEMENT_IDS.footerYearText);
    const copyrightText = getOptionalElement(OPTIONAL_ELEMENT_IDS.footerCopyrightText);
    const currentYear = new Date().getFullYear();

    if (yearText && 'text' in yearText) {
        yearText.text = String(currentYear);
    }

    if (copyrightText && 'text' in copyrightText) {
        copyrightText.text = `© ${currentYear} Sudarshan AI Labs. All rights reserved.`;
    }
}

function setupBackToTop() {
    const backToTopButton = getOptionalElement(OPTIONAL_ELEMENT_IDS.backToTopButton);
    if (!backToTopButton) {
        return;
    }

    backToTopButton.hide();

    backToTopButton.onClick(() => {
        wixWindow.scrollTo(0, 0);
    });

    wixWindow.onScroll(({ scrollY }) => {
        if (scrollY > 400) {
            backToTopButton.show();
        } else {
            backToTopButton.hide();
        }
    });
}

function setupMobileMenuToggle() {
    const mobileMenuButton = getOptionalElement(OPTIONAL_ELEMENT_IDS.mobileMenuButton);
    const mobileMenuBox = getOptionalElement(OPTIONAL_ELEMENT_IDS.mobileMenuBox);

    if (!mobileMenuButton || !mobileMenuBox) {
        return;
    }

    mobileMenuBox.collapse();

    mobileMenuButton.onClick(() => {
        if (mobileMenuBox.collapsed) {
            mobileMenuBox.expand();
        } else {
            mobileMenuBox.collapse();
        }
    });
}

function highlightActiveMenu() {
    const navMenu = getOptionalElement(OPTIONAL_ELEMENT_IDS.navMenu);
    if (!navMenu || typeof navMenu.selectedIndex !== 'number') {
        return;
    }

    const path = wixLocation.path;
    const menuItems = navMenu.items || [];
    const activeIndex = menuItems.findIndex((item) => item.link === `/${path[0] || ''}`);

    if (activeIndex >= 0) {
        navMenu.selectedIndex = activeIndex;
    }
}
