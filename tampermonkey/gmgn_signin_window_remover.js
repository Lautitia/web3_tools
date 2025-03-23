// ==UserScript==
// @name         GMGN SignIn Window Remover
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Removes SignIn elements from gmgn.ai
// @author       0xFF
// @match        https://gmgn.ai/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gmgn.ai
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to remove all SignIn elements
    function removeChakraPortals() {
        const chakraPortals = document.querySelectorAll('.chakra-portal');
        console.log(`Found ${chakraPortals.length} chakra-portal elements to remove.`);

        chakraPortals.forEach(portal => {
            portal.remove();
        });

        console.log('All chakra-portal elements have been removed.');
    }

    // Run initially after page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', removeChakraPortals);
    } else {
        removeChakraPortals();
    }

    // Also set up a MutationObserver to handle dynamically added portals
    const observer = new MutationObserver(() => {
        const chakraPortals = document.querySelectorAll('.chakra-portal');
        if (chakraPortals.length > 0) {
            removeChakraPortals();
        }
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });
})();
