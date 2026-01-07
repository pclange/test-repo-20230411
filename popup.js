/**
 * Popup UI Script
 * Displays contrast analysis results
 */

document.addEventListener('DOMContentLoaded', () => {
  const analyzeBtn = document.getElementById('analyzeBtn');
  const loadingDiv = document.getElementById('loading');
  const errorDiv = document.getElementById('error');
  const errorMessage = document.getElementById('errorMessage');
  const summaryDiv = document.getElementById('summary');
  const resultsDiv = document.getElementById('results');
  const filtersDiv = document.getElementById('filters');
  const filterFail = document.getElementById('filterFail');
  const filterPass = document.getElementById('filterPass');

  let currentResults = [];

  /**
   * Shows loading state
   */
  function showLoading() {
    loadingDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');
    summaryDiv.classList.add('hidden');
    resultsDiv.innerHTML = '';
    filtersDiv.classList.add('hidden');
  }

  /**
   * Shows error message
   */
  function showError(message) {
    loadingDiv.classList.add('hidden');
    errorDiv.classList.remove('hidden');
    errorMessage.textContent = message;
    summaryDiv.classList.add('hidden');
    resultsDiv.innerHTML = '';
    filtersDiv.classList.add('hidden');
  }

  /**
   * Updates summary statistics
   */
  function updateSummary(colorPairs) {
    const total = colorPairs.length;
    const aaPass = colorPairs.filter(p => p.compliance.AA).length;
    const aaaPass = colorPairs.filter(p => p.compliance.AAA).length;
    const failures = colorPairs.filter(p => !p.compliance.AA).length;

    document.getElementById('totalPairs').textContent = total;
    document.getElementById('aaPass').textContent = aaPass;
    document.getElementById('aaaPass').textContent = aaaPass;
    document.getElementById('failures').textContent = failures;

    summaryDiv.classList.remove('hidden');
    filtersDiv.classList.remove('hidden');
  }

  /**
   * Creates a color pair result card
   */
  function createResultCard(pair) {
    const card = document.createElement('div');
    card.className = 'result-card';
    
    if (!pair.compliance.AA) {
      card.classList.add('fail');
    }

    const colorPreview = document.createElement('div');
    colorPreview.className = 'color-preview';
    colorPreview.innerHTML = `
      <div class="color-sample" style="background: ${pair.background.hex}; color: ${pair.foreground.hex};">
        Sample Text
      </div>
      <div class="color-info">
        <div class="color-swatch" style="background: ${pair.foreground.hex};" title="Foreground"></div>
        <span class="color-label">${pair.foreground.hex}</span>
        <span class="color-separator">on</span>
        <div class="color-swatch" style="background: ${pair.background.hex};" title="Background"></div>
        <span class="color-label">${pair.background.hex}</span>
      </div>
    `;

    const ratioInfo = document.createElement('div');
    ratioInfo.className = 'ratio-info';
    ratioInfo.innerHTML = `
      <div class="ratio-value">${pair.ratio.toFixed(2)}:1</div>
      <div class="ratio-label">Contrast Ratio</div>
    `;

    const complianceInfo = document.createElement('div');
    complianceInfo.className = 'compliance-info';
    
    const aaBadge = document.createElement('span');
    aaBadge.className = `badge ${pair.compliance.AA ? 'badge-pass' : 'badge-fail'}`;
    aaBadge.textContent = 'AA';
    aaBadge.title = `WCAG AA ${pair.compliance.AA ? 'Pass' : 'Fail'} (requires ${pair.compliance.requirements.AA}:1)`;
    
    const aaaBadge = document.createElement('span');
    aaaBadge.className = `badge ${pair.compliance.AAA ? 'badge-pass' : 'badge-fail'}`;
    aaaBadge.textContent = 'AAA';
    aaaBadge.title = `WCAG AAA ${pair.compliance.AAA ? 'Pass' : 'Fail'} (requires ${pair.compliance.requirements.AAA}:1)`;

    complianceInfo.appendChild(aaBadge);
    complianceInfo.appendChild(aaaBadge);

    const detailsInfo = document.createElement('div');
    detailsInfo.className = 'details-info';
    
    const textSize = pair.compliance.isLargeText ? 'Large Text' : 'Normal Text';
    const boldText = pair.isBold ? ' (Bold)' : '';
    
    detailsInfo.innerHTML = `
      <div class="detail-item">
        <span class="detail-label">Type:</span>
        <span class="detail-value">${textSize}${boldText}</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Font Size:</span>
        <span class="detail-value">${pair.fontSize.toFixed(1)}px</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">Occurrences:</span>
        <span class="detail-value">${pair.count}</span>
      </div>
      <div class="detail-item sample-text">
        <span class="detail-label">Sample:</span>
        <span class="detail-value">"${pair.sampleText}"</span>
      </div>
    `;

    card.appendChild(colorPreview);
    card.appendChild(ratioInfo);
    card.appendChild(complianceInfo);
    card.appendChild(detailsInfo);

    return card;
  }

  /**
   * Displays results with current filters
   */
  function displayResults(colorPairs) {
    const showFail = filterFail.checked;
    const showPass = filterPass.checked;

    resultsDiv.innerHTML = '';

    const filteredPairs = colorPairs.filter(pair => {
      if (!pair.compliance.AA && showFail) return true;
      if (pair.compliance.AA && showPass) return true;
      return false;
    });

    if (filteredPairs.length === 0) {
      resultsDiv.innerHTML = '<div class="no-results">No results match the current filters.</div>';
      return;
    }

    // Sort: failures first, then by ratio
    filteredPairs.sort((a, b) => {
      if (!a.compliance.AA && b.compliance.AA) return -1;
      if (a.compliance.AA && !b.compliance.AA) return 1;
      return a.ratio - b.ratio;
    });

    filteredPairs.forEach(pair => {
      resultsDiv.appendChild(createResultCard(pair));
    });

    loadingDiv.classList.add('hidden');
  }

  /**
   * Analyzes current page
   */
  async function analyzePage() {
    showLoading();

    try {
      // Get active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab) {
        showError('No active tab found');
        return;
      }

      if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
        showError('Cannot analyze Chrome internal pages');
        return;
      }

      // Request analysis from content script
      chrome.tabs.sendMessage(tab.id, { action: 'analyze' }, (response) => {
        if (chrome.runtime.lastError) {
          showError('Unable to analyze page. Please refresh and try again.');
          return;
        }

        if (response && response.success) {
          currentResults = response.colorPairs;
          updateSummary(currentResults);
          displayResults(currentResults);
        } else {
          showError('Failed to analyze page');
        }
      });

    } catch (error) {
      showError('Error: ' + error.message);
    }
  }

  /**
   * Loads cached results
   */
  function loadCachedResults() {
    chrome.storage.local.get(['colorPairs', 'url', 'timestamp'], (data) => {
      if (data.colorPairs && data.colorPairs.length > 0) {
        currentResults = data.colorPairs;
        updateSummary(currentResults);
        displayResults(currentResults);
      } else {
        analyzePage();
      }
    });
  }

  // Event listeners
  analyzeBtn.addEventListener('click', analyzePage);
  
  filterFail.addEventListener('change', () => {
    if (currentResults.length > 0) {
      displayResults(currentResults);
    }
  });

  filterPass.addEventListener('change', () => {
    if (currentResults.length > 0) {
      displayResults(currentResults);
    }
  });

  // Load results on popup open
  loadCachedResults();
});
