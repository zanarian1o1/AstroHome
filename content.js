window.addEventListener('load', () => {
    const shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
    const shortcutContainer = document.createElement('div');
    shortcutContainer.id = 'shortcutContainer';
    shortcutContainer.style.position = 'absolute';
    shortcutContainer.style.top = '150px'; // Adjust this value as needed
    shortcutContainer.style.left = '50%';
    shortcutContainer.style.transform = 'translateX(-50%)';
    shortcutContainer.style.zIndex = '1000';
    shortcutContainer.style.display = 'flex';
    shortcutContainer.style.flexWrap = 'wrap'; // Allow buttons to wrap
    shortcutContainer.style.gap = '20px'; // Space between buttons

    // Loop through the shortcuts and create buttons
    shortcuts.forEach(shortcut => {
        const shortcutDiv = document.createElement('div');
        shortcutDiv.classList.add('button-container');
        shortcutDiv.style.position = 'relative'; // Ensure this is set

        const shortcutButton = document.createElement('button');
        shortcutButton.innerText = shortcut.name; // Set the button text
        shortcutButton.onclick = () => {
            window.open(shortcut.url.startsWith('http') ? shortcut.url : 'http://' + shortcut.url, '_blank'); // Open the URL in a new tab
        };

        // Create the dots button
        const dotsButton = document.createElement('button');
        dotsButton.innerHTML = '&#x22EE;'; // Vertical ellipsis (three dots)
        dotsButton.classList.add('dots-button'); // Use the new class

        // Append the dots button after the shortcut button
        shortcutDiv.appendChild(shortcutButton);
        shortcutDiv.appendChild(dotsButton);

        // Create the popup menu
        const popupMenu = document.createElement('div');
        popupMenu.classList.add('popup-menu'); // Use the new class
        const removeOption = document.createElement('div');
        removeOption.innerText = 'Remove Shortcut';
        removeOption.style.padding = '10px';
        removeOption.style.cursor = 'pointer';
        removeOption.style.color = '#bb86fc'; // Light purple color
        removeOption.onmouseover = () => {
            removeOption.style.backgroundColor = '#444444'; // Darken on hover
        };
        removeOption.onmouseout = () => {
            removeOption.style.backgroundColor = ''; // Reset background
        };
        removeOption.onclick = () => {
            // Remove the shortcut from local storage
            let shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
            shortcuts = shortcuts.filter(s => s.name !== shortcut.name || s.url !== shortcut.url); // Remove the shortcut
            localStorage.setItem('shortcuts', JSON.stringify(shortcuts)); // Update local storage

            // Remove the shortcut from the display
            shortcutContainer.removeChild(shortcutDiv);
        };

        popupMenu.appendChild(removeOption);
        shortcutDiv.appendChild(popupMenu);
        shortcutContainer.appendChild(shortcutDiv);

        // Show/hide the popup menu when the dots button is clicked
        dotsButton.onclick = (event) => {
            event.stopPropagation(); // Prevent the click from bubbling up to the document
            popupMenu.style.display = popupMenu.style.display === 'none' ? 'block' : 'none';
        };
    });

    document.body.appendChild(shortcutContainer);
});