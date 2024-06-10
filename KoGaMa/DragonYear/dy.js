(function() {
    'use strict';

    // Create a custom div for the confetti effect
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    document.body.appendChild(confettiContainer);

    // Create a transparent layer with a shadow background
    const shadowLayer = document.createElement('div');
    shadowLayer.style.position = 'absolute';
    shadowLayer.style.top = '0';
    shadowLayer.style.left = '0';
    shadowLayer.style.width = '100%';
    shadowLayer.style.height = '100%';
    shadowLayer.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))';
    confettiContainer.appendChild(shadowLayer);

    // Function to generate a random number within a range
    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Function to create a confetti particle with random shape
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = `${getRandom(5, 20)}px`;
        confetti.style.height = `${getRandom(5, 20)}px`;
        confetti.style.background = `rgb(${Math.floor(getRandom(100, 255))}, ${Math.floor(getRandom(100, 255))}, ${Math.floor(getRandom(100, 255))})`;
        confetti.style.borderRadius = `${getRandom(0, 50)}%`;
        confettiContainer.appendChild(confetti);

        // Set initial position and animation
        const startX = getRandom(0, window.innerWidth);
        const startY = getRandom(-500, 0);
        confetti.style.transform = `translate(${startX}px, ${startY}px) rotate(${getRandom(0, 360)}deg)`;

        const endX = getRandom(0, window.innerWidth);
        const endY = window.innerHeight + getRandom(100, 500);

        const duration = getRandom(4, 8);
        confetti.style.transition = `transform ${duration}s linear, opacity ${duration}s linear`;

        // Move the confetti to the final position and fade out
        setTimeout(() => {
            confetti.style.transform = `translate(${endX}px, ${endY}px) rotate(${getRandom(0, 360)}deg)`;
            confetti.style.opacity = '0';
        }, 0);

        // Remove the confetti after the animation ends
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }

    // Function to generate confetti particles at random intervals
    function generateConfetti() {
        for (let i = 0; i < 600; i++) {
            setTimeout(createConfetti, getRandom(0, 4300));
        }
    }

    // Call the confetti generation function
    generateConfetti();

})();

(function() {
    'use strict';

    // Function to convert text matching [Name](url) pattern to hyperlinks with custom styling
    function convertTextToLinks(text) {
        return text.replace(/\[(.*?)\]\((.*?)\)/g, function(match, title, link) {
            if (link.startsWith('http://') || link.startsWith('https://')) {
                return '<a href="' + link + '" target="_blank" style="text-decoration: underline; color: #FDDC5C;">' + title + '</a>';
            } else {
                return '<a href="http://' + link + '" target="_blank" style="text-decoration: underline; color: #FDDC5C;">' + title + '</a>';
            }
        });
    }

    // Function to format inline code using backticks
    function formatInlineCode(text) {
        return text.replace(/`(.*?)`/g, '<code>$1</code>');
    }

    // Function to add Markdown formatting to text
    function addMarkdownFormatting(element) {
        var originalText = element.innerHTML;
        var formattedText = convertTextToLinks(originalText);
        formattedText = formatInlineCode(formattedText);
        if (originalText !== formattedText) {
            element.innerHTML = formattedText;
        }
    }

    // Function to scan the entire site for changes and format Markdown
    function scanSiteForMarkdown() {
        var elements = document.querySelectorAll('body *:not(script):not(style):not(iframe):not(textarea):not(meta):not(title)');

        elements.forEach(function(element) {
            if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
                addMarkdownFormatting(element);
            }
        });

        // Additionally, format the specified element
        var targetElement = document.querySelector('#mobile-page #profile-page .creations-feed section.creations-custom .section-description .description-container .text');
        if (targetElement) {
            addMarkdownFormatting(targetElement);
        }
    }

    // Function to check for changes periodically
    function checkForChanges() {
        scanSiteForMarkdown();
        setTimeout(checkForChanges, 500);
    }

    // Run the function to check for changes and format Markdown on page load
    window.addEventListener('load', checkForChanges);

})();

(function() {
    'use strict';

    // Function to convert text matching [Name](url) pattern to hyperlinks with custom styling
    function convertTextToLinks(text) {
        text = text.replace(/\[(.*?)\]\((.*?)\)/g, function(match, title, link) {
            if (link.startsWith('http://') || link.startsWith('https://')) {
                return '<a href="' + link + '" target="_blank">' + title + '</a>';
            } else {
                return '<a href="http://' + link + '" target="_blank">' + title + '</a>';
            }
        });

        return text;
    }

    // Function to format inline code using backticks
    function formatInlineCode(text) {
        return text.replace(/`(.*?)`/g, '<code>$1</code>');
    }

    // Function to add Markdown formatting to text
    function addMarkdownFormatting(text) {
        text = convertTextToLinks(text);
        text = formatInlineCode(text);
        return text;
    }

    // Function to scan the entire site for changes and format Markdown
    function checkForChanges() {
        var elements = document.querySelectorAll('body *:not(script)');

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
                var formattedText = addMarkdownFormatting(element.innerHTML);
                element.innerHTML = formattedText;
            }
        }

        setTimeout(checkForChanges, 500);
    }

    // Run the function to check for changes and format Markdown on page load
    window.addEventListener('load', checkForChanges);

})();
