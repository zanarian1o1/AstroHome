document.getElementById('addShortcut').addEventListener('click', () => {
    const name = document.getElementById('shortcutName').value;
    const url = document.getElementById('shortcutUrl').value;

    if (name && url) {
        const shortcutsList = document.getElementById('shortcutsList');
        
        // Create a new shortcut button and dots button
        const shortcutDiv = document.createElement('div');
        shortcutDiv.classList.add('button-container');
        shortcutDiv.style.position = 'relative'; // Ensure this is set

        const shortcutButton = document.createElement('button');
        shortcutButton.classList.add('custom-button'); // Add this line     
        shortcutButton.innerText = name; // Set the button text
        shortcutButton.onclick = () => {
            window.open(url.startsWith('http') ? url : 'http://' + url, '_blank'); // Open the URL in a new tab
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
            shortcuts = shortcuts.filter(s => s.name !== name || s.url !== url); // Remove the shortcut
            localStorage.setItem('shortcuts', JSON.stringify(shortcuts)); // Update local storage

            // Remove the shortcut from the display
            shortcutsList.removeChild(shortcutDiv);
        };

        popupMenu.appendChild(removeOption);
        shortcutDiv.appendChild(popupMenu);
        shortcutsList.appendChild(shortcutDiv);

        // Show/hide the popup menu when the dots button is clicked
        dotsButton.onclick = (event) => {
            event.stopPropagation(); // Prevent the click from bubbling up to the document
            popupMenu.style.display = popupMenu.style.display === 'none' ? 'block' : 'none';
        };

        // Save the new shortcut to local storage
        const shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
        shortcuts.push({ name, url });
        localStorage.setItem('shortcuts', JSON.stringify(shortcuts));

        // Clear input fields
        document.getElementById('shortcutName').value = '';
        document.getElementById('shortcutUrl').value = '';
    } else {
        alert('Please enter both name and URL for the shortcut.');
    }
});

// Load shortcuts from local storage when the page loads
window.addEventListener('load', () => {
    const shortcuts = JSON.parse(localStorage.getItem('shortcuts')) || [];
    const shortcutsList = document.getElementById('shortcutsList');

    shortcuts.forEach(shortcut => {
        const shortcutDiv = document.createElement('div');
        shortcutDiv.classList.add('button-container');
        shortcutDiv.style.position = 'relative'; // Ensure this is set

        const shortcutButton = document.createElement('button');
        shortcutButton.classList.add('custom-button');
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
            shortcutsList.removeChild(shortcutDiv);
        };

        popupMenu.appendChild(removeOption);
        shortcutDiv.appendChild(popupMenu);
        shortcutsList.appendChild(shortcutDiv);

        // Show/hide the popup menu when the dots button is clicked
        dotsButton.onclick = (event) => {
            event.stopPropagation(); // Prevent the click from bubbling up to the document
            popupMenu.style.display = popupMenu.style.display === 'none' ? 'block' : 'none';
        };
    });

    // Close settings panel when clicking outside of it
    document.addEventListener('click', (event) => {
        const settingsPanel = document.getElementById('settingsPanel');
        const settingsButton = document.getElementById('settingsButton');

        // Check if the click is outside the settings panel and the settings button
        if (settingsPanel.style.display === 'block' && !settingsPanel.contains(event.target) && !settingsButton.contains(event.target)) {
            settingsPanel.style.display = 'none';
        }
    });

    // Close popup menu when clicking outside of it
    document.addEventListener('click', (event) => {
        const popupMenus = document.querySelectorAll('.popup-menu');

        popupMenus.forEach(popupMenu => {
            const dotsButton = popupMenu.previousElementSibling; // Get the dots button associated with the popup menu

            // Check if the click is outside the popup menu and the dots button
            if (popupMenu.style.display === 'block' && !popupMenu.contains(event.target) && !dotsButton.contains(event.target)) {
                popupMenu.style.display = 'none';
            }
        });
    });
    // Toggle settings panel when settings button is clicked
    document.getElementById('settingsButton').addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click from bubbling up to the document
        const settingsPanel = document.getElementById('settingsPanel');
        settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
    });
});