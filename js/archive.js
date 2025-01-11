class Archive {
    #loaded = false;
    #tab = 'models';
    #history = new History();
    #models = new Models(this, document.getElementById('models'));
    #tabs = {
        models: this.#models
    };

    constructor() {
        let controller = this;
        this.#history.setDefault('tab', 'models');
        this.#history.onChange(function() {
            controller.onHistoryChange();
        });
        this.#history.autoUpdate();
    }

    getModels() {
        return this.#models;
    }

    getHistory() {
        return this.#history;
    }

    register() {
        let archive = this;
        // Try to make the virtual keyboard on iOS not break the entire layout
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', () => {
                archive.forceViewport();
            });
        }
    }

    forceViewport() {
        let container = document.getElementById('mainContainer');
        container.style.height = window.visualViewport.height + 'px';
        container.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTop = 0;
    }

    selectTab(tabId) {
        if (!this.#tabs.hasOwnProperty(tabId)) {
            throw new Error("Selecting unknown tab: " + tabId);
        }
        let tab = this.#tabs[tabId];
        this.#tab = tabId;
        this.#history.set('tab', this.#tab);

        // Don't activate the tab until data is loaded
        if (!this.#loaded) {
            return;
        }

        let previousTab = this.#tabs.hasOwnProperty(this.#tab) ? this.#tabs[this.#tab] : null;
        if (previousTab != null) {
            previousTab.deactivate();
        }
        tab.activate();
    }

    #request(url, callback) {
        const request = new XMLHttpRequest();
        request.onload = callback;
        request.responseType = 'json';
        request.onerror = function() { alert("Failed to load data, sorry!"); };
        request.open("GET", url, true);
        request.send();
    }

    load() {
        const archive = this;
        this.#request('data/archive.php', function() {
            archive.#processData(this.response);
        });
    }

    #processData(data) {
        if (!data.success) {
            alert("Failed to load data: " + data.message);
            return;
        }

        this.#models.addModels(data.models);

        this.#loaded = true;
        document.getElementById('loading').style.display = 'none';

        // Activate current tab
        let tab = this.#tabs[this.#tab];
        tab.activate();
        // We also skip having tabs process history until data is loaded
        tab.onHistoryChange();
    }

    onHistoryChange() {
        let tab = this.#history.get('tab');
        if (tab !== this.#tab) {
            this.selectTab(tab);
        }
        if (this.#loaded) {
            this.#tabs[tab].onHistoryChange();
        }
    }
}
