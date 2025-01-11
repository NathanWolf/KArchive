class Utilities {

    static shuffle = function(a) {
        return a.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    static mapArray = function(obj) {
        let a = [];
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let o = obj[key];
                o.id = key;
                a.push(o);
            }
        }
        return a;
    }

    static empty = function(node) {
        while (node.firstChild) {
            node.removeChild(node.lastChild);
        }
    }

    static addHandlerToClass(className, callback) {
        let elements = document.getElementsByClassName(className);
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', callback);
        }
    }

    static showStatusPopup(parent, innerClass, timeout) {
        if (typeof(innerClass) === 'undefined') {
            innerClass = 'popupInnerContent';
        }
        if (typeof(timeout) === 'undefined') {
            timeout = 1000;
        }
        let popupDiv = document.createElement('div');
        popupDiv.className = 'statusPopup';
        let contentDiv = document.createElement('div');
        contentDiv.className = 'statusPopupContent';
        popupDiv.appendChild(contentDiv);
        let innerDiv = document.createElement('div');
        innerDiv.className = innerClass;
        contentDiv.appendChild(innerDiv);
        parent.appendChild(popupDiv);

        setTimeout(function() {
           popupDiv.remove();
        }, timeout);
        return innerDiv;
    }

    static showPopup(parent, innerClass, callback) {
        if (typeof(innerClass) === 'undefined') {
            innerClass = 'popupInnerContent';
        }
        let popupDiv = document.createElement('div');
        popupDiv.className = 'popup';
        let contentDiv = document.createElement('div');
        contentDiv.className = 'popupContent';
        popupDiv.appendChild(contentDiv);
        let innerDiv = document.createElement('div');
        innerDiv.className = innerClass;
        contentDiv.appendChild(innerDiv);
        parent.appendChild(popupDiv);

        popupDiv.addEventListener('dblclick', function() {
            this.remove();
            if (typeof(callback) !== 'undefined' && callback != null) {
                callback(popupDiv);
            }
        });
        return innerDiv;
    }

    static setVisible(element, visible) {
        element.style.display = visible ? '' : 'none';
    }

    static closePopups() {
        let elements = document.getElementsByClassName('popup');
        for (let i = 0; i < elements.length; i++) {
            elements[i].dispatchEvent(new Event("click"));
        }
    }

    static createElement(elementType, className, parent) {
        let div = document.createElement(elementType);
        div.className = className;
        if (typeof(parent) !== 'undefined') {
            parent.appendChild(div);
        }
        return div;
    }
    static createDiv(className, parent) {
        return this.createElement('div', className, parent);
    }

    static createSpan(className, parent) {
        return this.createElement('span', className, parent);
    }

    static humanizeKey(str) {
        let pieces = str.split('_');
        for (let i = 0 ; i < pieces.length; i++) {
            pieces[i] = pieces[i].charAt(0).toUpperCase() + pieces[i].slice(1);
        }
        return pieces.join(' ');
    }

    static addClass(element, className) {
        let classes = element.className.split(' ');
        if (classes.indexOf(className) === -1) {
            classes.push(className);
            element.className = classes.join(' ');
        }
    }

    static removeClass(element, className) {
        let classes = element.className.split(' ');
        let index = classes.indexOf(className);
        if (index !== -1) {
            classes.splice(index, 1);
            element.className = classes.join(' ');
        }
    }

    static hasClass(element, className) {
        let classes = element.className.split(' ');
        let index = classes.indexOf(className);
        return index !== -1;
    }

    static escapeHtml(unsafe) {
        return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
    }

    static setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    static getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    static filterOptions(select, value) {
        for (let i = 0; i < select.children.length; i++) {
            let option = select.children[i];
            if (value.length > 0 && option.innerText.toLowerCase().indexOf(value) === -1) {
                option.hidden = true;
                option.disabled = true;
            } else {
                option.hidden = false;
                option.disabled = false;
            }
            option.selected = false;
        }
    }

    static nextOption(select, direction) {
        let previousSelection = select.selectedIndex;
        let selected = previousSelection + direction;
        while (selected < select.children.length && selected >= 0 && select.children[selected].disabled) {
            selected += direction;
        }
        if (selected < select.children.length && selected >= 0) {
            select.selectedIndex = selected;
            return true;
        } else {
            select.selectedIndex = previousSelection;
        }

        return false;
    }
}
