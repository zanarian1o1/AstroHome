document.getElementById('settingsButton').addEventListener('click', function() {
    const settingsPanel = document.getElementById('settingsPanel');
    settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('addShortcut').addEventListener('click', function() {
    const name = document.getElementById('shortcutName').value;
    const url = document.getElementById('shortcutUrl').value;
    if (name && url) {
        const shortcutList = document.getElementById('shortcutsList');
        const shortcutItem = document.createElement('div');
        shortcutItem.className = 'bg-white p-4 rounded shadow mb-2';
        shortcutItem.innerHTML = `
            <a href="${url}" target="_blank" class="text-blue-500">${name}</a>
        `;
        shortcutList.appendChild(shortcutItem);

        // Add to shortcut selection dropdown
        const shortcutSelect = document.getElementById('shortcutSelect');
        const option = document.createElement('option');
        option.value = name;
        option.text = name;
        shortcutSelect.add(option);

        // Clear input fields
        document.getElementById('shortcutName').value = '';
        document.getElementById('shortcutUrl').value = '';
    } else {
        alert('Please enter both name and URL for the shortcut.');
    }
});

document.getElementById('applySettings').addEventListener('click', function() {
    const color = document.getElementById('colorPicker').value;
    document.body.style.backgroundColor = color;

    const selectedShortcut = document.getElementById('shortcutSelect').value;
    if (selectedShortcut) {
        const shortcutItems = document.querySelectorAll('#shortcutsList div');
        shortcutItems.forEach(item => {
            if (item.innerText.includes(selectedShortcut)) {
                const shortcutColor = document.getElementById('shortcutColorPicker').value;
                item.style.borderColor = shortcutColor;
            }
        });
    }
});