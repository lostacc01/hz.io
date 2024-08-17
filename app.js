document.addEventListener('DOMContentLoaded', () => {
    // Enlaces de navegación
    const playlistsLink = document.querySelector('[data-target="playlists"]');
    const addToPublicPlaylistLink = document.querySelector('[data-target="add-to-public-playlist"]');
    const donacionesLink = document.querySelector('[data-target="donaciones"]');
    const creditosLink = document.querySelector('[data-target="creditos"]');

    // Secciones
    const playlistsSection = document.getElementById('playlists');
    const addToPublicPlaylistSection = document.getElementById('add-to-public-playlist');
    const donacionesSection = document.getElementById('donaciones');
    const creditosSection = document.getElementById('creditos');
    const mainHeader = document.getElementById('main-header');

    // Reproductor de audio
    const audioPlayer = document.getElementById('audio-player');
    const audio = document.getElementById('audio');
    const audioSource = document.getElementById('audio-source');

    // Función para ocultar el contenido principal
    function hideMainContent() {
        mainHeader.style.display = 'none';
    }

    // Función para mostrar una sección
    function showSection(section) {
        const sections = [playlistsSection, addToPublicPlaylistSection, donacionesSection, creditosSection];
        sections.forEach(sec => {
            sec.classList.add('hidden');
        });
        section.classList.remove('hidden');
    }

    // Función para copiar el enlace de donación al portapapeles
    function copyDonationLink() {
        const donationLink = document.getElementById('donation-link').href;
        navigator.clipboard.writeText(donationLink)
            .then(() => {
                alert('Enlace copiado al portapapeles');
            })
            .catch(err => {
                alert('No se pudo copiar el enlace');
                console.error('Error al copiar el enlace: ', err);
            });
    }

    // Event listeners para los enlaces de la barra lateral
    playlistsLink.addEventListener('click', () => showSection(playlistsSection));
    addToPublicPlaylistLink.addEventListener('click', () => showSection(addToPublicPlaylistSection));
    donacionesLink.addEventListener('click', () => showSection(donacionesSection));
    creditosLink.addEventListener('click', () => showSection(creditosSection));

    // Manejo de clic en elementos de la lista de reproducción
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.addEventListener('click', () => {
            const audioSrc = item.getAttribute('data-audio-src');
            const trackName = item.getAttribute('data-track-name');
            
            audioSource.src = audioSrc;
            audio.load();
            audio.play().catch(error => {
                console.error('Error al reproducir el audio:', error);
            });

            // Mostrar el reproductor de audio si está oculto
            audioPlayer.classList.remove('hidden');
        });
    });

    // Manejo de clic en el botón de copiar enlace
    document.getElementById('copy-link-button').addEventListener('click', copyDonationLink);

    // Mostrar la sección de inicio por defecto
    showSection(playlistsSection);
});
