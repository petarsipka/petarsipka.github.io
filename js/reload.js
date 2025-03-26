const reloadUsingLocationHash = () => {
    window.location.reload;
}

setTimeout(function() {
    window.onload = reloadUsingLocationHash();
}, 3000);
