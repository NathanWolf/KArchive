class Models extends Component {
    #popupModelId = null;
    #models = {};

    constructor(controller, element) {
        super(controller, element);
    }

    addModels(models) {
        for (let id in models) {
            if (models.hasOwnProperty(id)) {
                this.#models[id] = models[id];
            }
        }
    }

    getModelList() {
        return Object.values(this.#models);
    }

    getModel(id) {
        return this.#models.hasOwnProperty(id) ? this.#models[id] : null;
    }

    show() {
        let modelController = this;
        let container = this.getElement();
        Utilities.empty(container);

        // Create inner div to hold items
        let modelList = Utilities.createDiv('modelList', container);

        Object.values(this.#models).forEach(function(model) {
            let portraitContainer = document.createElement('div');
            portraitContainer.className = 'portraitContainer';
            portraitContainer.dataset.model = model.id;
            portraitContainer.addEventListener('click', function() {
                modelController.#showModelPopup(model.id);
            });

            let portraitName = document.createElement('div');
            portraitName.className = 'portraitName';
            portraitName.innerText = model.name;
            portraitContainer.appendChild(portraitName);

            let portrait = document.createElement('div');
            portrait.className = 'portrait';
            portrait.style.backgroundImage = 'url(' + modelController.getThumbnail(model.id) + ')';
            portraitContainer.appendChild(portrait);

            modelList.appendChild(portraitContainer);

            model.containers = {
                portrait: portrait,
                name: portraitName
            };
        });
    }

    #showModelPopup(modelId) {
        let model = this.getModel(modelId);
        if (model == null) {
            alert("Sorry, something went wrong!");
            return;
        }
        this.#popupModelId = modelId;
        this.getController().getHistory().set('model', modelId);
        let element = this.getElement();
        let modelController = this;
        let popup = Utilities.showPopup(element.parentNode, 'characterSheet', function() {
            modelController.#popupModelId = null;
            modelController.getController().getHistory().unset('model');
        });

        const modelViewer = document.createElement("model-viewer");
        modelViewer.src = 'model/' + modelId + '.glb';
        modelViewer.poster = 'image/model/' + modelId + '.png';
        modelViewer.shadowIntensity = 1;
        modelViewer.ar = true;
        modelViewer.cameraControls = true;
        modelViewer.touchAction = 'pan-y';

        let viewButton = document.createElement('button');
        viewButton.id = 'ar-button';
        viewButton.slot = 'ar-button';
        modelViewer.appendChild(viewButton);

        let promptButton = document.createElement('button');
        promptButton.id = 'ar-prompt';
        promptButton.src = 'image/hand.png';
        modelViewer.appendChild(promptButton);

        let failureButton = document.createElement('button');
        failureButton.id = 'ar-failure';
        failureButton.innerText = 'AR Tracking Failure, Sorry!';
        modelViewer.appendChild(failureButton);

        popup.appendChild(modelViewer);
    }

    #getImage(modelId, folder, dataKey) {
        let model = this.getModel(modelId);
        if (model == null) {
            return '';
        }
        let version = 0;
        return 'image/' + folder + '/' + modelId + '.png?v=' + version;
    }

    getThumbnail(modelId) {
        return this.#getImage(modelId, 'model', 'thumbnail');
    }

    getTitle() {
        return 'Models';
    }

    onHistoryChange() {
        let history = this.getController().getHistory();
        let modelId = history.get('model');
        if (this.#popupModelId != modelId) {
            if (modelId == null) {
                Utilities.closePopups();
            } else {
                this.#showModelPopup(modelId);
            }
        }
    }

    deactivate() {
        this.getController().getHistory().unset('model');
    }
}
