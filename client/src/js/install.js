const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Update UI notify the user they can install the PWA
    // showInstallPromotion();
    // Optionally, send analytics event that PWA install promo was shown.
    console.log(`'beforeinstallprompt' event was fired.`);
});

butInstall.addEventListener('click', async () => {
    // Hide the app provided install promotion
    // hideInstallPromotion();
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Optionally, send analytics event with outcome of user choice
    console.log(`User response to the install prompt: ${outcome}`);
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
});

window.addEventListener('appinstalled', (event) => {
    // Hide the app-provided install promotion
    // hideInstallPromotion();
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null;
    // Optionally, send analytics event to indicate successful install
    console.log('PWA was installed');
});
