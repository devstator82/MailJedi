document.addEventListener('Loaded', function() {
    fireunit.ok(typeof gslayer !== 'undefined', 'gslayer was loaded');
    fireunit.ok(gslayer.loaded, 'gslayer loaded event was called');
    fireunit.ok($('#show-options').length, 'MailJedi icon was injected correctly');
    fireunit.ok(gslayer.state.hasOffline, 'Offline icon was found');
    fireunit.reCompare(/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
            gslayer.state.emailAddress(), 'Validated email address successfully');

    // Only when url indicates this is an apps account
    if (/\/a\//.test(window.location))
        fireunit.ok(gslayer.state.isAppsUser, 'Validated apps user successfully');

}, false, true);

function testEvents() {
    if (typeof gslayer === 'undefined') {        
        alert('gslayer was not loaded, fireunit test suite did probably not run');
    }
}

setTimeout('testEvents();', 1000 * 5); // 5 seconds