function drawIconLine({ coordinates, icon = icons[0], initIconNumbers = 2, onDelete, onChange }) {

    const resizeVar = 0.05;
    let iconProps = icon
    let { path, height, width } = iconProps;

    let iconPath = path
    let nums = "100%"
    let iconNumber = initIconNumbers;
    let editMode = false;

    const markerLine = L.polyline(coordinates).addTo(map);

    markerLine.options.pmIgnore = true;
    L.PM.reInitLayer(markerLine);

    const resizeFactor = map.getZoom() * resizeVar;
    const _width = Math.ceil(width * resizeFactor);
    const _height = Math.ceil(height * resizeFactor);

    const patterns = [{
        offset: 0,
        endOffset: 0,
        repeat: nums,
        symbol: L.Symbol.marker({
            draggable: false,
            pmIgnore: true,
            rotate: true,
            angleCorrection: 0,
            markerOptions: {
                pmIgnore: true,
                icon: L.icon({
                    iconSize: [_width, _height],
                    iconUrl: path,
                    iconAnchor: [_width / 2, _height / 2],
                    className: 'line-icon',
                })
            },
        })
    }]

    let pathPattern = L.polylineDecorator(
        markerLine, {
        patterns
    }).addTo(map);

    // onChange({
    //     icon: iconProps,
    //     iconNumber,
    //     lineGeometry: coordinates
    // });

    updateLineProps({
        layer: pathPattern,
        icon: iconProps,
        iconNumber
    })//redraw

    map.on('click', disableEditMode);
    pathPattern.on('click', enableEditMode);
    markerLine.on('click', enableEditMode);
    markerLine.on('pm:edit', editLine);
    markerLine.on('pm:markerdragstart', hideIcons)
    markerLine.on('pm:markerdragend', showIcons);

    // document.addEventListener('click', function (e) {
    //     console.log('DIV CLICK', e);
    //     if (e.target.closest('div.leaflet-marker-icon.marker-icon.leaflet-zoom-animated.leaflet-interactive')) {
    //         return;
    //     }
    //     markerLine.pm.disable()
    // });

    function showIcons() {
        pathPattern.addTo(map)
    }
    function hideIcons() {
        pathPattern.remove()
    }
    function disableEditMode() {
        if (editMode) {
            markerLine.pm.disable()
            editMode = false;
        }
    }

    function editLine(event) {
        console.log('edit',);
        const coordinates = event.target.getLatLngs();
        markerLine.setLatLngs(coordinates);
        pathPattern.setPaths(markerLine)
        onChange({
            actionName: 'editLine',
            icon: iconProps,
            iconNumber,
            lineGeometry: coordinates
        });
    }

    function enableEditMode(event) {
        setTimeout(() => {
            editMode = true; // to disable on map click event
        }, 100);
        markerLine.pm.enable()
        buildStyleSelector(pathPattern)
        event.originalEvent.stopPropagation();
        event.originalEvent.preventDefault();
    }

    function buildStyleSelector(layer) {
        const styleSelector = document.getElementById('style-selector');
        styleSelector.innerHTML = '';

        let icon = icons[0];

        const container = document.createElement('div');
        container.style = 'display:flex; flex-direction:row;justify-content:center;';
        const label = document.createElement('label');
        label.htmlFor = 'style-selector-dropdown';
        label.innerText = 'Icon type: ';
        const dropdown = document.createElement('select');
        dropdown.id = 'style-selector-dropdown';
        icons.forEach(element => {
            const option = document.createElement('option');
            option.value = element.id;
            option.text = element.name;
            dropdown.appendChild(option);
        });
        dropdown.addEventListener('input', function (e) {
            const id = e.target.value;
            icon = icons.find(icon => icon.id === id);
            if (icon) {
                updateLineProps({ layer, icon, iconNumber });
            }
        });

        container.appendChild(label);
        container.appendChild(dropdown);

        const container2 = document.createElement('div');
        container2.style = 'display:flex; flex-direction:row;justify-content:center;';
        const label2 = document.createElement('label');
        label2.innerText = 'Number of icons: ';
        const input = document.createElement('input');
        input.style = 'width: 50px;';
        input.type = 'number';
        input.min = 2;
        input.value = iconNumber
        input.addEventListener('change', function (e) {
            iconNumber = e.target.value;
            updateLineProps({ layer, icon, iconNumber });
        });

        container2.appendChild(label2);
        container2.appendChild(input);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function () {
            markerLine.remove();
            layer.remove();
            styleSelector.innerHTML = '';

            map.off('click', disableEditMode);
            pathPattern.off('click', enableEditMode);
            markerLine.off('click', enableEditMode);
            markerLine.off('pm:edit', editLine);
            markerLine.off('pm:markerdragstart', hideIcons)
            markerLine.off('pm:markerdragend', showIcons);

            onDelete();
        });

        styleSelector.appendChild(container);
        styleSelector.appendChild(container2);
        styleSelector.appendChild(deleteButton);
    }

    function updateLineProps({ layer, icon, iconNumber }) {

        iconProps = icon;
        const resizeFactor = map.getZoom() * resizeVar;
        console.log('map.getZoom()', map.getZoom());

        height = icon.height;
        width = icon.width;
        iconPath = icon.path;

        const _width = Math.ceil(icon.width * resizeFactor);
        const _height = Math.ceil(icon.height * resizeFactor);
        nums = 100 / (iconNumber - 1) + "%";
        layer.setPatterns([
            {
                offset: '0%',
                repeat: nums,
                symbol: L.Symbol.marker({
                    rotate: true,
                    angleCorrection: 0,
                    markerOptions: {
                        icon: L.icon({
                            iconSize: [_width, _height],
                            iconUrl: iconPath,
                            iconAnchor: [_width / 2, _height / 2],
                            className: 'line-icon',
                        })
                    },
                })
            }
        ]);

        onChange({
            actionName: 'iconsChange',
            icon: iconProps,
            iconNumber,
            lineGeometry: coordinates
        });
    }


    map.on('zoomend', function (e) {

        const resizeFactor = map.getZoom() * resizeVar;
        const _width = Math.ceil(width * resizeFactor);
        const _height = Math.ceil(height * resizeFactor);
        pathPattern.setPatterns([
            {
                repeat: nums,
                symbol: L.Symbol.marker({
                    rotate: true,
                    angleCorrection: 0,
                    markerOptions: {
                        icon: L.icon({
                            iconSize: [_width, _height],
                            iconUrl: iconPath,
                            iconAnchor: [_width / 2, _height / 2],
                            className: 'line-icon',
                        })
                    },
                })
            }
        ]);
    });

    return { pathPattern, markerLine };
}