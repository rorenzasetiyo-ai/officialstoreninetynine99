// ═══════════════════════════════════════════════════
// SECTION LOADER — Dynamic content loading
// ═══════════════════════════════════════════════════

async function loadSection(pageFile, containerId) {
  try {
    const response = await fetch(pageFile);
    if (!response.ok) throw new Error(`Failed to load ${pageFile}`);
    const html = await response.text();
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = html;
      console.log(`✅ Loaded ${pageFile} into #${containerId}`);
    }
  } catch (error) {
    console.error(`❌ Error loading ${pageFile}:`, error);
  }
}

// Load sections when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadSection('pages/bestsellers.html', 'bestseller-container');
  loadSection('pages/our-picks.html', 'ourpicks-container');
});
